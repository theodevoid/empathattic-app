import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  Icon,
  Input,
  Pressable,
  useDisclose,
} from "native-base";
import { useFormContext } from "react-hook-form";

import { RegisterFormValues } from "../forms/register";

interface RegisterFormProps {
  onSubmitRegister: () => void;
  loading: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmitRegister,
  loading,
}) => {
  const { formState, setValue } = useFormContext<RegisterFormValues>();

  const { isOpen: showPassword, onToggle } = useDisclose();

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
          type={showPassword ? "text" : "password"}
          rightElement={
            <Pressable onPress={onToggle} _pressed={{ opacity: 0.6 }}>
              <Icon
                size="md"
                mr="2"
                as={Ionicons}
                name={showPassword ? "eye" : "eye-off"}
              />
            </Pressable>
          }
        />
        <FormControl.HelperText>Minimum 8 characters</FormControl.HelperText>
        <FormControl.ErrorMessage>
          {formState.errors.password?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        isLoading={loading}
        onPress={onSubmitRegister}
        mt="4"
        colorScheme="primary"
      >
        Sign up
      </Button>
    </>
  );
};
