import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../../services/apiRestaurant";

import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-400 px-2">
      {menu.map((dish) => (
        <MenuItem key={dish.id} dish={dish} />
      ))}
    </ul>
  );
}

export async function loader() {
  return await getMenu();
}

export default Menu;
