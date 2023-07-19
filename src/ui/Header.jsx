import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import HeaderMenu from "../ui/HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  text-align: right;
  display: flex;
  gap: 3rem;
  justify-content: end;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
