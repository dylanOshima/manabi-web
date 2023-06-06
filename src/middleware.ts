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
  matcher: '/'
};