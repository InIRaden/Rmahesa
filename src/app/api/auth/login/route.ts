import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { createAdminToken, authCookieOptions } from '@/lib/auth';
import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validators';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 });
  }

  let user: { id: string; email: string; name: string; passwordHash?: string } | null = null;
  const password = parsed.data.password;

  try {
    user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  } catch {
    user = null;
  }

  const passwordMatches = user
    ? await bcrypt.compare(password, user.passwordHash as string)
    : parsed.data.email === env.ADMIN_EMAIL && password === env.ADMIN_PASSWORD;

  if (!user && passwordMatches) {
    try {
      user = await prisma.user.upsert({
        where: { email: env.ADMIN_EMAIL },
        update: {},
        create: {
          name: 'Admin',
          email: env.ADMIN_EMAIL,
          passwordHash: await bcrypt.hash(env.ADMIN_PASSWORD, 12)
        }
      });
    } catch {
      user = {
        id: 'bootstrap-admin',
        email: env.ADMIN_EMAIL,
        name: 'Admin'
      };
    }
  }

  if (!user || !passwordMatches) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const token = await createAdminToken({ id: user.id, email: user.email, name: user.name, role: 'ADMIN' });
  const response = NextResponse.json({ success: true });
  response.cookies.set('rmahesa_admin_session', token, authCookieOptions());
  return response;
}
