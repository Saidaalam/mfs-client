import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <span className="text-sky-800 font-bold text-lg">MFS App</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 mx-2 text-sky-800 font-bold text-lg">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/transaction">Transaction</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {user ? (
            <li>
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div title={user?.displayName} className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      alt="User Profile"
                      src={user?.photoURL || "/default-profile-pic.jpg"}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                </div>
                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/transaction">Transaction</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="mt-2">
                    <button
                      onClick={logOut}
                      className="bg-gray-200 block text-center w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
