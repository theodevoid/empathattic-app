import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
};

export default AuthLayout;
