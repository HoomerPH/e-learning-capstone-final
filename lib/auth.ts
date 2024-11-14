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
  const secure = process.env.NODE_ENV === 'production' ? '; secure' : '';
  document.cookie = `${name}=${value}; path=/; max-age=2592000; samesite=lax${secure}`;
}

// Helper to get cookie value
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check for demo users
    const user = Object.values(DEMO_USERS).find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Set auth cookies
      setCookie('auth-token', user.id);
      setCookie('user-role', user.user_metadata.role);
      setCookie('user-email', user.email);
      setCookie('user-name', user.user_metadata.name);
      
      return {
        data: { user },
        error: null
      };
    } else {
      return {
        data: null,
        error: new Error('Invalid credentials')
      };
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('An error occurred')
    };
  }
}

export async function signOut(): Promise<{ error: Error | null }> {
  try {
    const cookies = ['auth-token', 'user-role', 'user-email', 'user-name'];
    cookies.forEach(cookie => {
      document.cookie = `${cookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    });
    return { error: null };
  } catch (error) {
    return { error: error instanceof Error ? error : new Error('An error occurred') };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const authToken = getCookie('auth-token');
    if (!authToken) return null;

    // Reconstruct user from cookies
    return {
      id: authToken,
      email: getCookie('user-email') || '',
      user_metadata: {
        role: getCookie('user-role') as 'instructor' | 'student',
        name: getCookie('user-name') || ''
      }
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}