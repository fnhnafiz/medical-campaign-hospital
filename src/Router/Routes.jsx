import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Analytics from "../Dashboard/UserPages/Analytics";
import AdminHome from "../Dashboard/Menu/AdminHome";
import UserHome from "../Dashboard/Menu/UserHome";
import AvailableCampaigns from "../Pages/AvailableCampaigns";
import OrganizerProfile from "../Dashboard/Admin/OrganizerProfile";
import ManageCamp from "../Dashboard/Admin/ManageCamp";
import ManageRegisterCamp from "../Dashboard/Admin/ManageRegisterCamp";
import AdminRoutes from "../Secure/AdminRoutes";
import PrivateRoutes from "../Secure/PrivateRoutes";
import AddCamp from "../Dashboard/Admin/AddCamp";
import ParticipantProfile from "../Dashboard/UserPages/ParticipantProfile";
import RegisterCamps from "../Dashboard/UserPages/RegisterCamps";
import PaymentHistory from "../Dashboard/UserPages/PaymentHistory";
import UpdatedCampaign from "../Dashboard/AdminPages/UpdatedCampaign";
import CampaingDetails from "../Components/CampaingDetails";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-camps",
        element: <AvailableCampaigns></AvailableCampaigns>,
      },
      {
        path: "/campaign-details/:id",
        element: <CampaingDetails></CampaingDetails>,
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
        element: (
          <AdminRoutes>
            <PrivateRoutes>
              <AdminHome></AdminHome>
            </PrivateRoutes>
          </AdminRoutes>
        ),
      },
      {
        path: "add-camp",
        element: (
          <AdminRoutes>
            <PrivateRoutes>
              <AddCamp></AddCamp>
            </PrivateRoutes>
          </AdminRoutes>
        ),
      },
      {
        path: "organizer-profile",
        element: (
          <AdminRoutes>
            <OrganizerProfile></OrganizerProfile>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-camps",
        element: (
          <AdminRoutes>
            <ManageCamp></ManageCamp>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-registered-camps",
        element: (
          <AdminRoutes>
            <ManageRegisterCamp></ManageRegisterCamp>
          </AdminRoutes>
        ),
      },
      {
        path: "update-camp/:id",
        element: (
          <AdminRoutes>
            <UpdatedCampaign></UpdatedCampaign>
          </AdminRoutes>
        ),
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
      {
        path: "participant",
        element: <ParticipantProfile></ParticipantProfile>,
      },
      {
        path: "registered-camps",
        element: <RegisterCamps></RegisterCamps>,
      },
      {
        path: "payments",
        element: <PaymentHistory></PaymentHistory>,
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
