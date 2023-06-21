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

import { api } from "~/utils/api";
import {
  CampaignCard,
  Header,
  TotalDonationWidget,
} from "~/features/home/components";
import { LatestCampaignsSection } from "~/features/home/components/LatestCampaignsSection";

const Index = () => {
  const { data: campaigns } = api.campaign.getCampaigns.useQuery({});

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
          {!!campaigns && (
            <FlatList
              data={campaigns}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ index, item }) => (
                <Box ml={index === 0 ? "4" : "2"} my="1">
                  <CampaignCard campaign={item} />
                </Box>
              )}
            />
          )}
        </Box>

        <LatestCampaignsSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
