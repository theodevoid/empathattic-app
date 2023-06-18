import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Button, HStack } from "native-base";

// WIP
export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  return (
    <SafeAreaView edges={["bottom"]}>
      <HStack w="80%">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name);
            }
          };

          return (
            <Button key={route.key} onPress={onPress}>
              Home
            </Button>
          );
        })}
      </HStack>
    </SafeAreaView>
  );
};
