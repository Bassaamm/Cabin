import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img
        src={
          !darkMode
            ? "src\\data\\img\\logo-light.png"
            : "src\\data\\img\\logo-dark.png"
        }
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
