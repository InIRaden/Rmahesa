'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await fetch('/api/auth/logout', { method: 'POST' });
          router.push('/admin/login');
          router.refresh();
        });
      }}
      className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/5"
    >
      {pending ? 'Signing out...' : 'Logout'}
    </button>
  );
}
