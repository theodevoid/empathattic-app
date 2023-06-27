import { useCallback, useRef, useState } from "react";
import { ListRenderItem } from "react-native";
import { useRouter } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import { Box, FlatList, ScrollView, Spinner, Text } from "native-base";

import { Campaign, Donation, DonationStatus } from "@empathattic/db/schemas";

import { api } from "~/utils/api";
import { BottomSheetSelect, BottomSheetSelectItem } from "~/components";
import { DonationCard, FilterButton } from "~/features/donations";

const DonationScreen = () => {
  const router = useRouter();

  const [filteredStatus, setFilteredStatus] = useState<DonationStatus | "ALL">(
    "ALL",
  );
  const statusFilterBottomSheetRef = useRef<BottomSheet>(null);
  const statusFilterOptions: BottomSheetSelectItem[] = [
    {
      label: "All Status",
      value: "ALL",
    },
    {
      label: "Waiting for payment",
      value: DonationStatus.AWAITING_PAYMENT,
    },
    {
      label: "Successful",
      value: DonationStatus.SUCCESS,
    },
    {
      label: "Failed",
      value: DonationStatus.FAIL,
    },
  ];

  const {
    data,
    isLoading,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = api.donation.getDonations.useInfiniteQuery(
    {
      status: filteredStatus,
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next !== null) return lastPage.next;
      },
    },
  );

  const renderItem: ListRenderItem<Donation & { campaign: Campaign }> =
    useCallback(
      ({ item }) => (
        <DonationCard
          totalDonation={item.amount}
          campaign={item.campaign}
          donationDate={item.createdAt}
          status={item.status as DonationStatus}
          onViewDetailPress={() =>
            router.push({
              pathname: "/donations/detail",
              params: {
                donationId: item.id,
              },
            })
          }
        />
      ),
      [],
    );

  return (
    <Box p="4" h="100%">
      <ScrollView horizontal maxH={8} mb="4">
        <FilterButton
          onPress={() => statusFilterBottomSheetRef.current?.expand()}
        >
          {statusFilterOptions.find((option) => option.value === filteredStatus)
            ?.label || "All Status"}
        </FilterButton>
      </ScrollView>
      <Box flex={1}>
        <FlatList
          onRefresh={refetch}
          refreshing={isLoading || isRefetching}
          data={data?.pages.map((page) => page.donations).flat()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Box my="1.5" />}
          onEndReached={async () => {
            if (hasNextPage) await fetchNextPage();
          }}
          onEndReachedThreshold={0}
          ListEmptyComponent={() => <Text>No donations found yet</Text>}
          ListFooterComponent={
            isFetchingNextPage ? () => <Spinner py="8" size="lg" /> : null
          }
        />
      </Box>
      <BottomSheetSelect<DonationStatus | "ALL">
        items={statusFilterOptions}
        onSelectItem={(value) => setFilteredStatus(value)}
        bottomSheetRef={statusFilterBottomSheetRef}
        selectedValue={filteredStatus}
      />
    </Box>
  );
};

export default DonationScreen;
