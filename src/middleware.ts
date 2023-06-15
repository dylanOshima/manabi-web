import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { withSessionVerification } from './lib/auth/withSessionVerification';
 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  res = await withSessionVerification(req, res);
  return res;
}
 
// See "Matching Paths" below to learn more
export const config = {
  /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico (favicon file)
    * - auth/ (needed to authorize yourself)
    */
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth).*)'
};