// src/stores/useAuthStore.ts
import { create } from 'zustand';

interface Credentials {
  name: string;
  email: string;
  password: string;
}

interface AuthStore {
  credentials: Credentials[];
  isAuthenticated: boolean;
  currentUser: Credentials | null;
  addCredential: (name: string, email: string, password: string) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  clearCredentials: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  credentials: JSON.parse(localStorage.getItem('credentials') || '[]'),
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated') || 'false'),
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),

  addCredential: (name, email, password) => {
    const existingCredentials = get().credentials;
    const isEmailExists = existingCredentials.some((cred) => cred.email === email);

    if (isEmailExists) {
      alert('Email is already registered.');
      return;
    }

    const updatedCredentials = [...existingCredentials, { name, email, password }];
    localStorage.setItem('credentials', JSON.stringify(updatedCredentials));
    set({ credentials: updatedCredentials });
  },

  signIn: (email, password) => {
    const user = get().credentials.find(
      (cred) => cred.email === email && cred.password === password
    );
    if (user) {
      set({ isAuthenticated: true, currentUser: user });
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  },

  signOut: () => {
    set({ isAuthenticated: false, currentUser: null });
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('currentUser');
  },

  clearCredentials: () => {
    localStorage.removeItem('credentials');
    set({ credentials: [] });
  },
}));
