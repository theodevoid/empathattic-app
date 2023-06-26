import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  Stack as NBStack,
  Pressable,
  useToast,
} from "native-base";
import { useForm } from "react-hook-form";

import { Header } from "~/components/Header";
import {
  changePasswordFormSchema,
  ChangePasswordFormValues,
} from "~/features/profile/forms/change-password";
import { supabase } from "~/lib/supabase";
import { useStore } from "~/stores";

const ChangePasswordScreen = () => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useStore();

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
    resolver: zodResolver(changePasswordFormSchema),
  });

  const submitChangePassword = async (values: ChangePasswordFormValues) => {
    setLoading(true);
    try {
      const { error: oldPasswordError } =
        await supabase.auth.signInWithPassword({
          email: user?.email as string,
          password: values.oldPassword,
        });

      if (oldPasswordError) throw oldPasswordError;

      const { error: newPasswordError } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (newPasswordError) throw newPasswordError;

      toast.show({
        title: "Success",
        description: "Your password has been changed",
      });
      router.back();
    } catch (err) {
      console.log(err);
      toast.show({
        title: "Something went wrong",
        description: "Failed to change your password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box px="4" py="8">
      <Stack.Screen
        options={{
          header: (props) => <Header {...props} />,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <NBStack space="4">
        <FormControl isInvalid={!!errors.oldPassword}>
          <FormControl.Label>Old Password</FormControl.Label>
          <Input
            onChangeText={(text) => setValue("oldPassword", text)}
            secureTextEntry={!showOldPassword}
            size="lg"
            rightElement={
              <Pressable
                onPress={() => setShowOldPassword((prev) => !prev)}
                _pressed={{ opacity: 0.6 }}
              >
                <Icon
                  size="lg"
                  mr="2"
                  as={Ionicons}
                  name={showNewPassword ? "eye" : "eye-off"}
                />
              </Pressable>
            }
          />
          <FormControl.ErrorMessage>
            {errors.newPassword}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.newPassword}>
          <FormControl.Label>New Password</FormControl.Label>
          <Input
            onChangeText={(text) => setValue("newPassword", text)}
            secureTextEntry={!showNewPassword}
            size="lg"
            rightElement={
              <Pressable
                onPress={() => setShowNewPassword((prev) => !prev)}
                _pressed={{ opacity: 0.6 }}
              >
                <Icon
                  size="lg"
                  mr="2"
                  as={Ionicons}
                  name={showNewPassword ? "eye" : "eye-off"}
                />
              </Pressable>
            }
          />
          <FormControl.ErrorMessage>
            {errors.newPassword}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          isLoading={loading}
          onPress={handleSubmit(submitChangePassword)}
        >
          Change Password
        </Button>
      </NBStack>
    </Box>
  );
};

export default ChangePasswordScreen;
