import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import FormButton from "./FormButton";
import LogoutUser from "../features/user/LogoutUser";

function Home() {
  const { username } = useSelector((state) => state.user);

  return (
    <div className=" my-10 px-4 text-center sm:my-16  ">
      <h1 className="mb-8 text-xl font-bold tracking-widest md:text-3xl ">
        The best pizza.
        <br />
        <span className="break-words    text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username ? (
        <div className="space-x-4 md:space-x-6">
          <FormButton path="/menu" type="primary">
            Continue ordering, {username}
          </FormButton>
          <LogoutUser />
        </div>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
