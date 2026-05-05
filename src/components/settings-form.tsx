'use client';

import { type FormEvent, useState } from 'react';
import { MediaUploadField } from '@/components/media-upload-field';

const defaultNavItems = JSON.stringify(
  [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Poetry', href: '/poetry' },
    { label: 'Journey', href: '/journey' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Contact', href: '/contact' }
  ],
  null,
  2
);

const defaultSocialLinks = JSON.stringify(
  [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' }
  ],
  null,
  2
);

type SettingsShape = Record<string, string>;

export function SettingsForm({ settings }: { settings: Record<string, unknown> }) {
  const [form, setForm] = useState<SettingsShape>({
    siteTitle: String(settings.siteTitle ?? ''),
    siteDescription: String(settings.siteDescription ?? ''),
    logoUrl: String(settings.logoUrl ?? ''),
    faviconUrl: String(settings.faviconUrl ?? ''),
    footerText: String(settings.footerText ?? ''),
    themeColor: String(settings.themeColor ?? ''),
    heroHeadline: String(settings.heroHeadline ?? ''),
    heroSubheadline: String(settings.heroSubheadline ?? ''),
    heroProfileImage: String(settings.heroProfileImage ?? ''),
    heroPrimaryLabel: String(settings.heroPrimaryLabel ?? ''),
    heroPrimaryHref: String(settings.heroPrimaryHref ?? ''),
    heroSecondaryLabel: String(settings.heroSecondaryLabel ?? ''),
    heroSecondaryHref: String(settings.heroSecondaryHref ?? ''),
    aboutTitle: String(settings.aboutTitle ?? ''),
    aboutSummary: String(settings.aboutSummary ?? ''),
    aboutBody: String(settings.aboutBody ?? ''),
    aboutImageUrl: String(settings.aboutImageUrl ?? ''),
    seoTitle: String(settings.seoTitle ?? ''),
    seoDescription: String(settings.seoDescription ?? ''),
    navItems: typeof settings.navItems === 'string' ? settings.navItems : JSON.stringify(settings.navItems ?? [], null, 2),
    socialLinks: typeof settings.socialLinks === 'string' ? settings.socialLinks : JSON.stringify(settings.socialLinks ?? [], null, 2)
  });
  const [status, setStatus] = useState('');

  function updateField(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Saving...');

    let navItems: Array<{ label: string; href: string }> = [];
    let socialLinks: Array<{ label: string; href: string }> = [];

    try {
      navItems = JSON.parse(form.navItems || defaultNavItems);
      socialLinks = JSON.parse(form.socialLinks || defaultSocialLinks);
    } catch {
      setStatus('Invalid JSON in navigation or social links.');
      return;
    }

    const response = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        navItems,
        socialLinks
      })
    });

    const result = await response.json();
    setStatus(response.ok ? 'Settings saved.' : result.error ?? 'Unable to save settings.');
  }

  const fields = [
    { name: 'siteTitle', label: 'Website title' },
    { name: 'siteDescription', label: 'SEO description' },
    { name: 'logoUrl', label: 'Logo URL' },
    { name: 'faviconUrl', label: 'Favicon URL' },
    { name: 'footerText', label: 'Footer text' },
    { name: 'themeColor', label: 'Theme color' },
    { name: 'heroHeadline', label: 'Hero headline' },
    { name: 'heroSubheadline', label: 'Hero subheadline' },
    { name: 'heroProfileImage', label: 'Hero image URL' },
    { name: 'heroPrimaryLabel', label: 'Primary CTA label' },
    { name: 'heroPrimaryHref', label: 'Primary CTA href' },
    { name: 'heroSecondaryLabel', label: 'Secondary CTA label' },
    { name: 'heroSecondaryHref', label: 'Secondary CTA href' },
    { name: 'aboutTitle', label: 'About title' },
    { name: 'aboutSummary', label: 'About summary' },
    { name: 'aboutBody', label: 'About body' },
    { name: 'aboutImageUrl', label: 'About image URL' },
    { name: 'seoTitle', label: 'SEO title' },
    { name: 'seoDescription', label: 'SEO description' }
  ];

  const imageFields = [
    { name: 'logoUrl' },
    { name: 'faviconUrl' },
    { name: 'heroProfileImage' },
    { name: 'aboutImageUrl' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[1.75rem] border border-black/8 bg-white/75 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2 md:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{field.label}</span>
            {field.name === 'siteDescription' || field.name === 'aboutSummary' || field.name === 'aboutBody' || field.name === 'footerText' || field.name === 'heroSubheadline' ? (
              <textarea
                value={form[field.name] ?? ''}
                onChange={(event) => updateField(field.name, event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none placeholder:text-ink/35 dark:border-white/10"
              />
            ) : imageFields.some((imageField) => imageField.name === field.name) ? (
              <MediaUploadField
                label={field.label}
                value={form[field.name] ?? ''}
                onChange={(value) => updateField(field.name, value)}
                folder="rmahesa/settings"
              />
            ) : (
              <input
                value={form[field.name] ?? ''}
                onChange={(event) => updateField(field.name, event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none placeholder:text-ink/35 dark:border-white/10"
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">Navigation JSON</span>
          <textarea value={form.navItems ?? ''} onChange={(event) => updateField('navItems', event.target.value)} rows={10} className="w-full rounded-[1.25rem] border border-black/10 bg-transparent px-4 py-3 font-mono text-sm outline-none dark:border-white/10" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">Social links JSON</span>
          <textarea value={form.socialLinks ?? ''} onChange={(event) => updateField('socialLinks', event.target.value)} rows={10} className="w-full rounded-[1.25rem] border border-black/10 bg-transparent px-4 py-3 font-mono text-sm outline-none dark:border-white/10" />
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button type="submit" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:-translate-y-0.5 dark:bg-paper dark:text-ink">
          Save settings
        </button>
        <p className="text-sm text-ink/60 dark:text-white/60">{status || 'Edit the global site content used across the landing page and footer.'}</p>
      </div>
    </form>
  );
}
