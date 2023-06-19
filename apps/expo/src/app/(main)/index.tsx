import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Heading, Text, View } from "native-base";

import { useStore } from "~/stores";

const Index = () => {
  const { user } = useStore();

  return (
    <SafeAreaView>
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View>
        <Heading>Create T3 App</Heading>
        <Text>
          Create <Text>T3</Text> T3
        </Text>
        <Text>
          Create <Text>T3</Text> T3
        </Text>
        <Text>{user?.email}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
