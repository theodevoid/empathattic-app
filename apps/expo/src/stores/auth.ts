import { User } from "@supabase/supabase-js";
import { StateCreator } from "zustand";

export type AuthSlice = {
  user: User | null;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
) => ({
  user: null,
  onLoginSuccess: (payload) => {
    set(() => ({ user: payload }));
  },
  onLogout: () => {
    set(() => ({ user: null }));
  },
});
