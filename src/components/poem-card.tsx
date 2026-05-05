export type PoemCardData = {
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  poemDate: Date;
};

export function PoemCard({ poem, large = false }: { poem: PoemCardData; large?: boolean }) {
  return (
    <article className="rounded-[1.75rem] border border-black/8 bg-white/72 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
      {poem.category ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">{poem.category}</p> : null}
      <h3 className={`${large ? 'mt-4 text-4xl' : 'mt-3 text-3xl'} font-serif leading-tight text-ink dark:text-white`}>
        {poem.title}
      </h3>
      <p className="mt-4 font-serif text-[1.15rem] leading-8 text-ink/78 dark:text-white/75">
        {poem.excerpt ?? poem.content}
      </p>
    </article>
  );
}
