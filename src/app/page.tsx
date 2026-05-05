import Image from 'next/image';
import Link from 'next/link';
import { CallToAction } from '@/components/call-to-action';
import { DocumentationCard } from '@/components/documentation-card';
import { PoemCard } from '@/components/poem-card';
import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getFeaturedCertificates, getFeaturedPoems, getFeaturedProjects, getJourneyItems, getSettings } from '@/lib/content';
import { formatDate } from '@/lib/format';

export default async function HomePage() {
  const [settings, projects, poems, journey, certificates] = await Promise.all([
    getSettings(),
    getFeaturedProjects(),
    getFeaturedPoems(),
    getJourneyItems(),
    getFeaturedCertificates()
  ]);

  return (
    <div>
      <SiteHeader title={settings.siteTitle} navItems={settings.navItems as Array<{ label: string; href: string }>} logoUrl={settings.logoUrl} />
      <main>
        <section className="container-shell flex min-h-[calc(100vh-5rem)] items-center py-14 lg:py-20">
          <Reveal className="mx-auto w-full space-y-8 text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-black/8 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink/65 shadow-soft dark:border-white/10 dark:bg-white/5 dark:text-white/65">
              <span className="h-2 w-2 rounded-full bg-clay" /> Developer, poet, and documentarian
            </div>
            <div className="space-y-5">
              <h1 className="mx-auto max-w-4xl font-serif text-6xl leading-[0.95] text-ink dark:text-white sm:text-7xl lg:text-[5.3rem]">
                {settings.heroHeadline}
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-ink/70 dark:text-white/70">
                {settings.heroSubheadline}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={settings.heroPrimaryHref} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:-translate-y-0.5 dark:bg-paper dark:text-ink">
                {settings.heroPrimaryLabel}
              </Link>
              <Link href={settings.heroSecondaryHref} className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/5">
                {settings.heroSecondaryLabel}
              </Link>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4">
              {[
                ['Projects', String(projects.length)],
                ['Poems', String(poems.length)],
                ['Moments', String(journey.length)]
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-black/8 bg-white/72 p-4 shadow-soft dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs uppercase tracking-[0.22em] text-clay">{label}</p>
                  <p className="mt-2 font-serif text-3xl text-ink dark:text-white">{value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="container-shell space-y-8 py-8 sm:py-12">
          <SectionHeading eyebrow="About preview" title="A developer identity with a poetic pulse" description="A short story of structure and tenderness, shown in the first glance of the site." />
          <Reveal>
            <div className="mx-auto max-w-2xl space-y-5 rounded-[2rem] border border-black/8 bg-white/70 p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
              <p className="text-center text-lg leading-8 text-ink/75 dark:text-white/70">{settings.aboutSummary}</p>
              <p className="text-center text-sm leading-7 text-ink/65 dark:text-white/60">{settings.aboutBody}</p>
              <div className="flex justify-center">
                <Link href="/about" className="inline-flex text-sm font-medium text-ink underline decoration-clay/40 underline-offset-4 dark:text-white">
                  Read More
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="container-shell space-y-8 py-8 sm:py-12">
          <SectionHeading eyebrow="Featured projects" title="Selected work with calm visual rhythm" description="Hover-friendly cards that frame each project like a polished case study." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {projects.map((project) => (
              <Reveal key={project.id} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container-shell space-y-8 py-8 sm:py-12">
          <SectionHeading eyebrow="Poetry preview" title="Words that stay soft, but linger" description="Two poems displayed with a serif-led reading experience." />
          <div className="grid gap-6 lg:grid-cols-2">
            {poems.map((poem) => (
              <Reveal key={poem.id}>
                <PoemCard poem={poem} large />
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-ink/50 dark:text-white/45">{formatDate(poem.poemDate)}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container-shell space-y-8 py-8 sm:py-12">
          <SectionHeading eyebrow="Journey preview" title="Life moments arranged as a quiet timeline" description="A snippet of activities, memories, and small milestones." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {journey.map((item) => (
              <Reveal key={item.id}>
                <DocumentationCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container-shell space-y-8 py-8 sm:py-12">
          <SectionHeading eyebrow="Certificates preview" title="Proof of growth, presented lightly" description="Mini previews arranged in a clean grid." />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {certificates.map((certificate) => (
              <Reveal key={certificate.id}>
                <article className="overflow-hidden rounded-[1.5rem] border border-black/8 bg-white/75 shadow-soft dark:border-white/10 dark:bg-white/5">
                  <div className="relative aspect-[4/3] bg-cream dark:bg-white/5">
                    {certificate.imageUrl ? <Image src={certificate.imageUrl} alt={certificate.title} fill className="object-cover" unoptimized sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" /> : null}
                  </div>
                  <div className="space-y-2 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{certificate.issuer}</p>
                    <h3 className="font-serif text-2xl text-ink dark:text-white">{certificate.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <CallToAction />
      </main>
      <SiteFooter />
    </div>
  );
}
