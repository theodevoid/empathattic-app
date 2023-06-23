import { useRef } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  AspectRatio,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Image,
  Stack as NBStack,
  Progress,
  ScrollView,
  Text,
  View,
} from "native-base";

import { api } from "~/utils/api";
import { toRupiah } from "~/utils/format";
import {
  AboutSection,
  DonateBottomSheet,
  DonatorsSection,
} from "~/features/campaign";

type CampaignDetailScreenParams = {
  campaignId: string;
};

const { width } = Dimensions.get("window");

const CampaignDetailScreen = () => {
  const { campaignId } = useLocalSearchParams<CampaignDetailScreenParams>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data: campaign } = api.campaign.getCampaignById.useQuery({
    id: campaignId as string,
  });

  return (
    <SafeAreaView>
      <View h="100%">
        <Stack.Screen
          options={{ title: "Campaign Detail", headerShown: false }}
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          style={{ flex: 1 }}
        >
          <FlatList
            snapToAlignment="center"
            snapToOffsets={[width]}
            horizontal
            data={campaign?.images}
            renderItem={({ item: image, index }) => {
              return (
                <AspectRatio w={width} key={index} ratio={16 / 9}>
                  <Image source={{ uri: image }} alt={campaign?.slug} />
                </AspectRatio>
              );
            }}
          />
          <Box px="4" mt="2">
            <NBStack space="2">
              <Heading>{campaign?.title}</Heading>
              <Text color="gray.500">31 Days left</Text>
              <Progress
                size="lg"
                value={
                  campaign?.currentFunding ||
                  (0 / (campaign?.targetFunding || 0)) * 100
                }
              />
              <HStack justifyContent="space-between">
                <NBStack alignItems="flex-start">
                  <Text>Current funding</Text>
                  <Text fontSize="md" fontWeight="semibold" color="primary.500">
                    {toRupiah(campaign?.currentFunding || 0)}
                  </Text>
                </NBStack>
                {!!campaign?.targetFunding && (
                  <NBStack alignItems="flex-end">
                    <Text>Target funding</Text>
                    <Text fontSize="md" fontWeight="semibold" color="gray.500">
                      {toRupiah(100_000_000)}
                    </Text>
                  </NBStack>
                )}
              </HStack>
            </NBStack>

            <AboutSection description={campaign?.description || ""} />

            <DonatorsSection
              numberOfDonators={5}
              initials={["TM", "AB", "CD"]}
              campaignId={campaign?.id || ""}
            />
          </Box>
        </ScrollView>

        <Box p="4">
          <Button onPress={() => bottomSheetRef.current?.expand()}>
            Support this campaign
          </Button>
        </Box>
        <DonateBottomSheet
          bottomSheetRef={bottomSheetRef}
          campaignId={campaign?.id || ""}
        />
      </View>
    </SafeAreaView>
  );
};

export default CampaignDetailScreen;
