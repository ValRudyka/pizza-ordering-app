import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearUserInfo } from "./userSlice";
import { clearCart } from "../cart/cartSlice";

import FormButton from "../../ui/FormButton";

function LogoutUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async function () {
    dispatch(clearCart());
    dispatch(clearUserInfo());
    navigate("/");
  };

  return (
    <FormButton type="primary" handleClick={logout}>
      Logout
    </FormButton>
  );
}

export default LogoutUser;
