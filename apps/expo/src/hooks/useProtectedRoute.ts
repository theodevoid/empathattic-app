import { useEffect } from "react";
import { useRouter } from "expo-router";

import { useSession } from "./useSession";

export const useProtectedRoute = () => {
  const router = useRouter();

  const { user, isLoading } = useSession();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
    } else if (user) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);
};
