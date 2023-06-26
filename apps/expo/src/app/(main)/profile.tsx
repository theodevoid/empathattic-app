import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Heading,
  HStack,
  Stack as NBStack,
  ScrollView,
} from "native-base";

import { api } from "~/utils/api";
import { ProfileMenuItem } from "~/features/profile/components";
import { supabase } from "~/lib/supabase";
import { useStore } from "~/stores";

const ProfileScreen = () => {
  const { onLogout, user } = useStore();
  const router = useRouter();

  const { data } = api.user.getUser.useQuery();

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      onLogout();
      router.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView p="4">
      <HStack justifyContent="space-between" py="4">
        <NBStack space="1">
          <Heading size="md">{data?.fullName || "(No name)"}</Heading>
          <Heading size="sm">{user?.email}</Heading>
        </NBStack>
        <Button variant="ghost">Edit Profile</Button>
      </HStack>

      <NBStack>
        <ProfileMenuItem
          onPress={() => router.push("/profile-settings/change-password")}
          label="Change Password"
          iconName="lock-closed-outline"
          iconPack={Ionicons}
        />
      </NBStack>

      <Button
        mt="4"
        colorScheme="red"
        variant="subtle"
        onPress={() => void signOut()}
      >
        Sign Out
      </Button>
    </ScrollView>
  );
};

export default ProfileScreen;
