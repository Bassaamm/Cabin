import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";
import { useClickOutSide } from "../hooks/useClickOutSide";

const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [coordinate, setCoordinate] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenuContext.Provider
      value={{ openId, close, open, coordinate, setCoordinate }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }) {
  const { open, openId, close, setCoordinate } = useContext(MenuContext);
  function handleClick(e) {
    e.stopPropagation();
    const coordinate = e.target.closest("button").getBoundingClientRect();
    setCoordinate({
      x: window.innerWidth - coordinate.x + 5,
      y: coordinate.y + 20,
    });
    openId === "" || openId !== id ? open(id) : close();
    console.log(openId);
  }
  return (
    <StyledToggle onClick={handleClick}>
      <FiMoreVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, coordinate, close } = useContext(MenuContext);
  const ref = useClickOutSide(close, false);
  if (id !== openId) return null;

  return (
    <StyledList position={coordinate} ref={ref}>
      {children}
    </StyledList>
  );
}
function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
