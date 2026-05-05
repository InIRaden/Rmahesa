import Link from 'next/link';
import { getAdminStats, getSettings } from '@/lib/content';

const shortcuts = [
  { label: 'Settings', href: '/admin/settings' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Poems', href: '/admin/poems' },
  { label: 'Journey', href: '/admin/documentations' },
  { label: 'Certificates', href: '/admin/certificates' },
  { label: 'CVs', href: '/admin/resumes' },
  { label: 'Messages', href: '/admin/messages' }
];

export default async function AdminDashboardPage() {
  const [stats, settings] = await Promise.all([getAdminStats(), getSettings()]);

  const statCards = [
    { label: 'Projects', value: stats.projects },
    { label: 'Poems', value: stats.poems },
    { label: 'Journey entries', value: stats.docs },
    { label: 'Certificates', value: stats.certificates },
    { label: 'CVs', value: stats.resumes },
    { label: 'Messages', value: stats.messages }
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-black/8 bg-white/75 p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay">Overview</p>
        <h2 className="mt-3 font-serif text-5xl leading-tight text-ink dark:text-white">{settings.siteTitle} CMS</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/65 dark:text-white/60">
          Manage your landing page, portfolio, poetry, journey, certificates, and messages from one calm workspace.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => (
          <article key={card.label} className="rounded-[1.5rem] border border-black/8 bg-white/75 p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">{card.label}</p>
            <p className="mt-3 font-serif text-4xl text-ink dark:text-white">{card.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shortcuts.map((shortcut) => (
          <Link key={shortcut.href} href={shortcut.href} className="rounded-[1.5rem] border border-black/8 bg-white/75 p-5 shadow-soft transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">Open</p>
            <p className="mt-2 font-serif text-3xl text-ink dark:text-white">{shortcut.label}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
