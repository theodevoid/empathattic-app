import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Progress,
  Stack,
  Text,
} from "native-base";

import { Campaign } from "@empathattic/db/schemas";

import { toPercentage, toRupiah } from "~/utils/format";

interface CampaignCardProps {
  fullWidth?: boolean;
  campaign: Campaign;
  onDonatePress: () => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  fullWidth = false,
  campaign,
  onDonatePress,
}) => {
  const { title, currentFunding, targetFunding, images } = campaign;

  return (
    <Box
      shadow="1"
      bg="white"
      borderRadius="xl"
      width={fullWidth ? "100%" : 240}
    >
      <AspectRatio ratio={fullWidth ? 16 / 9 : 5 / 4} width="100%">
        <Image
          source={{
            uri: images[0],
          }}
          alt="campaign"
          borderTopRightRadius="xl"
          borderTopLeftRadius="xl"
        />
      </AspectRatio>
      <Box p="2" pb="4">
        <Stack space="2" mt="2">
          <Heading size="sm">{title}</Heading>
          <Stack space="1">
            <Progress value={(currentFunding || 0) / (targetFunding || 0)} />
            <HStack justifyContent="space-between">
              <Text fontWeight="bold" color="green.700">
                {toRupiah(currentFunding as number)}
              </Text>
              {!!targetFunding && (
                <Text fontWeight="bold" color="blueGray.500">
                  {toPercentage(currentFunding || 0, targetFunding || 0)}
                </Text>
              )}
            </HStack>
          </Stack>
        </Stack>
        <Button onPress={onDonatePress} rounded="xl" mt="6">
          Donate
        </Button>
      </Box>
    </Box>
  );
};
