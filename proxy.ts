import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let isAuthenticated = false;
  let newCookieHeader: string | null = null;

  if (accessToken) {
    isAuthenticated = true;
  } else if (refreshToken) {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
      const response = await fetch(`${baseURL}/auth/session`, {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json().catch(() => null);
        isAuthenticated = !!data;
        newCookieHeader = response.headers.get('set-cookie');
      }
    } catch {
      isAuthenticated = false;
    }
  }

  if (isPrivate && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublic && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = NextResponse.next();

  if (newCookieHeader) {
    response.headers.set('set-cookie', newCookieHeader);
  }

  return response;
}

export { proxy as middleware };

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};

  