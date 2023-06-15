import React from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

import { api } from "~/utils/api";
import { supabase } from "~/lib/supabase";

const Index = () => {
  const { data } = api.post.all.useQuery();

  console.log(data);

  const googleSignIn = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    console.log(res);
  };

  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View>
        <Text>
          Create <Text>T3</Text> Turbo
        </Text>
      </View>

      <TouchableOpacity onPress={() => void googleSignIn()}>
        <Text>Press Here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
