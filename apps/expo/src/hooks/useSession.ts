/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { type Session } from "@supabase/supabase-js";

import { supabase } from "~/lib/supabase";

export const useSession = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session: supabaseSession } }) => {
        setSession(supabaseSession);
      })
      .finally(() => {
        setIsLoading(false);
      });

    supabase.auth.onAuthStateChange((_event, supabaseSession) => {
      setSession(supabaseSession);
      setIsLoading(false);
    });
  }, []);

  return {
    ...session,
    isLoading,
  };
};
