import { LoginForm } from '@/components/login-form';

export default function AdminLoginPage() {
  return (
    <div className="container-shell flex min-h-[calc(100vh-5rem)] items-center justify-center py-12">
      <div className="w-full max-w-xl space-y-6">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay">Admin login</p>
          <h1 className="font-serif text-5xl text-ink dark:text-white">Welcome back</h1>
          <p className="text-sm leading-7 text-ink/65 dark:text-white/60">Sign in to edit your portfolio, poetry, and documentation content.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
