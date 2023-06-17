import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen as ExpoRouterSplashScreen, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
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
import { NativeBaseProvider } from "native-base";

import { TRPCProvider } from "~/utils/api";
import { theme } from "~/theme";

void SplashScreen.preventAutoHideAsync();

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
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

  if (!fontsLoaded) {
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
