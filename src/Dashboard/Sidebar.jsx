import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { RiHome6Line, RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import {
  MdOutlineManageAccounts,
  MdAddBox,
  MdCampaign,
  MdPeople,
} from "react-icons/md";
import { BiAnalyse } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { TbCampfire } from "react-icons/tb";
import { BsClockHistory } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../../public/CampMedLOGO.png";
import useAdmin from "../Hooks/useAdmin";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  // const isAdmin = true;
  const [organizer] = useAdmin();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div>
      {/* Small Screen Navbar */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 flex justify-between md:hidden">
        <div className="p-2">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="w-12 h-12" />
          </NavLink>
        </div>

        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none hover:bg-emerald-100 rounded-lg transition-colors"
        >
          {isActive ? (
            <RiMenuUnfoldLine className="h-6 w-6 text-emerald-600" />
          ) : (
            <RiMenuFoldLine className="h-6 w-6 text-emerald-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-emerald-50 to-teal-50 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          {/* Logo */}
          <div className="w-full hidden md:flex px-4 py-2 rounded-xl justify-center items-center bg-white/50 backdrop-blur-sm shadow-lg mx-auto">
            <NavLink to="/" className="flex items-center space-x-2">
              <img src={logo} alt="logo" className="w-14 h-14" />
            </NavLink>
          </div>

          {/* Home Button */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 px-4 py-3 mt-6 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <RiHome6Line className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700 font-medium">Home</span>
          </NavLink>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="space-y-3">
              {organizer ? (
                <div className="flex flex-col gap-2">
                  {[
                    {
                      to: "/dashboard/organizer-profile",
                      icon: <MdOutlineManageAccounts className="w-5 h-5" />,
                      label: "Organizer Profile",
                    },
                    {
                      to: "/dashboard/add-camp",
                      icon: <MdAddBox className="w-5 h-5" />,
                      label: "Add A Camp",
                    },
                    {
                      to: "/dashboard/manage-camps",
                      icon: <MdCampaign className="w-5 h-5" />,
                      label: "Manage Camps",
                    },
                    {
                      to: "/dashboard/manage-registered-camps",
                      icon: <MdPeople className="w-5 h-5" />,
                      label: "Manage Registered",
                    },
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                            : "hover:bg-emerald-100 text-gray-700"
                        }`
                      }
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {[
                    {
                      to: "/dashboard/analytics",
                      icon: <BiAnalyse className="w-5 h-5" />,
                      label: "Analytics",
                    },
                    {
                      to: "/dashboard/participant",
                      icon: <FaRegUser className="w-5 h-5" />,
                      label: "Participant Profile",
                    },
                    {
                      to: "/dashboard/registered-camps",
                      icon: <TbCampfire className="w-5 h-5" />,
                      label: "Registered Camps",
                    },
                    {
                      to: "/dashboard/payments",
                      icon: <BsClockHistory className="w-5 h-5" />,
                      label: "Payment History",
                    },
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                            : "hover:bg-emerald-100 text-gray-700"
                        }`
                      }
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-2">
          <hr className="border-emerald-200" />
          <button
            onClick={logOut}
            className="flex w-full items-center space-x-2 px-4 py-3 mt-4 text-gray-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-colors duration-200"
          >
            <IoLogOutOutline className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
    // <div>
    //   {/* Small Screen Navbar */}
    //   <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
    //     <div>
    //       <div className="block cursor-pointer p-4 font-bold">
    //         <NavLink to="/">
    //           <img
    //             // className='hidden md:block'
    //             src={logo}
    //             alt="logo"
    //             width="100"
    //             height="100"
    //           />
    //         </NavLink>
    //       </div>
    //     </div>

    //     <button
    //       onClick={handleToggle}
    //       className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
    //     >
    //       <AiOutlineBars className="h-5 w-5" />
    //     </button>
    //   </div>

    //   {/* Sidebar */}
    //   <div
    //     className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
    //       isActive && "-translate-x-full"
    //     }  md:translate-x-0  transition duration-200 ease-in-out`}
    //   >
    //     <div>
    //       <div>
    //         <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
    //           <NavLink to="/">
    //             <img
    //               // className='hidden md:block'
    //               src={logo}
    //               alt="logo"
    //               width="100"
    //               height="100"
    //             />
    //           </NavLink>
    //         </div>
    //       </div>

    //       {/* Nav Items */}
    //       <div className="flex flex-col justify-between flex-1 mt-6">
    //         <nav className="space-y-5">
    //           {organizer ? (
    //             <>
    //               <div className="flex flex-col gap-6">
    //                 <NavLink
    //                   to="/dashboard/organizer-profile"
    //                   className={({ isActive }) =>
    //                     `btn w-full text-white ${
    //                       isActive
    //                         ? "bg-blue-500"
    //                         : "bg-green-500 hover:text-green-500"
    //                     }`
    //                   }
    //                 >
    //                   Organizer Profile
    //                 </NavLink>

    //                 <NavLink
    //                   to="/dashboard/add-camp"
    //                   className={({ isActive }) =>
    //                     `btn w-full text-white ${
    //                       isActive
    //                         ? "bg-blue-500"
    //                         : "bg-green-500 hover:text-green-500"
    //                     }`
    //                   }
    //                 >
    //                   Add A Camp
    //                 </NavLink>

    //                 <NavLink
    //                   to="/dashboard/manage-camps"
    //                   className={({ isActive }) =>
    //                     `btn w-full text-white ${
    //                       isActive
    //                         ? "bg-blue-500"
    //                         : "bg-green-500 hover:text-green-500"
    //                     }`
    //                   }
    //                 >
    //                   Manage Camps
    //                 </NavLink>

    //                 <NavLink
    //                   to="/dashboard/manage-registered-camps"
    //                   className={({ isActive }) =>
    //                     `btn w-full text-white ${
    //                       isActive
    //                         ? "bg-blue-500"
    //                         : "bg-green-500 hover:text-green-500"
    //                     }`
    //                   }
    //                 >
    //                   Manage Registered Camps
    //                 </NavLink>
    //               </div>
    //             </>
    //           ) : (
    //             <>
    //               {/* user home */}
    //               <div className="flex flex-col gap-6">
    //                 <NavLink to="/dashboard/analytics">
    //                   <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
    //                     Analytics
    //                   </button>
    //                 </NavLink>
    //                 <NavLink to="/dashboard/participant">
    //                   <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
    //                     Participant Profile
    //                   </button>
    //                 </NavLink>
    //                 <NavLink to="/dashboard/registered-camps">
    //                   <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
    //                     Registered Camps
    //                   </button>
    //                 </NavLink>
    //                 <NavLink to="/dashboard/payments">
    //                   <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
    //                     Payment History
    //                   </button>
    //                 </NavLink>
    //               </div>
    //             </>
    //           )}

    //           {/* <Outlet></Outlet> */}
    //         </nav>
    //       </div>
    //     </div>

    //     <div>
    //       <hr />

    //       {/* <MenuItem
    //         icon={FcSettings}
    //         label="Profile"
    //         address="/dashboard/profile"
    //       /> */}
    //       <button
    //         onClick={logOut}
    //         className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
    //       >
    //         <GrLogout className="w-5 h-5" />

    //         <span className="mx-4 font-medium">Logout</span>
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Sidebar;
