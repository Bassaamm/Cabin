import styled from "styled-components";
import ButtonIcon from "../ui/ButtonIcon";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import { useLogout } from "../features/authentication/useLogout";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  justify-content: end;
`;

export default function HeaderMenu() {
  const { logout, isLoading } = useLogout();

  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <FiSettings />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={logout}>
          <FiLogOut />
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
}
