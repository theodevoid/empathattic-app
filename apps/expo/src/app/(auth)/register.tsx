import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  View,
  VStack,
} from "native-base";

const RegisterScreen = () => {
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
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input keyboardType="number-pad" />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <Button mt="2" colorScheme="primary">
              Sign in
            </Button>
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
