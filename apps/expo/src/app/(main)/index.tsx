import React from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  ScrollView,
  StatusBar,
} from "native-base";

import {
  CampaignCard,
  Header,
  TotalDonationWidget,
} from "~/features/home/components";

const Index = () => {
  return (
    <SafeAreaView edges={["bottom"]}>
      <Stack.Screen options={{ title: "Home Page", headerShown: false }} />
      <StatusBar />
      <Header />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 100 : 150,
        }}
      >
        <Box mb="5">
          <TotalDonationWidget />
        </Box>

        <Box mb="6">
          <Heading mx="4" size="md" mb="2">
            Explore Campaigns
          </Heading>
          <FlatList
            data={[1, 1, 1, 1, 1]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ index }) => (
              <Box ml={index === 0 ? "4" : "2"} my="1">
                <CampaignCard />
              </Box>
            )}
          />
        </Box>

        <Box px="4">
          <HStack justifyContent="space-between" alignItems="center" mb="2">
            <Heading size="md">Newest Campaigns</Heading>

            <Button variant="ghost">View All</Button>
          </HStack>
          <CampaignCard fullWidth />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
