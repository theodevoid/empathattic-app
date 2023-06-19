import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button, Heading } from "native-base";

import { supabase } from "~/lib/supabase";
import { useStore } from "~/stores";

const ProfileScreen = () => {
  const { onLogout } = useStore();
  const router = useRouter();

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
    <SafeAreaView>
      <Heading>Profile Screen</Heading>
      <Button onPress={() => void signOut()}>Sign Out</Button>
    </SafeAreaView>
  );
};

export default ProfileScreen;
