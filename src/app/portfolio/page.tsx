import { CallToAction } from '@/components/call-to-action';
import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getAllProjects, getSettings } from '@/lib/content';

export default async function PortfolioPage() {
  const [settings, projects] = await Promise.all([getSettings(), getAllProjects()]);

  return (
    <div>
      <SiteHeader title={settings.siteTitle} navItems={settings.navItems as Array<{ label: string; href: string }>} logoUrl={settings.logoUrl} />
      <main className="container-shell space-y-10 py-14">
        <SectionHeading eyebrow="Portfolio" title="Projects shaped with care" description="A full grid of work, each one emphasizing clarity, motion, and utility." />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </main>
      <CallToAction />
      <SiteFooter />
    </div>
  );
}
