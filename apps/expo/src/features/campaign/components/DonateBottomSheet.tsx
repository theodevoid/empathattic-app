import { RefObject, useCallback, useMemo } from "react";
import { Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  KeyboardAvoidingView,
  View,
} from "native-base";
import { Controller, useForm } from "react-hook-form";

import { removeNonNumericCharacters, toRupiah } from "~/utils/format";
import { donationFormSchema, DonationFormValues } from "../forms/donation";

interface DonateBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet>;
  campaignId: string;
  onDonateSuccess?: () => void;
}

export const DonateBottomSheet: React.FC<DonateBottomSheetProps> = ({
  bottomSheetRef,
  campaignId,
  onDonateSuccess = () => undefined,
}) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    reset,
  } = useForm<DonationFormValues>({
    defaultValues: {
      amount: 0,
    },
    resolver: zodResolver(donationFormSchema),
    mode: "onChange",
  });

  const snapPoints = useMemo(() => [120, 300], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} pressBehavior="close" />
    ),
    [],
  );

  const onSubmitDonation = async (values: DonationFormValues) => {
    const { amount } = values;

    try {
      console.log("submit donation", amount, campaignId);
      onDonateSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  const setDonationAmount = (amount: number) => {
    setValue("amount", amount);
  };

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
    >
      <KeyboardAvoidingView>
        <View px="4" h="100%" pb="4">
          <HStack mb="4" position="relative">
            <Heading textAlign="center" fontSize="lg" flex={1}>
              Support this campaign
            </Heading>
            <IconButton
              icon={<Icon as={Ionicons} name="close" />}
              borderRadius="full"
              variant="solid"
              size="xs"
              colorScheme="gray"
              top={0}
              right={0}
              position="absolute"
              onPress={() => {
                reset();
                bottomSheetRef.current?.close();
                Keyboard.dismiss();
              }}
            />
          </HStack>
          <HStack space="2" justifyContent="center">
            <Button
              _text={{
                fontWeight: "bold",
              }}
              variant="subtle"
              colorScheme="blueGray"
              onPress={() => setDonationAmount(10_000)}
            >
              {toRupiah(10_000)}
            </Button>
            <Button
              _text={{
                fontWeight: "bold",
              }}
              variant="subtle"
              colorScheme="blueGray"
              onPress={() => setDonationAmount(50_000)}
            >
              {toRupiah(50_000)}
            </Button>
            <Button
              _text={{
                fontWeight: "bold",
              }}
              variant="subtle"
              colorScheme="blueGray"
              onPress={() => setDonationAmount(100_000)}
            >
              {toRupiah(100_000)}
            </Button>
          </HStack>
          <Box flex={1} mt="6">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="amount"
              render={({ field: { value } }) => (
                <FormControl isInvalid={!!errors.amount}>
                  <Center>
                    <InputGroup w="70%">
                      <InputLeftAddon>Rp</InputLeftAddon>
                      <Input
                        onChangeText={(text) => {
                          setValue(
                            "amount",
                            parseInt(removeNonNumericCharacters(text)),
                          );
                        }}
                        keyboardType="number-pad"
                        size="lg"
                        w="85%"
                        value={value ? value.toLocaleString("id-ID") : "0"}
                      />
                    </InputGroup>
                    <FormControl.ErrorMessage>
                      {errors.amount?.message}
                    </FormControl.ErrorMessage>
                  </Center>
                </FormControl>
              )}
            />
          </Box>
          <Button
            onPress={handleSubmit(onSubmitDonation)}
            size="lg"
            rounded="full"
            mt="4"
          >
            Send support
          </Button>
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};
