import { Stack } from "expo-router";
import { Box, FormControl, Input } from "native-base";

import { Header } from "~/components/Header";

const EditProfileScreen = () => {
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
      <FormControl>
        <FormControl.Label>Full Name</FormControl.Label>
        <Input />
        <FormControl.HelperText>
          This name will be public
        </FormControl.HelperText>
      </FormControl>
    </Box>
  );
};

export default EditProfileScreen;
