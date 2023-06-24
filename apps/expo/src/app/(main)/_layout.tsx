import { Stack, Tabs } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Icon, useToken } from "native-base";

const MainLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [primary]: string[] = useToken("colors", ["primary.600"]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [headingFontFamily]: string[] = useToken("fonts", ["heading"]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: primary,
            fontFamily: `${headingFontFamily}_600SemiBold`,
          },
          headerTitleAlign: "center",
        }}
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: "/",
            tabBarIcon: ({ focused }) => (
              <Icon
                size="xl"
                as={Ionicons}
                name="home"
                color={focused ? primary : "gray.500"}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="donations"
          options={{
            href: "/donations",
            tabBarIcon: ({ focused }) => (
              <Icon
                size="xl"
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                as={FontAwesome5}
                name="hand-holding-heart"
                color={focused ? primary : "gray.500"}
              />
            ),
            tabBarLabel: () => null,
            headerTitle: "My Donations",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: "/profile",
            tabBarIcon: ({ focused }) => (
              <Icon
                size="xl"
                as={Ionicons}
                name="person"
                color={focused ? primary : "gray.500"}
              />
            ),
            tabBarLabel: () => null,
            headerTitle: "My Profile",
          }}
        />
      </Tabs>
    </>
  );
};

export default MainLayout;
