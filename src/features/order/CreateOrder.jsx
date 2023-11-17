import { useState } from "react";

import store from "../../store";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../../../services/apiRestaurant";

import { clearCart, selectCart, selectTotalPrice } from "../cart/cartSlice";
import { fetchAddress, selectUserInfo } from "../user/userSlice";

import { formatCurrency } from "../../utils/helpers";

import FormButton from "../../ui/FormButton";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [isPriority, setIsPriority] = useState(false);

  const cart = useSelector(selectCart);
  const cartPrice = useSelector(selectTotalPrice);

  const { username, address, status, errorMessage, position } =
    useSelector(selectUserInfo);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formErrors = useActionData();

  const hasSubmitted = navigation.state === "loading";

  const priority = isPriority ? (cartPrice * 20) / 100 : 0;
  const totalPrice = cartPrice + priority;

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-semibold text-xl mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            readOnly
            className="input grow"
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" />
            {formErrors?.phone && (
              <p className="text-xs mt-2 bg-red-200 text-red-700 p-2 rounded-md ">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={status === "loading "}
              defaultValue={address}
              className="input w-full"
            />
            <span className="absolute right-[3px] top-[3px] sm:right-[5px] sm:top-[5px] z-50">
              {!position.latitude && !position.longtitude && (
                <FormButton
                  disabled={status === "loading"}
                  type="small"
                  handleClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get your position
                </FormButton>
              )}
            </span>

            {status === "error" && (
              <p className="text-xs mt-2 bg-red-200 text-red-700 p-2 rounded-md ">
                {errorMessage}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            value={isPriority}
            onChange={(e) => setIsPriority(e.target.checked)}
            id="priority"
          />
          <label className="font-medium" htmlFor="priority">
            Do you want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <FormButton type="primary" disabled={hasSubmitted}>
            {hasSubmitted
              ? "Creating an order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </FormButton>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();

  const formData = Object.fromEntries(data);

  const errors = {};

  const order = {
    ...formData,
    cart: JSON.parse(formData.cart),
    priority: Boolean(formData.priority),
  };

  if (!isValidPhone(order.phone)) {
    errors.phone = "Write the correct phone number";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  //not overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
