import { NextResponse, type NextRequest } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  return NextResponse.json({ session });
}
