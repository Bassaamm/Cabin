import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
export default function DarkModeToggle() {
  const { darkMode, handleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={handleDarkMode}>
      {darkMode ? <MdOutlineDarkMode /> : <MdDarkMode />}
    </ButtonIcon>
  );
}
