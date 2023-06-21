import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  SplashScreen as ExpoRouterSplashScreen,
  Slot,
  useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { TRPCProvider } from "~/utils/api";
import { useHydration } from "~/hooks/useHydration";
import { theme } from "~/theme";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const { isLoading, authenticated } = useHydration();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authenticated) {
      router.replace("login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, authenticated]);

  if (isLoading) {
    return <ExpoRouterSplashScreen />;
  }

  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          {/*
          The Slot component displays the current page.
          It also allows you to configure your screens 
        */}
          <StatusBar />
          {!isLoading && (
            <Slot initialRouteName={authenticated ? "index" : "login"} />
          )}
        </NativeBaseProvider>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
