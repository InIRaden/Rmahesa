import Link from 'next/link';

export function CallToAction() {
  return (
    <section className="container-shell py-10 sm:py-14">
      <div className="glass-panel overflow-hidden rounded-[2rem] px-8 py-10 shadow-soft sm:px-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay">Let us build something meaningful</p>
            <h2 className="font-serif text-4xl leading-tight text-ink dark:text-white sm:text-5xl">
              Quiet interfaces, thoughtful storytelling, and a site that feels alive.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:-translate-y-0.5 dark:bg-paper dark:text-ink">
              Let&apos;s Work Together
            </Link>
            <Link href="/portfolio" className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/5">
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
