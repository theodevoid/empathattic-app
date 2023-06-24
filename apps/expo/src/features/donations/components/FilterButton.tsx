import React, { PropsWithChildren } from "react";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, Pressable, Text } from "native-base";

interface FilterButtonProps extends PropsWithChildren {
  onPress: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  onPress,
}) => {
  return (
    <Pressable
      py="1"
      px="2"
      borderColor="gray.500"
      rounded="lg"
      borderWidth={1}
      _pressed={{ opacity: 0.6 }}
      onPress={onPress}
    >
      <HStack alignItems="center" space="1">
        <Text>{children}</Text>
        <Icon mt={0.5} as={Ionicons} name="chevron-down" />
      </HStack>
    </Pressable>
  );
};
