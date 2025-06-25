"use client";

import { userService } from "@/services/userService";
import { User } from "@/types/user";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      const token = userService.getToken();
      if (token) {
        await login();
      } else {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const response = await userService.login();
      setUser(response.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
