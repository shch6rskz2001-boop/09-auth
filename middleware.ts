import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  
  const cookieHeader = request.headers.get('cookie') ?? '';

  let isAuthenticated = false;

  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
    const response = await fetch(`${baseURL}/auth/session`, {
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);
      isAuthenticated = !!data;
    }
  } catch {
    isAuthenticated = false;
  }

  if (isPrivate && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublic && isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};