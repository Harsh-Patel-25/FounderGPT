import { useState, useEffect, useContext, createContext, ReactNode } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User, token: string, rememberMe: boolean) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Helper to get auth data from whichever storage it lives in.
 * "Remember Me" = localStorage, otherwise sessionStorage.
 */
const getStoredAuth = () => {
  // Check localStorage first (Remember Me was checked)
  const lsToken = localStorage.getItem("authToken");
  const lsUser = localStorage.getItem("currentUser");
  if (lsToken && lsUser) {
    return { token: lsToken, userJson: lsUser, storage: "local" as const };
  }

  // Fall back to sessionStorage (Remember Me was NOT checked)
  const ssToken = sessionStorage.getItem("authToken");
  const ssUser = sessionStorage.getItem("currentUser");
  if (ssToken && ssUser) {
    return { token: ssToken, userJson: ssUser, storage: "session" as const };
  }

  return null;
};

/**
 * Clear auth data from both storages
 */
const clearAllAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("rememberMe");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("currentUser");
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from whichever storage has data
    const stored = getStoredAuth();
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored.userJson);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        clearAllAuth();
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newUser: User, token: string, rememberMe: boolean) => {
    setUser(newUser);

    // Clear any stale data from both storages first
    clearAllAuth();

    if (rememberMe) {
      // Persist across browser sessions
      localStorage.setItem("authToken", token);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      localStorage.setItem("rememberMe", "true");
    } else {
      // Only persist for this browser session (cleared on close)
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("currentUser", JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setUser(null);
    clearAllAuth();
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    
    // Update whichever storage is currently active
    if (localStorage.getItem("authToken")) {
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    } else if (sessionStorage.getItem("authToken")) {
      sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
