import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  hasHydrated: boolean;
  isAuthenticated: boolean;
  setAuth: (payload: { user: User; token: string }) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

const STORAGE_KEY = 'expensify_auth';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  hasHydrated: false,
  isAuthenticated: false,

  setAuth: async ({ user, token }) => {
    set({ user, token, isAuthenticated: true });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
  },

  logout: async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  },

  hydrate: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { user: User; token: string };
        set({
          user: parsed.user,
          token: parsed.token,
          isAuthenticated: true,
          hasHydrated: true
        });
      } else {
        set({ hasHydrated: true });
      }
    } catch {
      set({ hasHydrated: true });
    }
  }
}));

