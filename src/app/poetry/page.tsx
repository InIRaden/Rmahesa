import { CallToAction } from '@/components/call-to-action';
import { PoemCard } from '@/components/poem-card';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { formatDate } from '@/lib/format';
import { getAllPoems, getSettings } from '@/lib/content';

export default async function PoetryPage() {
  const [settings, poems] = await Promise.all([getSettings(), getAllPoems()]);

  return (
    <div>
      <SiteHeader title={settings.siteTitle} navItems={settings.navItems as Array<{ label: string; href: string }>} logoUrl={settings.logoUrl} />
      <main className="container-shell space-y-10 py-14">
        <SectionHeading eyebrow="Poetry" title="A slower page for a slower reading experience" description="Typography leads the experience, with generous spacing and a soft editorial feel." />
        <div className="grid gap-6 lg:grid-cols-2">
          {poems.map((poem) => (
            <Reveal key={poem.id}>
              <PoemCard poem={poem} large />
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-ink/50 dark:text-white/45">{formatDate(poem.poemDate)}</p>
            </Reveal>
          ))}
        </div>
      </main>
      <CallToAction />
      <SiteFooter />
    </div>
  );
}
