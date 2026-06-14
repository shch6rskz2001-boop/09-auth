import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivate = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublic = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let isAuthenticated = false;
  const newCookies: { name: string; value: string }[] = [];

  if (accessToken) {
    isAuthenticated = true;
  } else if (refreshToken) {
    try {
      const response = await checkSession();

      if (response) {
        isAuthenticated = true;

        const setCookieHeader = response.headers['set-cookie'];

        if (setCookieHeader) {
          for (const cookie of setCookieHeader) {
            const [nameValue] = cookie.split(';');
            const [name, value] = nameValue.split('=');

            if (name && value) {
              newCookies.push({
                name: name.trim(),
                value: value.trim(),
              });
            }
          }
        }
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

  for (const { name, value } of newCookies) {
    response.cookies.set(name, value);
  }

  return response;
}

export { proxy as middleware };

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
  