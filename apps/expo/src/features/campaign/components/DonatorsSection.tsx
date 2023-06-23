import { Avatar, Badge, Box, Button, HStack, Stack, Text } from "native-base";

import { DetailSection } from "./DetailSection";

interface DonatorsSectionProps {
  initials: string[];
  campaignId: string;
  numberOfDonators: number;
}

export const DonatorsSection: React.FC<DonatorsSectionProps> = ({
  campaignId,
  initials,
  numberOfDonators = 0,
}) => {
  return (
    <DetailSection title="Donators">
      {numberOfDonators ? (
        <HStack justifyContent="space-between">
          <Stack>
            <Avatar.Group flexDirection="row" mx="4">
              {initials.map((initial, idx) => {
                return <Avatar key={idx}>{initial}</Avatar>;
              })}
            </Avatar.Group>
            <Box px="2" py="1" rounded="md">
              <Text>{numberOfDonators} people have donated</Text>
            </Box>
          </Stack>
          <Button onPress={() => console.log(campaignId)} variant="ghost">
            View all
          </Button>
        </HStack>
      ) : (
        <Text fontWeight="semibold" fontSize="md">
          Be the first one to donate!
        </Text>
      )}
    </DetailSection>
  );
};
