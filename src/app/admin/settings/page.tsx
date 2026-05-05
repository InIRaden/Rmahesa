import { SettingsForm } from '@/components/settings-form';
import { getSettings } from '@/lib/content';

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <section className="space-y-3 rounded-[2rem] border border-black/8 bg-white/75 p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-clay">Global settings</p>
        <h2 className="font-serif text-5xl text-ink dark:text-white">Editable site-wide content</h2>
        <p className="max-w-3xl text-sm leading-7 text-ink/65 dark:text-white/60">Update the logo, navigation, footer, social links, theme color, and hero content from one place.</p>
      </section>
      <SettingsForm settings={settings as Record<string, unknown>} />
    </div>
  );
}
