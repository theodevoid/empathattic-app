import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AuthSlice, createAuthSlice } from "./auth";

const STORAGE_KEY = "empathattic-app-storage";

export type GlobalStore = AuthSlice;

// export const useStore = create<
//   GlobalStore,
//   [["zustand/persist", Pick<GlobalStore, "user">]]
// >(
//   persist(
//     (...a) => ({
//       ...createAuthSlice(...a),
//     }),
//     {
//       name: STORAGE_KEY,
//       partialize: (state) => ({
//         user: state.user,
//       }),
//       storage: createJSONStorage(() => AsyncStorage),
//     },
//   ),
// );

export const useStore = create<GlobalStore>((...actions) => ({
  ...createAuthSlice(...actions),
}));
