import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Image,
  Stack as NBStack,
  Pressable,
  Progress,
  ScrollView,
  Text,
} from "native-base";

import { api } from "~/utils/api";
import { toRupiah } from "~/utils/format";
import { DetailSection } from "~/features/campaign";

type CampaignDetailScreenParams = {
  campaignId: string;
};

const { width } = Dimensions.get("window");

const CampaignDetailScreen = () => {
  const { campaignId } = useLocalSearchParams<CampaignDetailScreenParams>();

  const { data: campaign } = api.campaign.getCampaignById.useQuery({
    id: campaignId as string,
  });

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{ title: "Campaign Detail", headerShown: false }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <FlatList
          // h={400}
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
                campaign?.currentFunding || 0 / (campaign?.targetFunding || 0)
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

          <DetailSection title="About Campaign">
            <Text numberOfLines={3}>{campaign?.description}</Text>
            <Pressable _pressed={{ opacity: 0.6 }} mt="0.5">
              <Text fontWeight="semibold">See more</Text>
            </Pressable>
          </DetailSection>
          <DetailSection title="Donators">
            <HStack justifyContent="space-between">
              <Avatar.Group flexDirection="row" mx="4">
                <Avatar>TM</Avatar>
                <Avatar>AB</Avatar>
                <Avatar>CD</Avatar>
                <Avatar>EF</Avatar>
              </Avatar.Group>
              <Button variant="ghost">View all</Button>
            </HStack>
          </DetailSection>
          <DetailSection title="Funds Disbursement Report"></DetailSection>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CampaignDetailScreen;
