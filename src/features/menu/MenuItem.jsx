import { formatCurrency } from "../../utils/helpers";
import FormButton from "../../ui/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCurrentItem } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ dish }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = dish;

  const dispatch = useDispatch();

  const isInCart = useSelector(selectCurrentItem(id));

  const addToCart = function () {
    const newDish = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };

    dispatch(addItem(newDish));
  };

  return (
    <li className="flex gap-6 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-28 ${soldOut ? "opacity-75 grayscale " : ""} `}
      />
      <div className="flex flex-col grow pt-0.5 ">
        <p className="font-medium text-stone-700">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase">Sold out</p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateQuantity pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <FormButton handleClick={addToCart} type="small">
              Add to cart
            </FormButton>
          )}
        </div>
      </div>
      <br />
    </li>
  );
}

export default MenuItem;
