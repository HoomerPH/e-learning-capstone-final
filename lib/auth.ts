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
  if (typeof document !== 'undefined') {
    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
    console.log(`Setting cookie: ${name}=${value}`); // Debug log
  }
}

// Helper to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift() || null;
    console.log(`Getting cookie ${name}:`, cookieValue); // Debug log
    return cookieValue;
  }
  console.log(`Cookie ${name} not found`); // Debug log
  return null;
}

// Helper to generate a unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
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
      console.log('Found user:', user); // Debug log
      
      // Set cookies one by one
      setCookie('auth-token', user.id);
      setCookie('user-role', user.user_metadata.role || '');
      setCookie('user-email', user.email);
      setCookie('user-name', user.user_metadata.name || '');

      // Verify cookies were set
      console.log('Cookies after setting:', {
        authToken: getCookie('auth-token'),
        userRole: getCookie('user-role'),
        userEmail: getCookie('user-email'),
        userName: getCookie('user-name')
      });
      
      return {
        data: { user },
        error: null
      };
    } else {
      console.log('No user found for:', email); // Debug log
      return {
        data: null,
        error: new Error('Invalid credentials')
      };
    }
  } catch (error) {
    console.error('Sign in error:', error); // Debug log
    return {
      data: null,
      error: error instanceof Error ? error : new Error('An error occurred')
    };
  }
}

export async function signUp(email: string, password: string, role: 'instructor' | 'student', name: string): Promise<AuthResponse> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already exists
    const existingUser = Object.values(DEMO_USERS).find(u => u.email === email);
    if (existingUser) {
      return {
        data: null,
        error: new Error('Email already exists')
      };
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      email,
      user_metadata: {
        role,
        name
      }
    };

    // In a real implementation, you would:
    // 1. Hash the password
    // 2. Store user in database
    // 3. Send verification email

    // For demo, just set cookies and return user
    setCookie('auth-token', newUser.id);
    setCookie('user-role', role);
    setCookie('user-email', email);
    setCookie('user-name', name);

    return {
      data: { user: newUser },
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('An error occurred during sign up')
    };
  }
}

export async function signOut(): Promise<{ error: Error | null }> {
  try {
    const cookies = ['auth-token', 'user-role', 'user-email', 'user-name'];
    cookies.forEach(cookie => {
      if (typeof document !== 'undefined') {
        document.cookie = `${cookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      }
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

    const userRole = getCookie('user-role');
    const email = getCookie('user-email');
    const userName = getCookie('user-name');

    // If we have an auth token but no email, something is wrong with the session
    if (!email) {
      return null;
    }

    // Only validate role if it exists
    if (userRole && !['instructor', 'student'].includes(userRole)) {
      console.warn('Invalid user role found:', userRole);
      return null;
    }

    return {
      id: authToken,
      email,
      user_metadata: {
        role: userRole as 'instructor' | 'student' | undefined,
        name: userName || undefined
      }
    };
  } catch (error) {
    console.error('Error getting current user:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}