import { extendTheme } from "native-base";

export const theme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: "Inter_100Thin",
      },
      200: {
        normal: "Inter_200ExtraLight",
      },
      300: {
        normal: "Inter_300Light",
      },
      400: {
        normal: "Inter_400Regular",
      },
      500: {
        normal: "Inter_500Medium",
      },
      600: {
        normal: "Inter_600SemiBold",
      },
      // Add more variants
      700: {
        normal: "Inter_700Bold",
      },
      800: {
        normal: "Inter_800ExtraBold",
      },
      900: {
        normal: "Inter_900Black",
      },
    },
    Barlow: {
      100: {
        normal: "Barlow_100Thin",
      },
      200: {
        normal: "Barlow_200ExtraLight",
      },
      300: {
        normal: "Barlow_300Light",
      },
      400: {
        normal: "Barlow_400Regular",
      },
      500: {
        normal: "Barlow_500Medium",
      },
      600: {
        normal: "Barlow_600SemiBold",
      },
      // Add more variants
      700: {
        normal: "Barlow_700Bold",
      },
      800: {
        normal: "Barlow_800ExtraBold",
      },
      900: {
        normal: "Barlow_900Black",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Barlow",
    body: "Inter",
    mono: "Inter",
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "heading",
      },
    },
  },
});
