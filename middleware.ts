import { NextRequest, NextResponse } from 'next/server';
import { adminCookieName, verifyAdminToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminArea = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  if (!isAdminArea && !isAdminApi) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(adminCookieName)?.value;
  const session = token ? await verifyAdminToken(token) : null;

  if (session) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
