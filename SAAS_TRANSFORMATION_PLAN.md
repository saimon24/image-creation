# SaaS Transformation Plan: Asset Catalog Generator

## Overview

Transform the current single-user image generation app into a multi-tenant SaaS platform where users can create their own game asset catalogs with custom items, categories, and AI-generated images.

**Tech Stack Addition:**
- **Supabase** - PostgreSQL database, authentication, and file storage
- **Supabase Auth** - User management with email/OAuth
- **Supabase Storage** - Image storage with access policies
- **Stripe** (optional) - Subscription billing

---

## Current State → Target State

| Aspect | Current | Target |
|--------|---------|--------|
| Data Storage | TypeScript files, JSON | Supabase PostgreSQL |
| Image Storage | Local `/output/` folder | Supabase Storage buckets |
| Authentication | None | Supabase Auth (email, OAuth) |
| Multi-tenancy | Single user | Multi-user with projects |
| Item Definitions | Hardcoded 250+ items | User-created, unlimited |
| Categories | Fixed 14 categories | User-defined per project |
| Style Configs | Root JSON files | Database with user customization |
| Generation Queue | Client-side React context | Server-side with persistence |

---

## Database Schema Design

```sql
-- Users (managed by Supabase Auth, extended with profile)
create table profiles (
  id uuid references auth.users primary key,
  email text,
  display_name text,
  avatar_url text,
  subscription_tier text default 'free', -- free, pro, enterprise
  generation_credits int default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Projects (asset catalogs)
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  description text,
  slug text unique, -- for URLs: /p/my-game-assets
  default_style_id uuid,
  settings jsonb default '{}', -- project-specific settings
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Categories (user-defined per project)
create table categories (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  slug text not null, -- crops, npcs, buildings
  description text,
  sort_order int default 0,
  created_at timestamptz default now(),
  unique(project_id, slug)
);

-- Items (user-defined assets)
create table items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text not null,
  description text, -- AI prompt description
  metadata jsonb default '{}', -- flexible extra fields
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(project_id, slug)
);

-- Generated Images
create table generations (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references items(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  user_id uuid references profiles(id),
  style_id uuid references styles(id),
  storage_path text, -- path in Supabase Storage
  status text default 'pending', -- pending, processing, completed, failed
  error_message text,
  prompt_used text, -- store the actual prompt for debugging
  model_used text default 'gpt-image-1',
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- Style Configurations
create table styles (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade, -- null = global template
  user_id uuid references profiles(id),
  name text not null,
  description text,
  is_template boolean default false, -- true = available to all users
  config jsonb not null, -- the style definition (perspective, lighting, etc.)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Generation Queue (server-side job tracking)
create table generation_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  project_id uuid references projects(id),
  item_id uuid references items(id),
  style_id uuid references styles(id),
  status text default 'queued', -- queued, processing, completed, failed
  priority int default 0,
  attempts int default 0,
  last_error text,
  created_at timestamptz default now(),
  started_at timestamptz,
  completed_at timestamptz
);

-- Usage Tracking (for billing/limits)
create table usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  project_id uuid references projects(id),
  action text, -- 'generation', 'storage', etc.
  credits_used int default 1,
  metadata jsonb,
  created_at timestamptz default now()
);
```

### Row-Level Security Policies

```sql
-- Users can only see their own profile
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Users can only access their own projects
alter table projects enable row level security;
create policy "Users can CRUD own projects" on projects
  for all using (auth.uid() = user_id);

-- Items scoped to project ownership
alter table items enable row level security;
create policy "Users can CRUD items in own projects" on items
  for all using (
    project_id in (select id from projects where user_id = auth.uid())
  );

-- Similar policies for categories, generations, styles...
```

---

## Milestone 1: Foundation (Database & Auth)

**Goal:** Set up Supabase infrastructure and basic authentication flow.

### Tasks

- [ ] **1.1 Supabase Project Setup**
  - Create Supabase project
  - Configure environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`)
  - Install `@supabase/supabase-js` and `@supabase/ssr`

- [ ] **1.2 Database Schema**
  - Run migrations for all tables (profiles, projects, categories, items, generations, styles)
  - Set up Row-Level Security policies
  - Create database indexes for common queries

- [ ] **1.3 Authentication Integration**
  - Create Supabase client utilities (`lib/supabase/client.ts`, `lib/supabase/server.ts`)
  - Add auth middleware for protected routes
  - Create auth callback route (`/auth/callback`)

- [ ] **1.4 Auth UI Pages**
  - `/login` - Email/password + OAuth (Google, GitHub)
  - `/signup` - Registration with email verification
  - `/forgot-password` - Password reset flow
  - Update layout with auth state (user menu, logout)

- [ ] **1.5 Profile Creation Trigger**
  - Database trigger to create profile on user signup
  - Handle OAuth profile data (avatar, name)

### Deliverables
- Users can sign up, log in, and log out
- Protected routes redirect to login
- User profile created automatically on signup

---

## Milestone 2: Project Management

**Goal:** Allow users to create and manage multiple asset catalog projects.

### Tasks

- [ ] **2.1 Project CRUD API**
  - `POST /api/projects` - Create new project
  - `GET /api/projects` - List user's projects
  - `GET /api/projects/[id]` - Get project details
  - `PATCH /api/projects/[id]` - Update project
  - `DELETE /api/projects/[id]` - Delete project (cascade items/images)

- [ ] **2.2 Project Selection UI**
  - Project switcher in header/sidebar
  - `/projects` - List all projects with cards
  - `/projects/new` - Create project wizard
  - `/projects/[id]/settings` - Project settings page

- [ ] **2.3 Project Context**
  - Create `ProjectContext` to track current project
  - Store last-used project in localStorage
  - Update all existing pages to use project context

- [ ] **2.4 URL Structure Update**
  - Restructure routes: `/p/[projectId]/icons`, `/p/[projectId]/npcs`, etc.
  - Or use project context with flat routes (simpler)

### Deliverables
- Users can create multiple projects
- Project switcher allows quick navigation
- All asset operations scoped to current project

---

## Milestone 3: Dynamic Items & Categories

**Goal:** Replace hardcoded items with user-managed database records.

### Tasks

- [ ] **3.1 Category Management**
  - `POST /api/categories` - Create category
  - `GET /api/categories` - List project categories
  - `PATCH /api/categories/[id]` - Update category
  - `DELETE /api/categories/[id]` - Delete category
  - UI: Category management page with drag-to-reorder

- [ ] **3.2 Item CRUD API**
  - `POST /api/items` - Create item
  - `GET /api/items` - List items (with filters: category, search, hasImage)
  - `GET /api/items/[id]` - Get item details
  - `PATCH /api/items/[id]` - Update item (name, description, category)
  - `DELETE /api/items/[id]` - Delete item

- [ ] **3.3 Item Management UI**
  - Replace static item grid with database-driven grid
  - "Add Item" button and modal/form
  - Inline editing for name and description
  - Bulk import from CSV/JSON

- [ ] **3.4 Migration Tool (Optional)**
  - Script to import existing `items.ts` data as a starter template
  - Allow users to start from template or blank project

- [ ] **3.5 Remove Static Data Dependencies**
  - Remove imports from `data/items.ts` in production code
  - Keep as reference/template only
  - Update `getItemById()` to query database

### Deliverables
- Users can create custom categories
- Users can add/edit/delete items
- No dependency on hardcoded item definitions

---

## Milestone 4: Image Storage Migration

**Goal:** Move from local filesystem to Supabase Storage.

### Tasks

- [ ] **4.1 Storage Bucket Setup**
  - Create `generated-images` bucket in Supabase
  - Configure storage policies (users can only access own project images)
  - Set up public/private access rules

- [ ] **4.2 Upload Integration**
  - Update `/api/generate` to upload to Supabase Storage
  - Storage path structure: `{user_id}/{project_id}/{category}/{item_slug}.webp`
  - Store `storage_path` in `generations` table

- [ ] **4.3 Image Serving**
  - Update image display to use Supabase Storage URLs
  - Handle signed URLs for private buckets (if needed)
  - Implement caching headers

- [ ] **4.4 Generation History**
  - Track all generations in `generations` table
  - Show generation history per item (multiple versions)
  - Allow selecting previous generation as "active"

- [ ] **4.5 Cleanup Old System**
  - Remove `/output` directory dependency
  - Remove `/api/image/[...path]` route
  - Update `imageExists()` checks to query database

### Deliverables
- All images stored in Supabase Storage
- Images properly isolated per user/project
- Generation history preserved

---

## Milestone 5: Style System Upgrade

**Goal:** Move styles to database with user customization.

### Tasks

- [ ] **5.1 Style CRUD API**
  - `POST /api/styles` - Create custom style
  - `GET /api/styles` - List styles (templates + user custom)
  - `PATCH /api/styles/[id]` - Update style
  - `DELETE /api/styles/[id]` - Delete custom style

- [ ] **5.2 Global Style Templates**
  - Seed database with default styles (current JSON files)
  - Mark as `is_template = true`
  - Users can duplicate templates to customize

- [ ] **5.3 Style Editor UI**
  - Visual style editor with live preview
  - Section editors for: perspective, lighting, colors, etc.
  - "Duplicate & Edit" for templates

- [ ] **5.4 Per-Project Default Style**
  - Set default style per project
  - Override style per category (optional)
  - Style selection in generation UI

### Deliverables
- Styles stored in database
- Users can create custom styles
- Built-in templates available to all users

---

## Milestone 6: Server-Side Generation Queue

**Goal:** Replace client-side queue with persistent server-side system.

### Tasks

- [ ] **6.1 Queue Infrastructure**
  - Use `generation_queue` table for job management
  - Create queue processor (could use Supabase Edge Functions or separate worker)
  - Implement job status polling/real-time updates

- [ ] **6.2 Queue API**
  - `POST /api/queue` - Add items to queue
  - `GET /api/queue` - Get user's queue status
  - `DELETE /api/queue/[id]` - Cancel queued job

- [ ] **6.3 Real-time Updates**
  - Use Supabase Realtime to subscribe to queue changes
  - Update UI in real-time as jobs complete
  - Show progress notifications

- [ ] **6.4 Rate Limiting & Concurrency**
  - Limit concurrent generations per user (based on tier)
  - Implement retry logic for failed generations
  - Add exponential backoff for API errors

- [ ] **6.5 Update Generation Context**
  - Refactor `GenerationContext` to use server queue
  - Maintain similar UX (bottom-right progress panel)
  - Jobs persist across page refreshes/sessions

### Deliverables
- Generation jobs persist server-side
- Real-time progress updates
- Jobs survive browser refresh

---

## Milestone 7: Usage & Billing

**Goal:** Implement usage tracking and subscription tiers.

### Tasks

- [ ] **7.1 Usage Tracking**
  - Log all generations to `usage_logs`
  - Track storage usage per user
  - Dashboard showing usage statistics

- [ ] **7.2 Credit System**
  - Deduct credits on generation
  - Show remaining credits in UI
  - Block generation when credits exhausted

- [ ] **7.3 Subscription Tiers**
  ```
  Free:       100 credits/month, 1 project, 100 items
  Pro:        1000 credits/month, 10 projects, unlimited items
  Enterprise: Unlimited, custom API keys, priority queue
  ```

- [ ] **7.4 Stripe Integration (Optional)**
  - Stripe Checkout for upgrades
  - Webhook handler for subscription events
  - Customer portal for billing management

- [ ] **7.5 Billing UI**
  - `/settings/billing` - Current plan, usage, upgrade options
  - Upgrade prompts when hitting limits
  - Invoice history

### Deliverables
- Usage tracked per user
- Tier-based limits enforced
- Upgrade flow functional

---

## Milestone 8: Polish & Launch Prep

**Goal:** Final polish, onboarding, and launch preparation.

### Tasks

- [ ] **8.1 Onboarding Flow**
  - Welcome wizard for new users
  - Create first project with guided steps
  - Sample items to demonstrate features

- [ ] **8.2 Landing Page**
  - Marketing homepage at `/`
  - Feature showcase
  - Pricing table
  - CTA to sign up

- [ ] **8.3 Documentation**
  - User guide / help center
  - API documentation (if exposing)
  - FAQ page

- [ ] **8.4 Error Handling & Edge Cases**
  - Graceful error messages
  - Empty states for all pages
  - Loading skeletons

- [ ] **8.5 Performance & SEO**
  - Optimize database queries
  - Add appropriate indexes
  - Meta tags and OG images

- [ ] **8.6 Testing**
  - E2E tests for critical flows
  - Load testing for generation queue
  - Security audit (RLS policies, API routes)

### Deliverables
- Polished onboarding experience
- Marketing-ready landing page
- Production-ready application

---

## File Structure Changes

```
├── app/
│   ├── (auth)/                    # Auth pages (login, signup, etc.)
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts
│   ├── (dashboard)/               # Authenticated app
│   │   ├── layout.tsx             # With project context
│   │   ├── projects/
│   │   │   ├── page.tsx           # Project list
│   │   │   ├── new/page.tsx       # Create project
│   │   │   └── [id]/
│   │   │       └── settings/page.tsx
│   │   ├── icons/page.tsx         # Now database-driven
│   │   ├── categories/page.tsx    # Category management
│   │   ├── styles/page.tsx        # Style editor
│   │   └── settings/
│   │       ├── page.tsx           # User settings
│   │       └── billing/page.tsx   # Subscription management
│   ├── (marketing)/               # Public pages
│   │   ├── page.tsx               # Landing page
│   │   └── pricing/page.tsx
│   └── api/
│       ├── projects/
│       ├── items/
│       ├── categories/
│       ├── styles/
│       ├── generate/
│       ├── queue/
│       └── webhooks/stripe/
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser client
│   │   ├── server.ts              # Server client
│   │   ├── middleware.ts          # Auth middleware
│   │   └── admin.ts               # Service role client
│   ├── database.types.ts          # Generated from Supabase
│   └── ...
├── contexts/
│   ├── auth-context.tsx           # User auth state
│   ├── project-context.tsx        # Current project
│   └── generation-context.tsx     # Updated for server queue
└── supabase/
    ├── migrations/                # SQL migrations
    └── seed.sql                   # Default styles, templates
```

---

## Environment Variables

```env
# Existing
OPENAI_API_KEY=sk-...

# New - Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...    # Server-side only

# New - Stripe (optional)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

---

## Recommended Implementation Order

1. **Milestone 1** - Foundation (Auth) - *Do this first, everything depends on it*
2. **Milestone 2** - Projects - *Core multi-tenancy*
3. **Milestone 3** - Items & Categories - *Replace hardcoded data*
4. **Milestone 4** - Storage - *Complete data migration*
5. **Milestone 5** - Styles - *Nice to have, can be simplified*
6. **Milestone 6** - Queue - *Important for UX but can defer*
7. **Milestone 7** - Billing - *Only needed for monetization*
8. **Milestone 8** - Polish - *Launch prep*

**MVP Target:** Milestones 1-4 give you a functional multi-tenant SaaS.

---

## Quick Wins / Simplifications

If you want to move faster, consider these simplifications:

1. **Skip custom categories initially** - Use a fixed set of categories, add customization later
2. **Skip generation history** - Just track current image per item
3. **Use Supabase Edge Functions** - Instead of building a separate queue worker
4. **Start with email-only auth** - Add OAuth providers later
5. **Skip Stripe initially** - Use manual credit grants, add billing later
6. **Keep styles simple** - Just name + JSON config, skip visual editor

---

## Risk Considerations

| Risk | Mitigation |
|------|------------|
| Supabase Storage costs | Monitor usage, implement storage limits per tier |
| OpenAI API costs | Credit system, rate limiting, tier-based limits |
| Database performance | Proper indexes, connection pooling, query optimization |
| Migration complexity | Keep old system running during transition, gradual rollout |
| Auth edge cases | Use Supabase's battle-tested auth, handle token refresh |

---

## Next Steps

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Start with Milestone 1 - set up auth and database schema
3. Test locally with `npx supabase start` (local dev)
4. Deploy incrementally, feature-flag new functionality

Ready to start implementing? Let me know which milestone to begin with!
