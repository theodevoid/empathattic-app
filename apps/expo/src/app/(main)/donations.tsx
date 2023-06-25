import { useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Box, FlatList, ScrollView, Text } from "native-base";

import { Campaign, Donation, DonationStatus } from "@empathattic/db/schemas";

import { api } from "~/utils/api";
import { BottomSheetSelect, BottomSheetSelectItem } from "~/components";
import { DonationCard, FilterButton } from "~/features/donations";

const DonationScreen = () => {
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

  const [page, setPage] = useState<number>(1);
  const [reachedMaxData, setReachedMaxData] = useState<boolean>(false);

  const { data, refetch, isLoading, isRefetching } =
    api.donation.getDonations.useQuery({
      page,
      status: filteredStatus,
    });

  const [infiniteDonationsData, setInfiniteDonationsData] = useState<
    (Donation & { campaign: Campaign })[]
  >([]);

  // append new pages to current data set
  useEffect(() => {
    if (data && !reachedMaxData) {
      setInfiniteDonationsData((prev) => [...prev, ...data.donations]);

      if (!data.hasNext) {
        setReachedMaxData(true);
      }
    }
  }, [data, reachedMaxData]);

  // reset data when status changes
  useEffect(() => {
    setPage(1);
    setInfiniteDonationsData([]);
    setReachedMaxData(false);
  }, [filteredStatus]);

  return (
    <Box p="4" flex={1}>
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
          refreshing={isLoading || isRefetching}
          onRefresh={() => {
            setInfiniteDonationsData([]);
            setPage(1);
            setReachedMaxData(false);
            void refetch();
          }}
          data={infiniteDonationsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DonationCard
              totalDonation={item.amount}
              campaign={item.campaign}
              donationDate={item.createdAt}
              status={item.status as DonationStatus}
            />
          )}
          ItemSeparatorComponent={() => <Box my="1.5" />}
          onEndReached={() => {
            if (data?.hasNext) {
              setPage((prev) => prev + 1);
            }
          }}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={() => <Text>No donations found yet</Text>}
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
