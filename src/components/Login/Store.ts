import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  currentUser: { email: string } | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  currentUser: null,

  signIn: (email, password) => {
    set({ isAuthenticated: true, currentUser: { email } });
  },

  signOut: () => {
    set({ isAuthenticated: false, currentUser: null });
  },
}));
