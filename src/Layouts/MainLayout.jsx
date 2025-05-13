import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SupportOurMission from "../Components/SupportOurMission";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="min-h-[calc(100vh-68px)] pt-5">
        <Outlet></Outlet>
      </main>
      <section>
        <SupportOurMission></SupportOurMission>
      </section>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
