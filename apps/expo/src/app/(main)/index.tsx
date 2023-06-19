import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Box, FlatList, StatusBar } from "native-base";

import {
  CampaignCard,
  Header,
  TotalDonationWidget,
} from "~/features/home/components";

const Index = () => {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Home Page", headerShown: false }} />
      <StatusBar />
      <Header />
      <FlatList
        data={[1, 1, 1, 1, 1]}
        ListHeaderComponent={
          <Box mb="5">
            <TotalDonationWidget />
          </Box>
        }
        renderItem={() => (
          <Box px="4">
            <CampaignCard />
          </Box>
        )}
      />
    </SafeAreaView>
  );
};

export default Index;
