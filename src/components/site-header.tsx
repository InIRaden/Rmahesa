import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/ui';

export type NavItem = { label: string; href: string };

export function SiteHeader({ title, navItems, logoUrl }: { title: string; navItems: NavItem[]; logoUrl?: string | null }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-paper/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#0f0f10]/80">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="relative inline-flex h-10 items-center justify-center overflow-hidden text-sm font-semibold shadow-sm transition group-hover:-translate-y-0.5">
            {logoUrl ? (
              <Image src={logoUrl} alt={title} width={160} height={40} className="h-10 w-auto object-contain" unoptimized />
            ) : (
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/75 dark:border-white/10 dark:bg-white/5">RM</span>
            )}
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70 dark:text-white/70">
            {title}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-ink/70 lg:flex dark:text-white/70">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn('transition hover:text-ink dark:hover:text-white')}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact" className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-paper dark:text-ink">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
