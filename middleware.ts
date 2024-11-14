import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from '@/lib/routes';

// Helper to check if a path matches any of the given routes
function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define route patterns
  const publicPaths = [
    routes.public.home,
    routes.public.courses,
    '/api',
    '/_next',
    '/favicon.ico',
    '/manifest.json',
    '/assets'
  ];

  const authPaths = [
    routes.auth.signIn,
    routes.auth.signUp,
    routes.auth.forgotPassword
  ];

  // Allow public routes and static assets
  if (matchesRoute(pathname, publicPaths)) {
    return NextResponse.next();
  }

  // Get auth data from cookies
  const authToken = request.cookies.get('auth-token');
  const userRole = request.cookies.get('user-role')?.value as 'student' | 'instructor' | undefined;

  // Handle auth routes
  if (matchesRoute(pathname, authPaths)) {
    if (authToken && userRole) {
      // Redirect authenticated users to their dashboard
      const dashboardRoute = userRole === 'instructor' 
        ? routes.instructor.dashboard 
        : routes.student.dashboard;
      return NextResponse.redirect(new URL(dashboardRoute, request.url));
    }
    return NextResponse.next();
  }

  // If no auth token, redirect to sign in
  if (!authToken) {
    const signInUrl = new URL(routes.auth.signIn, request.url);
    signInUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Role-based access control
  const isInstructorPath = pathname.startsWith('/instructor');
  const isStudentPath = pathname.startsWith('/student');

  if (isInstructorPath && userRole !== 'instructor') {
    return NextResponse.redirect(new URL(routes.student.dashboard, request.url));
  }

  if (isStudentPath && userRole !== 'student') {
    return NextResponse.redirect(new URL(routes.instructor.dashboard, request.url));
  }

  return NextResponse.next();
}

// Configure paths that need middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};