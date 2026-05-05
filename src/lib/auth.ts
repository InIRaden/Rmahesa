import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';
import { env } from '@/lib/env';

export const adminCookieName = 'rmahesa_admin_session';

const secretKey = new TextEncoder().encode(env.JWT_SECRET);

export type AdminSession = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN';
};

export async function createAdminToken(session: AdminSession) {
  return new SignJWT({
    email: session.email,
    name: session.name,
    role: session.role
  })
    .setSubject(session.id)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return {
      id: payload.sub ?? '',
      email: String(payload.email ?? ''),
      name: String(payload.name ?? ''),
      role: 'ADMIN' as const
    } satisfies AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;
  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

export async function getAdminSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(adminCookieName)?.value;
  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

export function authCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  };
}
