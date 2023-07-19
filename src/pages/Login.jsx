import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/userUser";
import Spinner from "../ui/Spinner";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: userLoading } = useUser();

  if (userLoading) return <Spinner />;
  if (isAuthenticated) return navigate("/");
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h3">Log in to account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}
