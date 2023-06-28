import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "native-base";
import { FormProvider, useForm } from "react-hook-form";

import { RegisterForm } from "~/features/auth/components";
import {
  registerFormSchema,
  RegisterFormValues,
} from "~/features/auth/forms/register";
import { supabase } from "~/lib/supabase";

const RegisterScreen = () => {
  const router = useRouter();
  const toast = useToast();

  const formMethods = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });

  const onSubmitRegister = async (values: RegisterFormValues) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast.show({
        title: "Account created!",
        description: "Log in to your account to continue",
        duration: 7000,
      });
      router.replace("/login");
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Login Failed",
        description: "Something went wrong",
      });
    }
  };

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Login ", headerShown: false }} />
      <Center w="100%">
        <Box mt="20%" py="8" w="90%">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Create an account!
          </Heading>

          <VStack space={3} mt="5">
            <FormProvider {...formMethods}>
              <RegisterForm
                onSubmitRegister={formMethods.handleSubmit(onSubmitRegister)}
                loading={formMethods.formState.isSubmitting}
              />
            </FormProvider>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I have an account.{" "}
              </Text>
              <Link href={{ pathname: "/login" }}>
                <Text fontWeight="medium">Login</Text>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default RegisterScreen;
