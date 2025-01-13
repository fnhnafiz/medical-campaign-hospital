import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Analytics from "../Dashboard/UserPages/Analytics";
import AdminHome from "../Dashboard/Menu/AdminHome";
import UserHome from "../Dashboard/Menu/UserHome";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      // Admin dashboard pages
      {
        path: "admin-home",
        element: <AdminHome></AdminHome>,
      },
      // // User dashboard pages
      {
        path: "user-home",
        element: <UserHome></UserHome>,
      },
      {
        path: "analytics",
        element: <Analytics></Analytics>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default Routes;
