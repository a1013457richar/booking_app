import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLogin } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MERN Holiday</Link>
        </span>
        <span className="flex space-x-2">
          {isLogin ? (
            <>
              <Link
                to="/my-bookings"
                className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-gray-100"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="cursor-pointer flex items-center text-white  px-3 font-bold hover:bg-gray-100"
              >
                My Hotels
              </Link>
              <SignOutButton/>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="cursor-pointer flex items-center text-white  px-3 font-bold hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
