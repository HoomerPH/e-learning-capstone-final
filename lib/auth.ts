interface User {
  id: string;
  email: string;
  user_metadata?: {
    role?: 'instructor' | 'student';
    name?: string;
  };
}

interface AuthResponse {
  data: {
    user: User | null;
  } | null;
  error: Error | null;
}

// Demo users for testing
const DEMO_USERS = {
  instructor: {
    id: '1',
    email: 'instructor@example.com',
    password: 'password123',
    user_metadata: {
      role: 'instructor',
      name: 'John Instructor'
    }
  },
  student: {
    id: '2',
    email: 'student@example.com',
    password: 'student@example123',
    user_metadata: {
      role: 'student',
      name: 'Jane Student'
    }
  }
};

// Helper to set secure cookies with proper attributes
function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=2592000; samesite=lax`; // 30 days expiry
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check for demo instructor
  if (email === DEMO_USERS.instructor.email && password === DEMO_USERS.instructor.password) {
    const user = DEMO_USERS.instructor;
    setCookie('auth-token', user.id);
    setCookie('user-role', 'instructor');
    setCookie('user-email', user.email);
    setCookie('user-name', user.user_metadata.name);
    
    return {
      data: { user },
      error: null
    };
  }

  // Check for demo student
  if (email === DEMO_USERS.student.email && password === DEMO_USERS.student.password) {
    const user = DEMO_USERS.student;
    setCookie('auth-token', user.id);
    setCookie('user-role', 'student');
    setCookie('user-email', user.email);
    setCookie('user-name', user.user_metadata.name);
    
    return {
      data: { user },
      error: null
    };
  }

  return {
    data: null,
    error: new Error('Invalid credentials')
  };
}

export async function signOut(): Promise<{ error: Error | null }> {
  const cookies = ['auth-token', 'user-role', 'user-email', 'user-name'];
  cookies.forEach(cookie => {
    document.cookie = `${cookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  });
  
  return { error: null };
}

export async function getCurrentUser(): Promise<User | null> {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string });

  if (!cookies['auth-token']) return null;

  // Reconstruct user from cookies
  return {
    id: cookies['auth-token'],
    email: cookies['user-email'],
    user_metadata: {
      role: cookies['user-role'] as 'instructor' | 'student',
      name: cookies['user-name']
    }
  };
}