import { Button, FormControl, Input } from "native-base";
import { useFormContext } from "react-hook-form";

import { LoginFormValues } from "../forms/login";

interface LoginFormProps {
  onSubmitLogin: () => void;
  loading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmitLogin,
  loading,
}) => {
  const { formState, setValue } = useFormContext<LoginFormValues>();

  return (
    <>
      <FormControl isInvalid={!!formState.errors.email}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          onChangeText={(text) => {
            setValue("email", text);
          }}
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <FormControl.ErrorMessage>
          {formState.errors.email?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!formState.errors.password}>
        <FormControl.Label>Password</FormControl.Label>
        <Input
          onChangeText={(text) => {
            setValue("password", text);
          }}
          type="password"
        />
        <FormControl.HelperText>Minimum 8 characters</FormControl.HelperText>
        <FormControl.ErrorMessage>
          {formState.errors.password?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        isLoading={loading}
        onPress={onSubmitLogin}
        mt="4"
        colorScheme="primary"
      >
        Sign in
      </Button>
    </>
  );
};
