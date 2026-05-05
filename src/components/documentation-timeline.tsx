import Image from 'next/image';
import { formatDate } from '@/lib/format';

export type DocumentationItem = {
  title: string;
  description: string;
  imageUrl: string | null;
  date: Date;
};

export function DocumentationTimeline({ items }: { items: DocumentationItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <article key={`${item.title}-${index}`} className="grid gap-4 rounded-[1.5rem] border border-black/8 bg-white/72 p-5 shadow-soft md:grid-cols-[160px_1fr] dark:border-white/10 dark:bg-white/5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-cream dark:bg-white/5">
            {item.imageUrl ? <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized sizes="160px" /> : null}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{formatDate(item.date)}</p>
            <h3 className="font-serif text-3xl text-ink dark:text-white">{item.title}</h3>
            <p className="text-sm leading-7 text-ink/70 dark:text-white/65">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
