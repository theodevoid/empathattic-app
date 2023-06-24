import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { HStack, Icon, Pressable } from "native-base";

export const Header: React.FC<NativeStackHeaderProps> = ({ navigation }) => {
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "white" }}>
      <HStack position="relative" px="1" py="2" bg="white">
        <Pressable
          _pressed={{ opacity: 0.6 }}
          onPress={() => navigation.goBack()}
        >
          <Icon
            color="primary.500"
            size="2xl"
            as={Ionicons}
            name="chevron-back"
          />
        </Pressable>
      </HStack>
    </SafeAreaView>
  );
};
