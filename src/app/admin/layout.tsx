import Link from 'next/link';
import { type ReactNode } from 'react';
import { LogoutButton } from '@/components/logout-button';

const adminLinks = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Settings', href: '/admin/settings' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Poems', href: '/admin/poems' },
  { label: 'Journey', href: '/admin/documentations' },
  { label: 'Certificates', href: '/admin/certificates' },
  { label: 'Messages', href: '/admin/messages' }
];

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-[#0f0f10] dark:text-white">
      <header className="border-b border-black/5 bg-paper/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#0f0f10]/90">
        <div className="container-shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-clay">Admin CMS</p>
            <h1 className="font-serif text-3xl text-ink dark:text-white">Rmahesa Control Room</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-ink transition hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/5">
              View site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="container-shell grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-3">
          <nav className="rounded-[1.75rem] border border-black/8 bg-white/75 p-4 shadow-soft dark:border-white/10 dark:bg-white/5">
            <div className="space-y-1">
              {adminLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-2xl px-4 py-3 text-sm font-medium text-ink/75 transition hover:bg-black/5 hover:text-ink dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>
        <main className="space-y-8 pb-12">{children}</main>
      </div>
    </div>
  );
}
