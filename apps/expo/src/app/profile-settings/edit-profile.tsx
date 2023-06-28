import { Stack, useRouter } from "expo-router";
import { TRPCError } from "@trpc/server";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack as NBStack,
  useToast,
} from "native-base";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { Header } from "~/components/Header";
import { EditProfileFormValues } from "~/features/profile/forms/edit-profile";

const EditProfileScreen = () => {
  const toast = useToast();
  const router = useRouter();

  const apiContext = api.useContext();

  const { data } = api.user.getUser.useQuery();
  const { mutateAsync: updateUser } = api.user.updateUser.useMutation();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      fullName: data?.fullName || "",
    },
  });

  const onPressSave = async ({ fullName }: EditProfileFormValues) => {
    try {
      await updateUser({
        fullName,
      });

      await apiContext.user.getUser.invalidate();

      toast.show({
        title: "Success",
        description: "Updated your profile",
      });

      router.back();
    } catch (error) {
      if (error instanceof TRPCError) {
        toast.show({
          title: error.code,
          description: error.message,
        });
      } else {
        toast.show({
          title: "Something went wrong",
        });
      }
    }
  };

  return (
    <Box p="4">
      <Stack.Screen
        options={{
          contentStyle: {
            backgroundColor: "white",
          },
          header: (props) => <Header {...props} />,
        }}
      />
      <NBStack space="2">
        <FormControl isDisabled>
          <FormControl.Label>Email</FormControl.Label>
          <Input defaultValue={data?.email as string} />
          <FormControl.HelperText>
            Currently, you cannot change your email
          </FormControl.HelperText>
        </FormControl>
        <FormControl isInvalid={!!errors.fullName}>
          <FormControl.Label>Full Name</FormControl.Label>
          <Input
            defaultValue={data?.fullName || ""}
            onChangeText={(text) => setValue("fullName", text)}
          />
          <FormControl.ErrorMessage>{errors.fullName}</FormControl.ErrorMessage>
          <FormControl.HelperText>
            This name will be public
          </FormControl.HelperText>
        </FormControl>

        <Button
          isLoading={isSubmitting}
          onPress={handleSubmit(onPressSave)}
          mt="4"
        >
          Save
        </Button>
      </NBStack>
    </Box>
  );
};

export default EditProfileScreen;
