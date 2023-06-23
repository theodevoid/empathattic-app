import { Box, Button, Heading, HStack, Text } from "native-base";

import { api } from "~/utils/api";
import { CampaignCard } from "./CampaignCard";

export const LatestCampaignsSection = () => {
  const { data: campaigns } = api.campaign.getCampaigns.useQuery({
    sort: "newest",
  });

  const renderCampaignCards = () => {
    if (campaigns) {
      return campaigns.map((campaign) => {
        return (
          <Box my="1" key={campaign.id}>
            <CampaignCard fullWidth campaign={campaign} />
          </Box>
        );
      });
    }

    return <Text>No campaigns yet</Text>;
  };

  return (
    <Box px="4">
      <HStack justifyContent="space-between" alignItems="center" mb="2">
        <Heading size="md">Latest Campaigns</Heading>

        <Button variant="ghost">View All</Button>
      </HStack>
      {renderCampaignCards()}
    </Box>
  );
};
