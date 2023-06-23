import { useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Box, Button, Text } from "native-base";

interface BottomDonateButtonProps {
  campaignId: string;
  onSubmitAmount: () => void;
}

export const BottomDonateButton: React.FC<BottomDonateButtonProps> = ({
  campaignId,
  onSubmitAmount,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const onDonatePress = () => {
    bottomSheetRef?.current?.expand();
  };

  return (
    <Box p="4">
      <Button onPress={onDonatePress}>Donate</Button>
      <BottomSheet index={-1} snapPoints={snapPoints} ref={bottomSheetRef}>
        <Box flex={1}>
          <Text>Bottom Sheet</Text>
          <Text>Bottom Sheet</Text>
          <Text>Bottom Sheet</Text>
          <Text>Bottom Sheet</Text>
          <Text>Bottom Sheet</Text>
          <Text>Bottom Sheet</Text>
          <Text>Bottom Sheet</Text>
          <Text>Bottom Sheet</Text>
          <Text>Bottom Sheet</Text>
        </Box>
      </BottomSheet>
    </Box>
  );
};
