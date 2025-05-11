import Footer from "@/components/layout/Footer";
import Header1 from "@/components/layout/Header";
import { Outlet } from "@tanstack/react-router";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header1 />
          <Outlet />
        <Footer />
      </div>
    </>
  );
};
export default MainLayout;
