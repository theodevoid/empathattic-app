import { RefObject, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Box, HStack, Pressable, Text } from "native-base";

export type BottomSheetSelectItem = {
  label: string;
  value: string;
};

interface BottomSheetSelectProps {
  bottomSheetRef: RefObject<BottomSheet>;
  items: BottomSheetSelectItem[];
  onSelectItem: (value: string) => void;
  selectedValue?: string;
}

export const BottomSheetSelect: React.FC<BottomSheetSelectProps> = ({
  bottomSheetRef,
  items,
  onSelectItem,
  selectedValue,
}) => {
  const snapPoints = useMemo(() => [200, 350], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} pressBehavior="close" />
    ),
    [],
  );

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
    >
      <BottomSheetScrollView style={{ height: "100%" }}>
        {items.map(({ label, value }, idx) => {
          return (
            <Pressable
              key={idx}
              onPress={() => {
                onSelectItem(value);
                bottomSheetRef.current?.close();
              }}
              _pressed={{ opacity: 0.6 }}
            >
              <HStack
                px="4"
                py="2"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontWeight="semibold" fontSize="md">
                  {label}
                </Text>
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  boxSize="7"
                  rounded="full"
                  borderColor="dark.500"
                  borderWidth={1}
                  p="2"
                >
                  {value === selectedValue && (
                    <Box
                      top={0}
                      left={0}
                      bottom={0}
                      right={0}
                      boxSize="5"
                      bg="green.500"
                      rounded="full"
                    />
                  )}
                </HStack>
              </HStack>
            </Pressable>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
