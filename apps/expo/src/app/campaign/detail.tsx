import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { Heading } from "native-base";

import { api } from "~/utils/api";

type CampaignDetailScreenParams = {
  campaignId: string;
};

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

      <Heading>{campaign?.title}</Heading>
    </SafeAreaView>
  );
};

export default CampaignDetailScreen;
