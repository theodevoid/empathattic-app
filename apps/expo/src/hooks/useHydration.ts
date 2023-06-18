import { useEffect, useState } from "react";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";

import { supabase } from "~/lib/supabase";
import { useStore } from "~/stores";

export const useHydration = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialRoute, setInitialRoute] = useState<string>("/login");

  const { onLoginSuccess } = useStore();

  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session: supabaseSession } }) => {
        if (supabaseSession) {
          onLoginSuccess(supabaseSession.user);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    supabase.auth.onAuthStateChange((_event, supabaseSession) => {
      if (supabaseSession) {
        onLoginSuccess(supabaseSession.user);
      }

      setIsLoading(false);
    });
  }, []);

  return {
    isLoading: isLoading && !fontsLoaded,
  };
};
