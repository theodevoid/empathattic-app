import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
} from "native-base";

import { BottomSheetSelect, BottomSheetSelectItem } from "~/components";
import { FilterButton } from "~/features/donations";

const DonationScreen = () => {
  const [filteredStatus, setFilteredStatus] = useState("");
  const [filteredTime, setFilteredTime] = useState("");

  const statusFilterBottomSheetRef = useRef<BottomSheet>(null);

  const statusFilterOptions: BottomSheetSelectItem[] = [
    {
      label: "All Status",
      value: "all",
    },
    {
      label: "Waiting for payment",
      value: "awaiting_payment",
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
      <Box flex={1} bg="red">
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
