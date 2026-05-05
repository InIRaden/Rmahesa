import { CallToAction } from '@/components/call-to-action';
import { ContactForm } from '@/components/contact-form';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getSettings } from '@/lib/content';

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div>
      <SiteHeader title={settings.siteTitle} navItems={settings.navItems as Array<{ label: string; href: string }>} logoUrl={settings.logoUrl} />
      <main className="container-shell space-y-10 py-14">
        <SectionHeading eyebrow="Contact" title="Let&apos;s talk about a thoughtful collaboration" description="Use the form below to send a message, then follow the social links in the footer." />
        <Reveal>
          <ContactForm />
        </Reveal>
      </main>
      <CallToAction />
      <SiteFooter />
    </div>
  );
}
