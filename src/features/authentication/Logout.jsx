import { FiLogOut } from "react-icons/fi";
import ButtonIcon from "../../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { useLogout } from "./useLogout";

export default function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={logout}>
      <FiLogOut />
    </ButtonIcon>
  );
}
