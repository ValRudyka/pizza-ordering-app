import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUserInfo } from "../features/user/userSlice";

import Username from "../features/user/Username";
import LogoutUser from "../features/user/LogoutUser";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const { username } = useSelector(selectUserInfo);

  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!searchInput) {
      return;
    }

    navigate(`/order/${searchInput}`);
    setSearchInput("");
  };

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-3 py-4 font-semibold uppercase  sm:px-6">
      <Link to="/" className="tracking-widest">
        Ordering Pizza Website
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          className="rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-600
                      focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
          type="text"
          placeholder="search order by ID"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </form>

      {username && (
        <div className="flex items-center  md:space-x-6 space-x-2  ">
          <Username name={username} />
          <span>|</span>
          <LogoutUser />
        </div>
      )}
    </header>
  );
}

export default Header;
