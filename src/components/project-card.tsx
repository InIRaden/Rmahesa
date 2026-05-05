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
    <article className="group flex h-full min-h-[24rem] flex-col overflow-hidden rounded-[1rem] border border-black/8 bg-white/75 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(17,17,17,0.08)] dark:border-white/10 dark:bg-white/5 sm:min-h-[26rem] lg:min-h-[27rem]">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream dark:bg-white/5">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105" unoptimized sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-4">
        <div>
          <h3 className="font-serif text-lg leading-tight text-ink dark:text-white line-clamp-2">{project.title}</h3>
        </div>
        <p className="text-xs leading-5 text-ink/70 dark:text-white/65 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, 3).map((tech) => (
            <span key={String(tech)} className="rounded-full border border-black/8 px-2 py-1 text-[10px] text-ink/70 dark:border-white/10 dark:text-white/65">
              {String(tech)}
            </span>
          ))}
        </div>
        <Link href={`/portfolio/${project.slug}`} className="mt-auto inline-flex text-xs font-medium text-ink underline decoration-clay/40 underline-offset-2 transition hover:decoration-clay dark:text-white">
          Read more
        </Link>
      </div>
    </article>
  );
}
