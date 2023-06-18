import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen as ExpoRouterSplashScreen, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { TRPCProvider } from "~/utils/api";
import { useHydration } from "~/hooks/useHydration";
import { theme } from "~/theme";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const { isLoading } = useHydration();

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
          <Slot />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
