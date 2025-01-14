import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
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
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <NavLink to="/">
              <img
                // className='hidden md:block'
                src={logo}
                alt="logo"
                width="100"
                height="100"
              />
            </NavLink>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
              <NavLink to="/">
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt="logo"
                  width="100"
                  height="100"
                />
              </NavLink>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="space-y-5">
              {organizer ? (
                <>
                  <div className="flex flex-col gap-6">
                    <NavLink
                      to="/dashboard/organizer-profile"
                      className={({ isActive }) =>
                        `btn w-full text-white ${
                          isActive
                            ? "bg-blue-500"
                            : "bg-green-500 hover:text-green-500"
                        }`
                      }
                    >
                      Organizer Profile
                    </NavLink>

                    <NavLink
                      to="/dashboard/add-camp"
                      className={({ isActive }) =>
                        `btn w-full text-white ${
                          isActive
                            ? "bg-blue-500"
                            : "bg-green-500 hover:text-green-500"
                        }`
                      }
                    >
                      Add A Camp
                    </NavLink>

                    <NavLink
                      to="/dashboard/manage-camps"
                      className={({ isActive }) =>
                        `btn w-full text-white ${
                          isActive
                            ? "bg-blue-500"
                            : "bg-green-500 hover:text-green-500"
                        }`
                      }
                    >
                      Manage Camps
                    </NavLink>

                    <NavLink
                      to="/dashboard/manage-registered-camps"
                      className={({ isActive }) =>
                        `btn w-full text-white ${
                          isActive
                            ? "bg-blue-500"
                            : "bg-green-500 hover:text-green-500"
                        }`
                      }
                    >
                      Manage Registered Camps
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  {/* user home */}
                  <div className="flex flex-col gap-6">
                    <NavLink to="/dashboard/analytics">
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Analytics
                      </button>
                    </NavLink>
                    <NavLink to="/dashboard/participant">
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Participant Profile
                      </button>
                    </NavLink>
                    <NavLink to="/dashboard/registered-camps">
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Registered Camps
                      </button>
                    </NavLink>
                    <NavLink to="/dashboard/payments">
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Payment History
                      </button>
                    </NavLink>
                  </div>
                </>
              )}

              {/* <Outlet></Outlet> */}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          /> */}
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
