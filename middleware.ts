import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from '@/lib/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    routes.auth.signIn,
    routes.auth.signUp,
    routes.auth.forgotPassword,
    routes.public.home,
    routes.public.courses
  ];

  // Allow public routes and static assets
  if (publicRoutes.includes(pathname) || 
      pathname.startsWith('/_next/') || 
      pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check for authentication token in cookies
  const authToken = request.cookies.get('auth-token');
  const userRole = request.cookies.get('user-role')?.value;

  // If no auth token, redirect to sign in
  if (!authToken) {
    const signInUrl = new URL(routes.auth.signIn, request.url);
    signInUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Role-based route protection
  if (pathname.startsWith('/instructor') && userRole !== 'instructor') {
    return NextResponse.redirect(new URL(routes.student.dashboard, request.url));
  }

  if (pathname.startsWith('/student') && userRole !== 'student') {
    return NextResponse.redirect(new URL(routes.instructor.dashboard, request.url));
  }

  // If authenticated user tries to access auth pages, redirect to appropriate dashboard
  if (pathname.startsWith('/auth/')) {
    if (userRole === 'instructor') {
      return NextResponse.redirect(new URL(routes.instructor.dashboard, request.url));
    }
    if (userRole === 'student') {
      return NextResponse.redirect(new URL(routes.student.dashboard, request.url));
    }
  }

  return NextResponse.next();
}