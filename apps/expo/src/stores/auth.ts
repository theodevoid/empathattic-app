import { User } from "@supabase/supabase-js";
import { StateCreator } from "zustand";

export type AuthSlice = {
  user: User | null;
  jwt: string | null;
  onLoginSuccess: ({ user, jwt }: { user: User; jwt: string }) => void;
  onLogout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
) => ({
  user: null,
  jwt: null,
  onLoginSuccess: ({ jwt, user }) => {
    set(() => ({ user, jwt }));
  },
  onLogout: () => {
    set(() => ({ user: null }));
  },
});
