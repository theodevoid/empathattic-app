import { useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Box, Heading, ScrollView } from "native-base";

import { DonationStatus } from "@empathattic/db/schemas";

import { BottomSheetSelect, BottomSheetSelectItem } from "~/components";
import { FilterButton } from "~/features/donations";

const DonationScreen = () => {
  const [filteredStatus, setFilteredStatus] = useState<string>("ALL");
  const [filteredTime, setFilteredTime] = useState("");

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

  return (
    <Box p="4" flex={1}>
      <ScrollView horizontal maxH={8} mb="2">
        <FilterButton
          onPress={() => statusFilterBottomSheetRef.current?.expand()}
        >
          {statusFilterOptions.find((option) => option.value === filteredStatus)
            ?.label || "All Status"}
        </FilterButton>
      </ScrollView>
      <Box flex={1}>
        <Heading>Donation Screen</Heading>
      </Box>
      <BottomSheetSelect
        items={statusFilterOptions}
        onSelectItem={(value) => setFilteredStatus(value)}
        bottomSheetRef={statusFilterBottomSheetRef}
        selectedValue={filteredStatus}
      />
    </Box>
  );
};

export default DonationScreen;
