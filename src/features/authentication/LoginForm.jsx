import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { getExistUser, login } from "../../services/apiAuth";
import { useLoginUser } from "./useLoginUser";
import SpinnerMini from "../../ui/SpinnerMini";
import Spinner from "../../ui/Spinner";
function LoginForm() {
  const [email, setEmail] = useState("bassam@test.com");
  const [password, setPassword] = useState("test");
  const { mutate: userData, isLoading, error } = useLoginUser();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    userData({ email, password }, { onSettled: () => setPassword("") });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
