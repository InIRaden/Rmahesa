export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl space-y-3 text-center">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-clay">{eyebrow}</p> : null}
      <h2 className="font-serif text-4xl leading-none text-ink dark:text-white sm:text-5xl">{title}</h2>
      {description ? <p className="text-sm leading-7 text-ink/70 dark:text-white/65">{description}</p> : null}
    </div>
  );
}
