import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import logo from "../../public/CampMedLOGO.png";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const isAdmin = true;

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
              {isAdmin ? (
                <>
                  {/* Admin Home */}
                  <div className="flex flex-col gap-6 ">
                    <NavLink>
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Organizer Profile
                      </button>
                    </NavLink>
                    <NavLink>
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Add A Camp
                      </button>
                    </NavLink>
                    <NavLink>
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Manage Camps
                      </button>
                    </NavLink>
                    <NavLink>
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Manage Registered Camps
                      </button>
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
                    <NavLink>
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Participant Profile
                      </button>
                    </NavLink>
                    <NavLink>
                      <button className="btn bg-green-500 hover:text-green-500 w-full text-white">
                        Registered Camps
                      </button>
                    </NavLink>
                    <NavLink>
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
