import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../ui/FormButton";
import {
  decreaseQuantity,
  increaseQuantity,
  selectCurrentItem,
} from "./cartSlice";

function UpdateQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const currItem = useSelector(selectCurrentItem(pizzaId));

  return (
    <div className="flex gap-1 items-center md:gap-3">
      <FormButton
        type="round"
        handleClick={() => dispatch(decreaseQuantity(pizzaId))}
      >
        -
      </FormButton>
      <span className="text-sm font-semibold">{currItem.quantity}</span>
      <FormButton
        type="round"
        handleClick={() => dispatch(increaseQuantity(pizzaId))}
      >
        +
      </FormButton>
    </div>
  );
}

export default UpdateQuantity;
