export const env = {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev-only-secret-change-me',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@example.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? 'ChangeMe123!',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
};
