import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Button, Text, View } from "native-base";

import { api } from "~/utils/api";
import { supabase } from "~/lib/supabase";
import { useStore } from "~/stores";

const Index = () => {
  const { user, onLogout } = useStore();
  const router = useRouter();

  const { data } = api.post.all.useQuery();

  console.log(data);

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
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View>
        <Text>
          Create <Text>T3</Text> T3
        </Text>
        <Text>
          Create <Text>T3</Text> T3
        </Text>
        <Text>{user?.email}</Text>

        <Button onPress={() => void signOut()}>Sign Out</Button>
      </View>
    </SafeAreaView>
  );
};

export default Index;
