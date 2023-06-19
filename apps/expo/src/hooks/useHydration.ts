import { useEffect, useState } from "react";
import {
  Barlow_100Thin,
  Barlow_200ExtraLight,
  Barlow_300Light,
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold,
  Barlow_800ExtraBold,
  Barlow_900Black,
} from "@expo-google-fonts/barlow";
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

  const { onLoginSuccess, onLogout } = useStore();

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
    Barlow_100Thin,
    Barlow_200ExtraLight,
    Barlow_300Light,
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    Barlow_700Bold,
    Barlow_800ExtraBold,
    Barlow_900Black,
  });

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session: supabaseSession } }) => {
        if (supabaseSession) {
          onLoginSuccess({
            user: supabaseSession.user,
            jwt: supabaseSession.access_token,
          });
        } else {
          onLogout();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    supabase.auth.onAuthStateChange((_event, supabaseSession) => {
      if (supabaseSession) {
        onLoginSuccess({
          user: supabaseSession.user,
          jwt: supabaseSession.access_token,
        });
      } else {
        onLogout();
      }

      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading: !fontsLoaded || isLoading,
  };
};
