import { useDispatch } from "react-redux";
import FormButton from "../../ui/FormButton";

import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <FormButton type="small" handleClick={() => dispatch(deleteItem(pizzaId))}>
      Delete from cart
    </FormButton>
  );
}

export default DeleteItem;
