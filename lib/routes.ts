// Centralized route configuration
export const routes = {
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    forgotPassword: '/auth/forgot-password',
  },
  student: {
    dashboard: '/student',
    courses: '/student/courses',
    settings: '/student/settings',
  },
  instructor: {
    dashboard: '/instructor',
    courses: '/instructor/courses',
    students: '/instructor/students',
    analytics: '/instructor/analytics',
    settings: '/instructor/settings',
  },
  public: {
    home: '/',
    courses: '/courses',
  }
} as const;