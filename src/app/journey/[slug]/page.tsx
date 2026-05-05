import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CallToAction } from '@/components/call-to-action';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { formatDate } from '@/lib/format';
import { getJourneyBySlug, getSettings } from '@/lib/content';

export default async function JourneyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, item] = await Promise.all([getSettings(), getJourneyBySlug(slug)]);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <SiteHeader title={settings.siteTitle} navItems={settings.navItems as Array<{ label: string; href: string }>} logoUrl={settings.logoUrl} />
      <main className="container-shell space-y-10 py-14">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Journey moment</p>
          <h1 className="font-serif text-6xl leading-none text-ink dark:text-white">{item.title}</h1>
          <p className="text-lg leading-8 text-ink/70 dark:text-white/65">{item.description}</p>
          <p className="text-sm text-ink/55 dark:text-white/55">{formatDate(item.date)}</p>
        </div>
        {item.imageUrl ? (
          <div className="relative mx-auto aspect-[16/9] max-w-3xl overflow-hidden rounded-[2rem] border border-black/8 bg-cream shadow-soft dark:border-white/10 dark:bg-white/5">
            <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
        ) : null}
        <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-black/8 bg-white/75 p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
          <div className="space-y-4 text-center">
            <h2 className="font-serif text-3xl text-ink dark:text-white">Reflecting on this moment</h2>
            <p className="text-sm leading-7 text-ink/70 dark:text-white/65">
              This moment captures a meaningful point in the journey, a quiet milestone worth remembering and honoring as part of the continuous story.
            </p>
          </div>
        </div>
      </main>
      <CallToAction />
      <SiteFooter />
    </div>
  );
}
