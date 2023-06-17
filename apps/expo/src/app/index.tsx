import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Button, Text, View } from "native-base";

import { useProtectedRoute } from "~/hooks/useProtectedRoute";
import { supabase } from "~/lib/supabase";

const Index = () => {
  useProtectedRoute();

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
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

        <Button onPress={() => void signOut()}>Sign Out</Button>
      </View>
    </SafeAreaView>
  );
};

export default Index;
