'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Signing in...');

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    const result = await response.json();
    if (!response.ok) {
      setStatus(result.error ?? 'Unable to sign in.');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.75rem] border border-black/8 bg-white/75 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
      <div className="space-y-4">
        <input name="email" type="email" placeholder="Admin email" required className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none dark:border-white/10" />
        <input name="password" type="password" placeholder="Password" required className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none dark:border-white/10" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink/60 dark:text-white/60">{status || 'Use the seeded admin credentials from your .env file.'}</p>
        <button type="submit" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:-translate-y-0.5 dark:bg-paper dark:text-ink">
          Sign in
        </button>
      </div>
    </form>
  );
}
