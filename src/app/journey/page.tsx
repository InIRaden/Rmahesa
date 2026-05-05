import { CallToAction } from '@/components/call-to-action';
import { DocumentationCard } from '@/components/documentation-card';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getAllJourneyItems, getSettings } from '@/lib/content';

export default async function JourneyPage() {
  const [settings, items] = await Promise.all([getSettings(), getAllJourneyItems()]);

  return (
    <div>
      <SiteHeader title={settings.siteTitle} navItems={settings.navItems as Array<{ label: string; href: string }>} logoUrl={settings.logoUrl} />
      <main className="container-shell space-y-10 py-14">
        <SectionHeading eyebrow="Journey" title="Life moments, activities, and quiet milestones" description="A documentation page that feels more like a living scrapbook than a database table." />
        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <Reveal key={item.id}>
              <DocumentationCard item={item} />
            </Reveal>
          ))}
        </div>
      </main>
      <CallToAction />
      <SiteFooter />
    </div>
  );
}
