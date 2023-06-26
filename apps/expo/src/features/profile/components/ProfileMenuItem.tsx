import { Divider, HStack, Icon, Pressable, Text } from "native-base";

interface ProfileMenuItemProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconPack: any;
  iconName: string;
  onPress: () => void;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  label,
  iconName,
  iconPack,
  onPress,
}) => {
  return (
    <>
      <Divider />
      <Pressable onPress={onPress} _pressed={{ opacity: 0.6 }}>
        <HStack py="6" alignItems="center">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Icon as={iconPack} name={iconName} size="xl" mr="4" />
          <Text fontSize="md">{label}</Text>
        </HStack>
      </Pressable>
    </>
  );
};
