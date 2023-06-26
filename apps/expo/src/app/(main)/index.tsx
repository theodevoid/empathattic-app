import React from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Box, FlatList, Heading, ScrollView, StatusBar } from "native-base";

import { api } from "~/utils/api";
import {
  CampaignCard,
  Header,
  TotalDonationWidget,
} from "~/features/home/components";
import { LatestCampaignsSection } from "~/features/home/components/LatestCampaignsSection";

const HomeScreen = () => {
  const { data: campaigns } = api.campaign.getCampaigns.useQuery(
    {},
    { refetchOnWindowFocus: true },
  );

  const router = useRouter();

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
        <Box mb="5">{/* <TotalDonationWidget /> */}</Box>

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
                  <CampaignCard
                    onDonatePress={() =>
                      router.push({
                        pathname: "/campaign/detail",
                        params: {
                          campaignId: item.id,
                        },
                      })
                    }
                    campaign={item}
                  />
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

export default HomeScreen;
