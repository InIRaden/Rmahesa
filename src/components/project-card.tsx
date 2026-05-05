import Image from 'next/image';
import Link from 'next/link';
import { readTechStack } from '@/lib/content';

export type ProjectCardData = {
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  techStack: unknown;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
};

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const techStack = Array.isArray(project.techStack) ? project.techStack : readTechStack(String(project.techStack ?? ''));

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-black/8 bg-white/75 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(17,17,17,0.10)] dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream dark:bg-white/5">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105" unoptimized sizes="(min-width: 1024px) 50vw, 100vw" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-3xl leading-none text-ink dark:text-white">{project.title}</h3>
          {project.featured ? <span className="rounded-full bg-clay/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-clay">Featured</span> : null}
        </div>
        <p className="text-sm leading-7 text-ink/70 dark:text-white/65">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, 4).map((tech) => (
            <span key={String(tech)} className="rounded-full border border-black/8 px-3 py-1 text-xs text-ink/70 dark:border-white/10 dark:text-white/65">
              {String(tech)}
            </span>
          ))}
        </div>
        <Link href={`/portfolio/${project.slug}`} className="inline-flex text-sm font-medium text-ink underline decoration-clay/40 underline-offset-4 transition hover:decoration-clay dark:text-white">
          View project
        </Link>
      </div>
    </article>
  );
}
