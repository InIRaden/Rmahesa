import Link from 'next/link';
import { getSocialLinks } from '@/lib/content';

export async function SiteFooter() {
  const socialLinks = await getSocialLinks();

  return (
    <footer className="border-t border-black/5 py-10 dark:border-white/10">
      <div className="container-shell flex flex-col gap-6 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between dark:text-white/70">
        <p>© {new Date().getFullYear()} Rmahesa. {""}A digital journal of code, poems, and moments.</p>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <Link key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-ink dark:hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
