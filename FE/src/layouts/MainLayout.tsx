import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
          <Outlet />
        <Footer />
      </div>
    </>
  );
};
export default MainLayout;
