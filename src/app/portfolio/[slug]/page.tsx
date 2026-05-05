import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CallToAction } from '@/components/call-to-action';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { formatDate } from '@/lib/format';
import { getProjectBySlug, getSettings, readTechStack } from '@/lib/content';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([getSettings(), getProjectBySlug(slug)]);

  if (!project) {
    notFound();
  }

  const techStack = Array.isArray(project.techStack) ? project.techStack : readTechStack(String(project.techStack ?? ''));

  return (
    <div>
      <SiteHeader title={settings.siteTitle} navItems={settings.navItems as Array<{ label: string; href: string }>} logoUrl={settings.logoUrl} />
      <main className="container-shell space-y-10 py-14">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Project detail</p>
          <h1 className="font-serif text-6xl leading-none text-ink dark:text-white">{project.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-ink/70 dark:text-white/65">{project.description}</p>
          <p className="text-sm text-ink/55 dark:text-white/55">Published {formatDate(project.createdAt)}</p>
        </div>
        {project.imageUrl ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-black/8 bg-cream shadow-soft dark:border-white/10 dark:bg-white/5">
            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" unoptimized sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
        ) : null}
        <div className="grid gap-6 lg:grid-cols-[1fr_0.5fr]">
          <div className="rounded-[1.75rem] border border-black/8 bg-white/75 p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
            <h2 className="font-serif text-3xl text-ink dark:text-white">What makes this project distinct</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70 dark:text-white/65">
              This project is designed as a calm digital experience with focused layout, subtle motion, and a visual language that feels deliberate.
            </p>
          </div>
          <aside className="rounded-[1.75rem] border border-black/8 bg-white/75 p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={String(tech)} className="rounded-full border border-black/8 px-3 py-1 text-xs text-ink/70 dark:border-white/10 dark:text-white/65">
                  {String(tech)}
                </span>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm text-ink/70 dark:text-white/65">
              {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer" className="block underline underline-offset-4">GitHub</a> : null}
              {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="block underline underline-offset-4">Live site</a> : null}
            </div>
          </aside>
        </div>
      </main>
      <CallToAction />
      <SiteFooter />
    </div>
  );
}
