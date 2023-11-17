import LinkButton from "../../ui/LinkButton";
import FormButton from "../../ui/FormButton";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";

import EmptyCart from "./EmptyCart";
import { selectUserInfo } from "../user/userSlice";
/**
 
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
*/

function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const { username } = useSelector(selectUserInfo);

  const dispatch = useDispatch();

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-3">
      <LinkButton path="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 font-semibold text-xl">Your cart, {username}</h2>

      <ul className="mt-4 divide-y divide-stone-300 border-b ">
        {cart.map((el) => (
          <CartItem key={el.pizzaId} item={el} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <FormButton type="primary" path={"/order/new"}>
          Order pizzas
        </FormButton>
        <FormButton handleClick={() => dispatch(clearCart())} type="secondary">
          Clear cart
        </FormButton>
      </div>
    </div>
  );
}

export default Cart;
