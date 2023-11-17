import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

import { getOrder } from "../services/apiRestaurant";

import { Provider } from "react-redux";

import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./ui/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/menu",
            element: <Menu />,
            loader: menuLoader,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/order/new",
            element: <CreateOrder />,
            action: createOrderAction,
          },
          {
            path: "/order/:id",
            element: <Order />,
            action: updateOrderAction,
            loader: async ({ params }) => await getOrder(params.id),
          },
        ],
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />;
      </PersistGate>
    </Provider>
  );
}

export default App;
