import React, { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "student" | "admin" | "supervisor" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  program?: string;
  studentId?: string;
}

interface UserContextType {
  user: User | null;
  login: (id: string, password: string) => Promise<void>;
  autoLogin: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (id: string, password: string) => {
    // Simulate login - in real app, this would be an API call
    const mockUsers: Record<string, User> = {
      student: {
        id: "GS12345",
        name: "Ahmad Syafiq Bin Abdullah",
        email: "ahmad@student.upm.edu.my",
        role: "student",
        avatar: "AS",
        program: "PhD Computer Science",
        studentId: "GS12345",
      },
      admin: {
        id: "ADM001",
        name: "Sarah Ahmad",
        email: "sarah@upm.edu.my",
        role: "admin",
        avatar: "SA",
      },
      supervisor: {
        id: "SUP001",
        name: "Dr. Sarah",
        email: "dr.sarah@upm.edu.my",
        role: "supervisor",
        avatar: "DS",
      },
    };

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = mockUsers[id.toLowerCase()] || mockUsers["student"];
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  // Auto-login for demo purposes - directly set user by role
  const autoLogin = (role: UserRole) => {
    const mockUsers: Record<string, User> = {
      student: {
        id: "GS12345",
        name: "Ahmad Syafiq Bin Abdullah",
        email: "ahmad@student.upm.edu.my",
        role: "student",
        avatar: "AS",
        program: "PhD Computer Science",
        studentId: "GS12345",
      },
      admin: {
        id: "ADM001",
        name: "Sarah Ahmad",
        email: "sarah@upm.edu.my",
        role: "admin",
        avatar: "SA",
      },
      supervisor: {
        id: "SUP001",
        name: "Dr. Sarah",
        email: "dr.sarah@upm.edu.my",
        role: "supervisor",
        avatar: "DS",
      },
    };

    if (role && mockUsers[role]) {
      setUser(mockUsers[role]);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        autoLogin,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
