# SaaS Transformation Plan: Asset Catalog Generator

> **Status:** Draft - Ready for Review
> **Last Updated:** 2025-01-20
> **Target:** Multi-tenant SaaS for game asset generation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Phase 1: Foundation](#phase-1-foundation-supabase-setup--authentication)
4. [Phase 2: Multi-Tenancy](#phase-2-multi-tenancy-projects--data-isolation)
5. [Phase 3: Dynamic Content](#phase-3-dynamic-content-items--categories)
6. [Phase 4: Storage](#phase-4-storage-migration)
7. [Phase 5: Generation System](#phase-5-generation-system-upgrade)
8. [Phase 6: Monetization](#phase-6-monetization-optional)
9. [Phase 7: Launch](#phase-7-launch-preparation)
10. [Open Questions](#open-questions)
11. [Technical Reference](#technical-reference)

---

## Executive Summary

### What We're Building

A SaaS platform where game developers can:
- Create multiple asset catalog projects
- Define custom items and categories
- Generate AI images with customizable styles
- Manage and export their generated assets

### Tech Stack

| Layer | Current | Target |
|-------|---------|--------|
| Framework | Next.js 14 (App Router) | Same |
| Database | File-based (TS, JSON) | **Supabase PostgreSQL** |
| Auth | None | **Supabase Auth** |
| Storage | Local filesystem | **Supabase Storage** |
| Image Gen | OpenAI API | Same (with usage tracking) |
| Payments | None | **Stripe** (optional) |

### MVP Scope

**In Scope (Phases 1-4):**
- User authentication (email + OAuth)
- Project creation and management
- Custom items and categories per project
- Image generation and storage
- Basic usage limits

**Deferred:**
- Stripe billing integration
- Advanced style editor
- Team collaboration
- API access for developers

---

## Architecture Overview

### Current Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App                          │
├─────────────────────────────────────────────────────────┤
│  Pages: /, /icons, /npcs, /styles                       │
│  API: /api/generate, /api/assets, /api/styles           │
├─────────────────────────────────────────────────────────┤
│  Data Layer (File-based)                                │
│  ├── data/items.ts      (250+ hardcoded items)          │
│  ├── data/npcs.ts       (38 hardcoded NPCs)             │
│  ├── data/overrides.json (description edits)            │
│  └── *.json             (style configurations)          │
├─────────────────────────────────────────────────────────┤
│  Storage: /output/{category}/{item}.webp                │
└─────────────────────────────────────────────────────────┘
```

### Target Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App                          │
├─────────────────────────────────────────────────────────┤
│  (marketing)  Landing, Pricing                          │
│  (auth)       Login, Signup, Callback                   │
│  (dashboard)  Projects, Items, Styles, Settings         │
├─────────────────────────────────────────────────────────┤
│  Middleware: Auth check, Project context                │
├─────────────────────────────────────────────────────────┤
│                    Supabase                             │
│  ┌─────────────┬─────────────┬─────────────┐            │
│  │  PostgreSQL │    Auth     │   Storage   │            │
│  │  - profiles │  - email    │  - images   │            │
│  │  - projects │  - OAuth    │  - exports  │            │
│  │  - items    │  - sessions │             │            │
│  │  - styles   │             │             │            │
│  │  - generations           │             │            │
│  └─────────────┴─────────────┴─────────────┘            │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 1: Foundation (Supabase Setup & Authentication)

> **Goal:** Users can sign up, log in, and access protected routes.
> **Dependencies:** None

### 1.1 Supabase Project Setup

- [ ] Create Supabase project at supabase.com
- [ ] Note project URL and API keys
- [ ] Install dependencies: `npm install @supabase/supabase-js @supabase/ssr`
- [ ] Add environment variables to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Acceptance Criteria:**
- [ ] Can connect to Supabase from local dev
- [ ] Environment variables configured

---

### 1.2 Supabase Client Utilities

**Create these files:**

| File | Purpose |
|------|---------|
| `lib/supabase/client.ts` | Browser client for client components |
| `lib/supabase/server.ts` | Server client for API routes & Server Components |
| `lib/supabase/admin.ts` | Service role client for admin operations |

<details>
<summary>lib/supabase/client.ts</summary>

```typescript
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```
</details>

<details>
<summary>lib/supabase/server.ts</summary>

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```
</details>

<details>
<summary>lib/supabase/admin.ts</summary>

```typescript
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```
</details>

**Acceptance Criteria:**
- [ ] Browser client works in client components
- [ ] Server client works in API routes and Server Components
- [ ] Admin client works for privileged operations

---

### 1.3 Database Schema - Core Tables

**Run this migration in Supabase SQL Editor:**

<details>
<summary>supabase/migrations/001_initial_schema.sql</summary>

```sql
-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  avatar_url text,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'pro', 'enterprise')),
  generation_credits int default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ============================================
-- PROJECTS (user's asset catalogs)
-- ============================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  slug text not null,
  settings jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, slug)
);

-- Enable RLS
alter table public.projects enable row level security;

-- Policies
create policy "Users can CRUD own projects"
  on public.projects for all
  using (auth.uid() = user_id);

-- Indexes
create index projects_user_id_idx on public.projects(user_id);

-- ============================================
-- TRIGGER: Auto-create profile on signup
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- FUNCTION: Update updated_at timestamp
-- ============================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.update_updated_at();
```
</details>

**Acceptance Criteria:**
- [ ] Tables created in Supabase
- [ ] RLS policies active
- [ ] Trigger creates profile on user signup

---

### 1.4 Auth Middleware

**Create `middleware.ts` in project root:**

<details>
<summary>middleware.ts</summary>

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes - redirect to login if not authenticated
  const protectedPaths = ['/projects', '/icons', '/npcs', '/styles', '/settings']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Redirect logged-in users away from auth pages
  const authPaths = ['/login', '/signup']
  const isAuthPath = authPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isAuthPath && user) {
    return NextResponse.redirect(new URL('/projects', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|output).*)',
  ],
}
```
</details>

**Acceptance Criteria:**
- [ ] Unauthenticated users redirected from protected routes
- [ ] Authenticated users redirected from auth pages
- [ ] Session cookies properly managed

---

### 1.5 Auth UI Pages

**Create these pages:**

| File | Purpose |
|------|---------|
| `app/(auth)/login/page.tsx` | Email/password + OAuth login |
| `app/(auth)/signup/page.tsx` | Registration with email verification |
| `app/auth/callback/route.ts` | OAuth callback handler |

<details>
<summary>app/(auth)/login/page.tsx</summary>

```typescript
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/projects'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => handleOAuthLogin('google')}>
            Google
          </Button>
          <Button variant="outline" onClick={() => handleOAuthLogin('github')}>
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="underline hover:text-foreground">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
```
</details>

<details>
<summary>app/(auth)/signup/page.tsx</summary>

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-sm space-y-4 p-6 text-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-muted-foreground">
            We've sent you a confirmation link. Click it to activate your account.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">Get started with your asset catalog</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="underline hover:text-foreground">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
```
</details>

<details>
<summary>app/auth/callback/route.ts</summary>

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirect = searchParams.get('redirect') || '/projects'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${redirect}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
```
</details>

**Acceptance Criteria:**
- [ ] Users can sign up with email/password
- [ ] Users receive confirmation email
- [ ] Users can sign in with email/password
- [ ] OAuth login works (Google, GitHub)
- [ ] Proper error handling and feedback

---

### 1.6 Auth Context & User Menu

**Create `contexts/auth-context.tsx`:**

<details>
<summary>contexts/auth-context.tsx</summary>

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```
</details>

**Update `app/layout.tsx`** - Wrap with AuthProvider

**Acceptance Criteria:**
- [ ] Auth state available throughout app
- [ ] User can sign out
- [ ] UI updates on auth state change

---

### Phase 1 Checklist

- [ ] 1.1 Supabase project created and configured
- [ ] 1.2 Supabase client utilities created
- [ ] 1.3 Database schema migrated (profiles, projects tables)
- [ ] 1.4 Auth middleware protecting routes
- [ ] 1.5 Login and signup pages functional
- [ ] 1.6 Auth context providing user state
- [ ] **Manual testing:** Full auth flow works end-to-end

---

## Phase 2: Multi-Tenancy (Projects & Data Isolation)

> **Goal:** Users can create and manage multiple asset catalog projects.
> **Dependencies:** Phase 1 complete

### 2.1 Project CRUD API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/projects` | GET | List user's projects |
| `/api/projects` | POST | Create new project |
| `/api/projects/[id]` | GET | Get project details |
| `/api/projects/[id]` | PATCH | Update project |
| `/api/projects/[id]` | DELETE | Delete project |

<details>
<summary>app/api/projects/route.ts</summary>

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, description } = body

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      name,
      description,
      slug,
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Project name already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
```
</details>

<details>
<summary>app/api/projects/[id]/route.ts</summary>

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from('projects')
    .update(body)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```
</details>

**Acceptance Criteria:**
- [ ] Can list all projects for authenticated user
- [ ] Can create new project
- [ ] Can update project name/description
- [ ] Can delete project
- [ ] RLS prevents access to other users' projects

---

### 2.2 Project Context

**Create `contexts/project-context.tsx`:**

- [ ] Load all user projects on mount
- [ ] Track current project in state
- [ ] Persist last-used project in localStorage
- [ ] Provide `setCurrentProject` and `refreshProjects` functions

---

### 2.3 Project UI Pages

| Page | Purpose |
|------|---------|
| `/projects` | List all projects with cards |
| `/projects/new` | Create project form |
| `/projects/[id]/settings` | Project settings |

---

### 2.4 Project Switcher Component

- [ ] Dropdown showing all projects
- [ ] "New Project" option
- [ ] Add to dashboard header/sidebar

---

### Phase 2 Checklist

- [ ] 2.1 Project CRUD API routes functional
- [ ] 2.2 Project context managing state
- [ ] 2.3 Project list and creation UI complete
- [ ] 2.4 Project switcher in header
- [ ] **Manual testing:** Create, switch, delete projects

---

## Phase 3: Dynamic Content (Items & Categories)

> **Goal:** Replace hardcoded items with user-managed database records.
> **Dependencies:** Phase 2 complete

### 3.1 Database Schema - Items & Categories

<details>
<summary>supabase/migrations/002_items_categories.sql</summary>

```sql
-- CATEGORIES
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  name text not null,
  slug text not null,
  description text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(project_id, slug)
);

alter table public.categories enable row level security;

create policy "Users can CRUD categories in own projects"
  on public.categories for all
  using (
    project_id in (select id from public.projects where user_id = auth.uid())
  );

-- ITEMS
create table public.items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null,
  description text,
  image_path text,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(project_id, slug)
);

alter table public.items enable row level security;

create policy "Users can CRUD items in own projects"
  on public.items for all
  using (
    project_id in (select id from public.projects where user_id = auth.uid())
  );

create index items_project_id_idx on public.items(project_id);
create index items_category_id_idx on public.items(category_id);
```
</details>

---

### 3.2 Category CRUD API

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/categories?projectId=xxx` | GET | List project categories |
| `/api/categories` | POST | Create category |
| `/api/categories/[id]` | PATCH | Update category |
| `/api/categories/[id]` | DELETE | Delete category |

---

### 3.3 Item CRUD API

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/items?projectId=xxx` | GET | List items (with filters) |
| `/api/items` | POST | Create item |
| `/api/items/[id]` | PATCH | Update item |
| `/api/items/[id]` | DELETE | Delete item |
| `/api/items/import` | POST | Bulk import items |

---

### 3.4 Refactor Icons Page

Key changes:
- [ ] Fetch items from `/api/items?projectId=xxx`
- [ ] Fetch categories from `/api/categories?projectId=xxx`
- [ ] Add "Create Item" button and form
- [ ] Add "Create Category" button
- [ ] Update selection and generation to use database items
- [ ] Remove dependency on `data/items.ts`

---

### 3.5 Bulk Import Feature

- [ ] Import from CSV (name, description, category)
- [ ] Import from JSON
- [ ] Migration script from existing `data/items.ts`

---

### Phase 3 Checklist

- [ ] 3.1 Categories and items tables created
- [ ] 3.2 Category CRUD API working
- [ ] 3.3 Item CRUD API working
- [ ] 3.4 Icons page refactored to use database
- [ ] 3.5 Bulk import feature working
- [ ] Remove imports from `data/items.ts`
- [ ] **Manual testing:** Create categories, create items, edit, delete

---

## Phase 4: Storage Migration

> **Goal:** Move images from local filesystem to Supabase Storage.
> **Dependencies:** Phase 3 complete

### 4.1 Supabase Storage Setup

- [ ] Create bucket `generated-images` in Supabase Dashboard
- [ ] Configure storage policies for user isolation

**Storage path structure:** `{user_id}/{project_id}/{category_slug}/{item_slug}.webp`

---

### 4.2 Update Generation API

- [ ] Upload to Supabase Storage after generating
- [ ] Update `items.image_path` in database
- [ ] Return public URL or signed URL

---

### 4.3 Asset Image Component

- [ ] Create component that fetches from Supabase Storage
- [ ] Handle missing images gracefully
- [ ] Use Next.js Image component for optimization

---

### 4.4 Remove Old Filesystem Code

- [ ] Remove `lib/filesystem.ts` or mark as deprecated
- [ ] Remove `/api/image/[...path]` route
- [ ] Remove `/output` directory handling
- [ ] Update `next.config.js`

---

### Phase 4 Checklist

- [ ] 4.1 Supabase Storage bucket created with policies
- [ ] 4.2 Generation API uploads to Supabase Storage
- [ ] 4.3 Asset image component working
- [ ] 4.4 Old filesystem code removed
- [ ] **Manual testing:** Generate image, view image, regenerate

---

## Phase 5: Generation System Upgrade

> **Goal:** Server-side queue with real-time updates.
> **Dependencies:** Phase 4 complete

### 5.1 Generations Table

```sql
create table public.generations (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  status text default 'queued',
  storage_path text,
  prompt_used text,
  error_message text,
  created_at timestamptz default now(),
  started_at timestamptz,
  completed_at timestamptz
);
```

---

### 5.2 Queue API

- [ ] `POST /api/queue` - Add items to queue
- [ ] `GET /api/queue` - Get pending/processing generations
- [ ] `DELETE /api/queue/[id]` - Cancel queued job

---

### 5.3 Real-time Updates

- [ ] Subscribe to `generations` table with Supabase Realtime
- [ ] Update UI when status changes
- [ ] Toast notifications on completion/failure

---

### Phase 5 Checklist

- [ ] 5.1 Generations table created
- [ ] 5.2 Queue API routes functional
- [ ] 5.3 Real-time updates working
- [ ] **Manual testing:** Queue multiple items, watch progress

---

## Phase 6: Monetization (Optional)

> **Goal:** Usage tracking and subscription billing.
> **Dependencies:** Phase 5 complete

### 6.1 Usage Tracking

- [ ] Track generations per user
- [ ] Deduct credits on generation
- [ ] Block when credits exhausted

### 6.2 Subscription Tiers

| Tier | Credits/Month | Projects | Items |
|------|--------------|----------|-------|
| Free | 100 | 1 | 500 |
| Pro | 1,000 | 10 | Unlimited |
| Enterprise | Unlimited | Unlimited | Unlimited |

### 6.3 Stripe Integration

- [ ] Stripe Checkout for upgrades
- [ ] Webhook handler for subscription events
- [ ] Customer portal link

---

## Phase 7: Launch Preparation

> **Goal:** Polish and deploy.
> **Dependencies:** Phases 1-5 complete

### 7.1 Onboarding

- [ ] First-time user flow
- [ ] Create default project with sample items
- [ ] Tutorial tooltips

### 7.2 Landing Page

- [ ] Marketing homepage at `/`
- [ ] Feature showcase
- [ ] Pricing table

### 7.3 Error Handling

- [ ] Graceful error messages
- [ ] Empty states for all pages
- [ ] Loading states

### 7.4 Deployment

- [ ] Vercel deployment
- [ ] Environment variables
- [ ] Domain setup
- [ ] Supabase production project

---

## Open Questions

> Decisions to make before/during implementation

### Product Questions

| # | Question | Options | Decision |
|---|----------|---------|----------|
| 1 | Free tier limits? | 50/100/200 credits | |
| 2 | Style system redesign? | Keep JSON / Visual editor | |
| 3 | Team collaboration? | Yes (later) / No | |
| 4 | Export feature? | ZIP download / API access | |

### Technical Questions

| # | Question | Options | Decision |
|---|----------|---------|----------|
| 1 | URL structure? | `/p/[projectId]/icons` vs context-based | |
| 2 | Queue worker? | Edge Functions / Separate service | |
| 3 | Image bucket? | Public / Signed URLs | |
| 4 | Existing images? | Migrate / Start fresh | |

---

## Technical Reference

### Environment Variables

```env
# Existing
OPENAI_API_KEY=sk-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (optional)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

### Target File Structure

```
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/settings/page.tsx
│   │   ├── icons/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── styles/page.tsx
│   │   └── settings/
│   │       ├── page.tsx
│   │       └── billing/page.tsx
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   └── pricing/page.tsx
│   ├── auth/callback/route.ts
│   └── api/
│       ├── projects/
│       ├── categories/
│       ├── items/
│       ├── styles/
│       ├── generate/
│       ├── queue/
│       └── webhooks/
├── components/
│   ├── project-switcher.tsx
│   ├── asset-image.tsx
│   ├── user-menu.tsx
│   └── ...
├── contexts/
│   ├── auth-context.tsx
│   ├── project-context.tsx
│   └── generation-context.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   └── database.types.ts
├── supabase/
│   ├── migrations/
│   └── seed.sql
└── middleware.ts
```

### Useful Commands

```bash
# Supabase CLI
npx supabase start              # Local dev
npx supabase db push            # Push migrations
npx supabase gen types typescript --local > lib/database.types.ts

# Generate types from remote
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts

# Development
npm run dev
```

---

## Progress Tracking

| Phase | Status | Started | Completed | Notes |
|-------|--------|---------|-----------|-------|
| Phase 1: Foundation | Not Started | | | |
| Phase 2: Multi-Tenancy | Not Started | | | |
| Phase 3: Dynamic Content | Not Started | | | |
| Phase 4: Storage | Not Started | | | |
| Phase 5: Generation | Not Started | | | |
| Phase 6: Monetization | Not Started | | | Optional |
| Phase 7: Launch | Not Started | | | |

---

*This plan is a living document. Update as decisions are made and implementation progresses.*
