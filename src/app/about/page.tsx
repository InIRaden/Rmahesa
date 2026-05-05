import Image from 'next/image';
import { CallToAction } from '@/components/call-to-action';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getSettings } from '@/lib/content';

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div>
      <SiteHeader title={settings.siteTitle} navItems={settings.navItems as Array<{ label: string; href: string }>} logoUrl={settings.logoUrl} />
      <main className="container-shell space-y-12 py-14">
        <SectionHeading eyebrow="About" title={settings.aboutTitle} description="A fuller version of the developer and poet identity behind this portfolio." />
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 rounded-[2rem] border border-black/8 bg-white/75 p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
              <p className="font-serif text-4xl leading-tight text-ink dark:text-white">{settings.aboutSummary}</p>
              <div className="space-y-4 text-sm leading-7 text-ink/70 dark:text-white/65">
                <p>{settings.aboutBody}</p>
                <p>
                  I care about typography, pace, and emotional clarity. I want every page to feel useful first, then memorable.
                </p>
                <p>
                  When I am not building interfaces, I am writing poems, documenting the present, and collecting the details that make a life feel lived.
                </p>
              </div>
            </div>
            {settings.aboutImageUrl ? (
              <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-black/8 bg-cream shadow-soft dark:border-white/10 dark:bg-white/5">
                <Image src={settings.aboutImageUrl} alt="About portrait" fill className="object-cover" unoptimized sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            ) : null}
          </div>
        </Reveal>
      </main>
      <CallToAction />
      <SiteFooter />
    </div>
  );
}
