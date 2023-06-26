import * as Linking from "expo-linking";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { format } from "date-fns";
import {
  AspectRatio,
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Stack as NBStack,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
} from "native-base";

import { DonationStatus } from "@empathattic/db/schemas";

import { api } from "~/utils/api";
import { toRupiah } from "~/utils/format";
import { Header } from "~/components/Header";
import { DonationCardBadge } from "~/features/donations/components/DonationCardBadge";

type DonationDetailScreenParams = {
  donationId: string;
};

const DonationDetailScreen = () => {
  const router = useRouter();
  const { donationId } = useLocalSearchParams<DonationDetailScreenParams>();

  const { data: donation, isLoading } = api.donation.getDonationById.useQuery({
    donationId: donationId as string,
  });

  const onPressDonateAgain = () => {
    router.push({
      pathname: "/campaign/detail",
      params: {
        campaignId: donation?.campaign.id,
      },
    });
  };

  const onPressPayment = async () => {
    if (donation) {
      await Linking.openURL(donation.externalInvoiceUrl as string);
    }
  };

  return (
    <ScrollView bg="white" flex={1}>
      <Stack.Screen
        options={{
          header: (props) => <Header {...props} />,
        }}
      />
      <NBStack space="4" p="4">
        <HStack justifyContent="space-between" alignItems="center">
          <DonationCardBadge status={donation?.status as DonationStatus} />
          <Text color="muted.500" fontSize="xs">
            {format(donation?.createdAt || new Date(), "dd MMM yyyy hh:mm")}
          </Text>
        </HStack>
      </NBStack>

      <Divider size="1" w="100%" />

      <NBStack p="4" space="4" alignItems="center">
        <HStack space="2">
          <Skeleton flex={1} isLoaded={!!donation}>
            <AspectRatio ratio={16 / 9} flex={1}>
              <Image
                source={{
                  uri: donation?.campaign.images[0] || "",
                }}
                alt={donation?.campaign.title}
              />
            </AspectRatio>
          </Skeleton>

          <Skeleton flex={2} isLoaded={!!donation}>
            <NBStack flex={2} justifyContent="space-between">
              <Heading size="sm">{donation?.campaign.title}</Heading>
            </NBStack>
          </Skeleton>
        </HStack>

        <Pressable
          _pressed={{
            opacity: 0.6,
          }}
          onPress={onPressDonateAgain}
        >
          <Text fontSize="sm" fontWeight="semibold" color="primary.400">
            Donate Again
          </Text>
        </Pressable>
      </NBStack>

      <Divider size="1" w="100%" />

      <NBStack p="4">
        <Heading size="md" mb="3">
          Payment Details
        </Heading>

        <NBStack space="2">
          <HStack justifyContent="space-between">
            <Text>Donation Total</Text>
            <Skeleton.Text w={70} isLoaded={!!donation} lines={1}>
              <Text>{toRupiah(donation?.amount || 0)}</Text>
            </Skeleton.Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Platform Fee</Text>
            <Skeleton.Text isLoaded={!!donation} lines={1} w={70}>
              <Text>{toRupiah(donation?.platformFee || 0)}</Text>
            </Skeleton.Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontSize="md" fontWeight="bold">
              Donation Total
            </Text>
            <Skeleton.Text w={70} isLoaded={!!donation} lines={1}>
              <Text fontSize="md" fontWeight="bold">
                {toRupiah(
                  (donation?.amount || 0) + (donation?.platformFee || 0) || 0,
                )}
              </Text>
            </Skeleton.Text>
          </HStack>
        </NBStack>

        {donation?.status === "AWAITING_PAYMENT" && (
          <Button mt="4" size="sm" variant="solid" onPress={onPressPayment}>
            Continue payment
          </Button>
        )}
      </NBStack>
    </ScrollView>
  );
};

export default DonationDetailScreen;
