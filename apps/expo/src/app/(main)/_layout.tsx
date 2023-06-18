import { Tabs } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Icon, useToken } from "native-base";

const MainLayout = () => {
  const [primary]: string[] = useToken("colors", ["primary.600"]);

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: primary,
        },
        headerTitleStyle: {
          color: "white",
        },
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
  );
};

export default MainLayout;
