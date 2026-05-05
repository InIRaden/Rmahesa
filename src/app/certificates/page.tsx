import { CallToAction } from '@/components/call-to-action';
import { CertificateCard } from '@/components/certificate-card';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getAllCertificates, getSettings } from '@/lib/content';

export default async function CertificatesPage() {
  const [settings, certificates] = await Promise.all([getSettings(), getAllCertificates()]);

  return (
    <div>
      <SiteHeader title={settings.siteTitle} navItems={settings.navItems as Array<{ label: string; href: string }>} logoUrl={settings.logoUrl} />
      <main className="container-shell space-y-10 py-14">
        <SectionHeading eyebrow="Certificates" title="Milestones and proof of learning" description="A grid of certifications presented with a clean gallery rhythm." />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {certificates.map((certificate) => (
            <Reveal key={certificate.id}>
              <CertificateCard certificate={certificate} />
            </Reveal>
          ))}
        </div>
      </main>
      <CallToAction />
      <SiteFooter />
    </div>
  );
}
