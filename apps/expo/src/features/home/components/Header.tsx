import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Heading, HStack, Stack, Text, View } from "native-base";

import { useStore } from "~/stores";

export const Header = () => {
  const { user } = useStore();

  const { top } = useSafeAreaInsets();

  return (
    <View bg="primary.50" pt={top + 5} px="4" pb="2">
      <HStack mb="4">
        <Avatar />
        <Stack ml="4" justifyContent="center">
          <Heading fontWeight="semibold" size="md">
            👋 Hi, {user?.email}
          </Heading>
          <Text>Let&apos;s spread more kindness today</Text>
        </Stack>
      </HStack>
    </View>
  );
};
