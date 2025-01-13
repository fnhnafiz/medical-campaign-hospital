import clsx from "clsx";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import navLogo from "../../public/CampMedLOGO.png";
import avatarImg from "../../public/placeholder.jpg";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // console.log(pathname);
  const [menuBar, setMenuBar] = useState(false);
  const [color, setColur] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColur(true);
    } else {
      setColur(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  //   logout user
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div
      className={
        color
          ? `header header-bg px-8 py-6 text-white ${
              pathname === "/" && "text-black"
            }`
          : ` px-8 flex py-6 text-black`
      }
    >
      <div className="flex justify-between items-center w-full">
        {/* Left section in navbar */}
        <div className="flex items-center gap-4">
          {/* Menu bar */}
          <IoMenu
            onClick={() => setMenuBar(true)}
            className="text-4xl cursor-pointer lg:hidden"
          />
          {/* website name */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <div>
                <img className="w-12 h-12" src={navLogo} alt="" />
              </div>
              <h1
                className={`text-2xl font-bold text-green-500 ${
                  pathname !== "/" && "text-green-500"
                } ${color && "text-white"}`}
              >
                Camp Med
              </h1>
            </div>
          </Link>
        </div>

        {/* Links in the center */}
        <ul className="hidden lg:flex space-x-6">
          <li>
            <NavLink to="/" className="hover:text-red-500 font-semibold ml-6">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/available-camps"
              className="hover:text-red-500 font-semibold"
            >
              Available Camps
            </NavLink>
          </li>
          <li>
            <NavLink to="/join-us" className="hover:text-red-500 font-semibold">
              Join Us
            </NavLink>
          </li>
        </ul>

        {/* Right side for login button */}
        <section className="flex items-center gap-4">
          {/* <Link to="/login">
            <button className="btn">Login</button>
          </Link> */}
          {/* Dropdown Menu */}
          <div className="relative">
            <div className="flex flex-row items-center gap-3">
              {/* Dropdown btn */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              >
                {/* <AiOutlineMenu /> */}
                <div className="hidden md:block">
                  {/* Avatar */}
                  <img
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                    src={user && user.photoURL ? user.photoURL : avatarImg}
                    alt="profile"
                    height="30"
                    width="30"
                  />
                </div>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw]  overflow-hidden right-0 top-20 text-sm ">
              <div className="flex flex-col cursor-pointer">
                <Link
                  to="/"
                  className="block md:hidden px-4 py-3 text-black hover:bg-neutral-100 transition font-semibold"
                >
                  Home
                </Link>

                {user ? (
                  <>
                    <div className="px-4 py-3 text-black hover:bg-neutral-100 transition font-semibold cursor-pointer">
                      {user?.displayName}
                    </div>
                    <Link
                      to="/dashboard"
                      className="px-4 py-3 text-black hover:bg-neutral-100 transition font-semibold"
                    >
                      Dashboard
                    </Link>
                    <div
                      onClick={handleLogOut}
                      className="px-4 py-3 text-black hover:bg-neutral-100 transition font-semibold cursor-pointer"
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-3 text-black hover:bg-neutral-100 transition font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-3 text-black hover:bg-neutral-100 transition font-semibold"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Sidebar menu open */}
      <div
        className={clsx(
          "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all z-50",
          menuBar && "translate-x-0"
        )}
      >
        <section className="text-black bg-white flex flex-col absolute left-0 top-0 h-screen p-8 gap-8 w-56">
          <IoClose
            onClick={() => setMenuBar(false)}
            className="text-4xl cursor-pointer mt-0 mb-8"
          />
          {/* Links in the center */}
          <ul className="flex flex-col gap-8 space-x-6">
            <li>
              <NavLink to="/" className="hover:text-red-500 font-semibold ml-6">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/available-camps"
                className="hover:text-red-500 font-semibold"
              >
                Available Camps
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/join-us"
                className="hover:text-red-500 font-semibold"
              >
                Join Us
              </NavLink>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
