'use client';

import { type FormEvent, useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? 'success' : 'error');
    if (response.ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.75rem] border border-black/8 bg-white/75 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" placeholder="Your name" required className="rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none placeholder:text-ink/35 dark:border-white/10" />
        <input name="email" type="email" placeholder="Your email" required className="rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none placeholder:text-ink/35 dark:border-white/10" />
      </div>
      <input name="subject" placeholder="Subject" required className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none placeholder:text-ink/35 dark:border-white/10" />
      <textarea name="content" placeholder="Write your message" rows={6} required className="w-full rounded-[1.25rem] border border-black/10 bg-transparent px-4 py-3 outline-none placeholder:text-ink/35 dark:border-white/10" />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink/60 dark:text-white/60">
          {status === 'success' ? 'Message sent successfully.' : status === 'error' ? 'Something went wrong.' : 'I reply to thoughtful messages as soon as I can.'}
        </p>
        <button type="submit" disabled={status === 'loading'} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:-translate-y-0.5 disabled:opacity-60 dark:bg-paper dark:text-ink">
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
