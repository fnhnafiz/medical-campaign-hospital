import { useState } from "react";

import { Link, NavLink } from "react-router-dom";
import navLogo from "../../public/CampMedLOGO.png";
import avatarImg from "../../public/placeholder.jpg";
import useAuth from "../Hooks/useAuth";

import useAdmin from "../Hooks/useAdmin";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { RiMenu3Line } from "react-icons/ri";
import { IoClose, IoNotificationsOutline } from "react-icons/io5";
import { MdDashboard, MdLogin, MdPersonAdd } from "react-icons/md";
import { TbCampfire } from "react-icons/tb";
import { FaRegHospital } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user, logOut } = useAuth();
  // console.log(user);
  // const isAdmin = true;
  const [organizer] = useAdmin();
  // console.log(organizer);

  const { data: notifications } = useQuery({
    queryKey: ["notification", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/deleted-trash-data/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="fixed w-full bg-gradient-to-r from-emerald-50 to-teal-50 z-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={navLogo}
              alt="CampMed"
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <span className="text-xl md:text-2xl font-bold text-emerald-600">
              Camp Med
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "hover:bg-emerald-100 text-gray-700"
                }`
              }
            >
              <FaRegHospital className="w-4 h-4" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/available-camps"
              className={({ isActive }) =>
                `flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "hover:bg-emerald-100 text-gray-700"
                }`
              }
            >
              <TbCampfire className="w-4 h-4" />
              <span>Available Camps</span>
            </NavLink>

            {/* Notification Icon */}
            {user && !organizer && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-2 hover:bg-emerald-100 rounded-full transition-colors relative"
                >
                  <IoNotificationsOutline className="w-6 h-6 text-gray-700" />
                  {notifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {notifications?.length}
                    </span>
                  )}
                </button>

                {/* Notification Panel */}
                {isNotificationOpen && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/30"
                      onClick={() => setIsNotificationOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-30">
                      <div className="p-4 border-b flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          Notifications
                        </h3>
                        <button
                          onClick={() => setIsNotificationOpen(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <IoClose className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            No new notifications
                          </div>
                        ) : (
                          notifications.map((notification, index) => (
                            <div
                              key={index}
                              className="p-4 hover:bg-gray-50 border-b last:border-b-0"
                            >
                              <p className="font-medium text-gray-900">
                                {notification.name}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                2 minutes ago
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL || avatarImg}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-emerald-200"
                />
                <RiMenu3Line className="w-5 h-5 text-gray-700" />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-30">
                  {user ? (
                    <>
                      <Link
                        to={`/dashboard/${organizer ? "admin" : "user"}-home`}
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-emerald-50 transition-colors"
                      >
                        <MdDashboard className="w-5 h-5 text-emerald-600" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={logOut}
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-emerald-50 transition-colors w-full text-left text-rose-600"
                      >
                        <IoClose className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-emerald-50 transition-colors"
                      >
                        <MdLogin className="w-5 h-5 text-emerald-600" />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-emerald-50 transition-colors"
                      >
                        <MdPersonAdd className="w-5 h-5 text-emerald-600" />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              {isOpen ? (
                <IoClose className="w-6 h-6 text-gray-700" />
              ) : (
                <RiMenu3Line className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg ${
                    isActive
                      ? "bg-emerald-500 text-white"
                      : "hover:bg-emerald-100 text-gray-700"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/available-camps"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg ${
                    isActive
                      ? "bg-emerald-500 text-white"
                      : "hover:bg-emerald-100 text-gray-700"
                  }`
                }
              >
                Available Camps
              </NavLink>
              {user ? (
                <>
                  <Link
                    to={`/dashboard/${organizer ? "admin" : "user"}-home`}
                    className="block px-3 py-2 rounded-lg hover:bg-emerald-100 text-gray-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logOut}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-lg hover:bg-emerald-100 text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-lg hover:bg-emerald-100 text-gray-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    // <div className="fixed w-full bg-white z-10 shadow-sm px-4">
    //   <div className="py-4 border-b-[1px]">
    //     <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
    //       {/* Logo */}
    //       <Link to="/">
    //         <div className="flex items-center gap-2">
    //           <img className="w-12 h-12" src={navLogo} alt="logo" />
    //           <h1 className="text-2xl font-bold text-green-500 ">Camp Med</h1>
    //         </div>
    //       </Link>
    //       <div className="flex items-center gap-8">
    //         <div>
    //           {/* Links in the center */}
    //           <ul className="hidden lg:flex space-x-3">
    //             <li>
    //               <NavLink
    //                 to="/"
    //                 className="hover:text-green-500 font-semibold ml-3"
    //               >
    //                 Home
    //               </NavLink>
    //             </li>
    //             <li>
    //               <NavLink
    //                 to="/available-camps"
    //                 className="hover:text-green-500 font-semibold"
    //               >
    //                 Available Camps
    //               </NavLink>
    //             </li>
    //             {!user && (
    //               <li>
    //                 <NavLink
    //                   to="/login"
    //                   className="hover:text-green-500 font-semibold"
    //                 >
    //                   Join Us
    //                 </NavLink>
    //               </li>
    //             )}
    //           </ul>
    //         </div>
    //         {/* Dropdown Menu */}
    //         <div className="relative">
    //           <div className="flex flex-row items-center gap-3">
    //             {!organizer && (
    //               <div>
    //                 <button
    //                   onClick={() => setIsNotificationOpen(!isNotificationOpen)}
    //                   className="text-2xl mt-2 relative"
    //                 >
    //                   <IoIosNotifications />{" "}
    //                   <span className="text-xs absolute -top-2 -right-1 font-bold text-red-500">
    //                     {notifications?.length}
    //                   </span>
    //                 </button>
    //               </div>
    //             )}

    //             {isNotificationOpen && (
    //               <>
    //                 {/* Backdrop */}
    //                 <div
    //                   className="fixed inset-0 bg-black/30"
    //                   onClick={() => setIsNotificationOpen(false)}
    //                   aria-hidden="true"
    //                 />

    //                 {/* Notification Panel */}
    //                 <div className="absolute right-0 top-2 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
    //                   <div className="p-4 border-b flex items-center justify-between">
    //                     <h3 className="text-lg font-semibold text-gray-900">
    //                       Notifications
    //                     </h3>
    //                     <button
    //                       onClick={() => setIsNotificationOpen(false)}
    //                       className="text-gray-500 hover:text-gray-700"
    //                     >
    //                       <IoIosClose className="text-2xl" />
    //                     </button>
    //                   </div>

    //                   <div className="max-h-[400px] mt-8">
    //                     {notifications.length === 0 ? (
    //                       <div className="p-4 text-center text-gray-500">
    //                         No new notifications
    //                       </div>
    //                     ) : (
    //                       <div className="divide-y">
    //                         {notifications.map((notification, index) => (
    //                           <div
    //                             key={index}
    //                             className="p-4 hover:bg-gray-50 transition-colors"
    //                           >
    //                             <div className="flex gap-4 items-start">
    //                               <div className="flex-1">
    //                                 <p className="text-sm font-medium text-gray-900">
    //                                   {notification.name}
    //                                 </p>
    //                                 <p className="text-sm text-gray-500 mt-1">
    //                                   {notification.message}
    //                                 </p>
    //                                 <p className="text-xs text-gray-400 mt-1">
    //                                   {/* {notification.time} */}2 minutes ago
    //                                 </p>
    //                               </div>
    //                               {!notification.read && (
    //                                 <span className="w-2 h-2 bg-green-500 rounded-full" />
    //                               )}
    //                             </div>
    //                           </div>
    //                         ))}
    //                       </div>
    //                     )}
    //                   </div>
    //                 </div>
    //               </>
    //             )}

    //             {/* Dropdown btn */}
    //             <div
    //               onClick={() => setIsOpen(!isOpen)}
    //               className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
    //             >
    //               <AiOutlineMenu />
    //               <div className="hidden md:block">
    //                 {/* Avatar */}
    //                 <img
    //                   className="rounded-full"
    //                   referrerPolicy="no-referrer"
    //                   src={user && user.photoURL ? user.photoURL : avatarImg}
    //                   alt="profile"
    //                   height="30"
    //                   width="30"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           {isOpen && (
    //             <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
    //               <div className="flex flex-col cursor-pointer">
    //                 <ul className="lg:hidden lg:flex lg-flex-col  space-x-6 space-y-6 mb-4 pt-4">
    //                   <li>
    //                     <NavLink
    //                       to="/"
    //                       className="hover:text-green-500 font-semibold ml-[14px]"
    //                     >
    //                       Home
    //                     </NavLink>
    //                   </li>
    //                   <li>
    //                     <NavLink
    //                       to="/available-camps"
    //                       className="hover:text-green-500 font-semibold -ml-2"
    //                     >
    //                       Available Camps
    //                     </NavLink>
    //                   </li>
    //                   <li>
    //                     <NavLink
    //                       to="/login"
    //                       className="hover:text-green-500 font-semibold -ml-2"
    //                     >
    //                       Join Us
    //                     </NavLink>
    //                   </li>
    //                 </ul>
    //                 {!user ? (
    //                   <>
    //                     <Link
    //                       to="/login"
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //                     >
    //                       Login
    //                     </Link>
    //                     <Link
    //                       to="/register"
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //                     >
    //                       Sign Up
    //                     </Link>
    //                   </>
    //                 ) : (
    //                   <>
    //                     {organizer ? (
    //                       <Link
    //                         to="/dashboard/admin-home"
    //                         className="px-4 py-3 hover:bg-neutral-100 transition font-semibold hover:text-green-500"
    //                       >
    //                         Dashboard
    //                       </Link>
    //                     ) : (
    //                       <Link
    //                         to="/dashboard/user-home"
    //                         className="px-4 py-3 hover:bg-neutral-100 transition font-semibold hover:text-green-500"
    //                       >
    //                         Dashboard
    //                       </Link>
    //                     )}
    //                     <div
    //                       onClick={logOut}
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer hover:text-green-500"
    //                     >
    //                       Logout
    //                     </div>
    //                   </>
    //                 )}

    //                 {/* {user ? (
    //                   <>
    //                     {isAdmin ? (
    //                       <Link
    //                         to="/dashboard/admin-home"
    //                         className="px-4 py-3 hover:bg-neutral-100 transition font-semibold hover:text-green-500"
    //                       >
    //                         Dashboard
    //                       </Link>
    //                     ) : (
    //                       <Link
    //                         to="/dashboard/user-home"
    //                         className="px-4 py-3 hover:bg-neutral-100 transition font-semibold hover:text-green-500"
    //                       >
    //                         Dashboard
    //                       </Link>
    //                     )}

    //                     <div
    //                       onClick={logOut}
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer hover:text-green-500"
    //                     >
    //                       Logout
    //                     </div>
    //                   </>
    //                 ) : (
    //                   <>
    //                     <Link
    //                       to="/login"
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //                     >
    //                       Login
    //                     </Link>
    //                     <Link
    //                       to="/register"
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //                     >
    //                       Sign Up
    //                     </Link>
    //                   </>
    //                 )} */}
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;
