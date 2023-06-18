import { SafeAreaView } from "react-native-safe-area-context";
import { Link as ExpoLink, Stack, useRouter } from "expo-router";
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
import { LoginFormValues } from "~/features/auth/forms/login";
import { supabase } from "~/lib/supabase";

const LoginScreen = () => {
  const toast = useToast();
  const router = useRouter();

  const formMethods = useForm<LoginFormValues>();

  const onSubmitLogin = async () => {
    const { getValues } = formMethods;

    try {
      await supabase.auth.signInWithPassword({
        email: getValues("email"),
        password: getValues("password"),
      });

      router.push("/");
    } catch (error) {
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
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormProvider {...formMethods}>
              <LoginForm onSubmitLogin={() => void onSubmitLogin()} />
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
