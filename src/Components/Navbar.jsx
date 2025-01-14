import { useState } from "react";

import { Link, NavLink } from "react-router-dom";
import navLogo from "../../public/CampMedLOGO.png";
import avatarImg from "../../public/placeholder.jpg";
import useAuth from "../Hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
import useAdmin from "../Hooks/useAdmin";
import LoadingSpinner from "./LoadingSpinner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  // const isAdmin = true;
  const [organizer, isAdminLoading] = useAdmin();
  console.log(organizer);
  if (isAdminLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm px-4">
      <div className="py-4 border-b-[1px]">
        <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <img className="w-12 h-12" src={navLogo} alt="logo" />
              <h1 className="text-2xl font-bold text-green-500 ">Camp Med</h1>
            </div>
          </Link>
          <div className="flex items-center gap-8">
            <div>
              {/* Links in the center */}
              <ul className="hidden lg:flex space-x-3">
                <li>
                  <NavLink
                    to="/"
                    className="hover:text-green-500 font-semibold ml-3"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/available-camps"
                    className="hover:text-green-500 font-semibold"
                  >
                    Available Camps
                  </NavLink>
                </li>
                {!user && (
                  <li>
                    <NavLink
                      to="/login"
                      className="hover:text-green-500 font-semibold"
                    >
                      Join Us
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
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
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    <ul className="lg:hidden lg:flex lg-flex-col  space-x-6 space-y-6 mb-4 pt-4">
                      <li>
                        <NavLink
                          to="/"
                          className="hover:text-green-500 font-semibold ml-[14px]"
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/available-camps"
                          className="hover:text-green-500 font-semibold -ml-2"
                        >
                          Available Camps
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          className="hover:text-green-500 font-semibold -ml-2"
                        >
                          Join Us
                        </NavLink>
                      </li>
                    </ul>
                    {!user ? (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <>
                        {organizer ? (
                          <Link
                            to="/dashboard/admin-home"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold hover:text-green-500"
                          >
                            Dashboard
                          </Link>
                        ) : (
                          <Link
                            to="/dashboard/user-home"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold hover:text-green-500"
                          >
                            Dashboard
                          </Link>
                        )}
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer hover:text-green-500"
                        >
                          Logout
                        </div>
                      </>
                    )}

                    {/* {user ? (
                      <>
                        {isAdmin ? (
                          <Link
                            to="/dashboard/admin-home"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold hover:text-green-500"
                          >
                            Dashboard
                          </Link>
                        ) : (
                          <Link
                            to="/dashboard/user-home"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold hover:text-green-500"
                          >
                            Dashboard
                          </Link>
                        )}

                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer hover:text-green-500"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
