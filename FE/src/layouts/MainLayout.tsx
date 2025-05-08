import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet } from "@tanstack/react-router";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
export default MainLayout;
