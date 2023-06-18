import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useNavigation } from "expo-router";
import { Button, Text, View } from "native-base";

import { supabase } from "~/lib/supabase";
import { useStore } from "~/stores";

const Index = () => {
  const { user, onLogout } = useStore();
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      onLogout();
      navigation.dispatch({ type: "POP_TO_TOP" });
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
