import Image from 'next/image';

export type CertificateCardData = {
  title: string;
  issuer: string;
  imageUrl: string | null;
  date: Date;
};

export function CertificateCard({ certificate }: { certificate: CertificateCardData }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-black/8 bg-white/75 shadow-soft dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[4/3] bg-cream dark:bg-white/5">
        {certificate.imageUrl ? <Image src={certificate.imageUrl} alt={certificate.title} fill className="object-cover" unoptimized sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" /> : null}
      </div>
      <div className="space-y-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{certificate.issuer}</p>
        <h3 className="font-serif text-2xl text-ink dark:text-white">{certificate.title}</h3>
      </div>
    </article>
  );
}
