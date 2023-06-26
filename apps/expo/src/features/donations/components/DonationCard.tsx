import { format } from "date-fns";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from "native-base";

import { Campaign, DonationStatus } from "@empathattic/db/schemas";

import { toRupiah } from "~/utils/format";
import { DonationCardBadge } from "./DonationCardBadge";

interface DonationCardProps {
  donationDate: Date;
  status: DonationStatus;
  campaign: Campaign;
  totalDonation: number;
  onViewDetailPress: () => void;
}

export const DonationCard: React.FC<DonationCardProps> = ({
  donationDate,
  status,
  campaign,
  totalDonation,
  onViewDetailPress,
}) => {
  return (
    <Stack
      rounded="lg"
      borderColor="dark.500"
      borderWidth={1}
      p="4"
      space="2.5"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Text color="muted.500">{format(donationDate, "dd MMM yyyy")}</Text>
        <DonationCardBadge status={status} />
      </HStack>
      <Divider />
      <Stack>
        <Heading fontWeight="bold" fontSize="md">
          {campaign.title}
        </Heading>

        <HStack mt="4" alignItems="flex-end" justifyContent="space-between">
          <Stack>
            <Text fontSize="2xs" color="muted.500">
              Total Donation
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {toRupiah(totalDonation)}
            </Text>
          </Stack>
          <Box>
            <HStack>
              <Button
                onPress={onViewDetailPress}
                size="xs"
                variant="solid"
                py="1"
                borderColor="primary.200"
                _text={{ fontWeight: "bold" }}
              >
                View Details
              </Button>
            </HStack>
          </Box>
        </HStack>
      </Stack>
    </Stack>
  );
};
