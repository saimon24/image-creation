import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { GenerationProvider } from "@/contexts/generation-context";
import { GenerationPanel } from "@/components/generation-panel";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asset Generator",
  description: "Generate and manage game assets with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GenerationProvider>
            <div className="relative flex min-h-screen flex-col">
              <Nav />
              <main className="flex-1 container py-6">{children}</main>
            </div>
            <GenerationPanel />
          </GenerationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
