import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import LoaderBars from "./LoaderBars";

function AppLayout() {
  //returns an object with state prop which sets  the  state of the WHOLE application, therefore it should be used here
  //in the component which is the parent of the rest, we can say its role to show the current state of the app with some
  //stable elements(Nabigation, BottomNavigation)
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]    ">
      {isLoading && <LoaderBars />}

      <Header />

      <div className="overflow-scroll no-scrollbar">
        <main className="mt-4  max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
