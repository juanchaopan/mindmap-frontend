"use client";

import { create } from "zustand";
import { signIn, signOut } from "next-auth/react";

interface AuthStore {
  // Login form state
  username: string;
  password: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  clearError: () => void;
  login: (callbackUrl: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  username: "",
  password: "",
  isLoading: false,
  error: null,

  setUsername: (username) => set({ username, error: null }),
  setPassword: (password) => set({ password, error: null }),
  clearError: () => set({ error: null }),

  login: async (callbackUrl) => {
    const { username, password } = get();
    set({ isLoading: true, error: null });

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      set({ isLoading: false, error: "Invalid username or password." });
      return false;
    }

    set({ isLoading: false, username: "", password: "" });
    return true;
  },

  logout: async () => {
    set({ isLoading: true });
    await signOut({ redirect: false });
    set({ isLoading: false });
  },
}));
