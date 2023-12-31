import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "EmpathAttic",
  slug: "empathattic",
  owner: "theodevoid",
  description: "Personal crowdfunding application",
  scheme: "empathattic",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#011357",
  },
  updates: {
    url: "https://u.expo.dev/53c6b0e7-66db-42bc-a385-a42b4f178190",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.empathattic",
    buildNumber: "3",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#011357",
    },
    package: "com.empathattic.app",
  },
  extra: {
    eas: {
      projectId: "53c6b0e7-66db-42bc-a385-a42b4f178190",
    },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
  privacy: "public",
});

export default defineConfig;
