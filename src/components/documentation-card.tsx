import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/format';

export type DocumentationCardData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  date: Date;
};

export function DocumentationCard({ item }: { item: DocumentationCardData }) {
  return (
    <article className="group overflow-hidden rounded-[1rem] border border-black/8 bg-white/75 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(17,17,17,0.08)] dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream dark:bg-white/5">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" unoptimized sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-serif text-lg leading-tight text-ink dark:text-white line-clamp-2">{item.title}</h3>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{formatDate(item.date)}</p>
        <p className="text-xs leading-5 text-ink/70 dark:text-white/65 line-clamp-2">{item.description}</p>
        <Link href={`/journey/${item.slug}`} className="inline-flex text-xs font-medium text-ink underline decoration-clay/40 underline-offset-2 transition hover:decoration-clay dark:text-white">
          Read
        </Link>
      </div>
    </article>
  );
}
