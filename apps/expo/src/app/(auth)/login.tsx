import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link as ExpoLink, Stack, useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from "native-base";
import { FormProvider, useForm } from "react-hook-form";

import { LoginForm } from "~/features/auth/components";
import { loginFormSchema, LoginFormValues } from "~/features/auth/forms/login";
import { supabase } from "~/lib/supabase";
import { useStore } from "~/stores";

const LoginScreen = () => {
  const toast = useToast();
  const router = useRouter();

  const { user } = useStore();

  const formMethods = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const onSubmitLogin = async (values: LoginFormValues) => {
    try {
      await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      router.replace("/");
    } catch (error) {
      toast.show({
        title: "Login Failed",
        description: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormProvider {...formMethods}>
              <LoginForm
                onSubmitLogin={formMethods.handleSubmit(onSubmitLogin)}
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
                I&apos;m a new user.{" "}
              </Text>
              <ExpoLink href={{ pathname: "/register" }} replace asChild>
                <Text fontWeight="medium">Make an account</Text>
              </ExpoLink>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default LoginScreen;
