import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SupportOurMission from "../Components/SupportOurMission";
import EmergencyHotline from "../Components/EmergencyHotline";

const MainLayout = () => {
  return (
    <div className="">
      <header>
        <Navbar></Navbar>
      </header>
      <main className="min-h-[calc(100vh-68px)] pt-5 container mx-auto">
        <Outlet></Outlet>
      </main>
      <section>
        <EmergencyHotline />
        <SupportOurMission></SupportOurMission>
      </section>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
