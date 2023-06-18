import { Button, FormControl, Input } from "native-base";

interface LoginFormProps {
  onSubmitLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmitLogin }) => {
  return (
    <>
      <FormControl>
        <FormControl.Label>Email</FormControl.Label>
        <Input />
      </FormControl>
      <FormControl>
        <FormControl.Label>Password</FormControl.Label>
        <Input type="password" />
      </FormControl>
      <Button onPress={() => onSubmitLogin()} mt="2" colorScheme="primary">
        Sign in
      </Button>
    </>
  );
};
