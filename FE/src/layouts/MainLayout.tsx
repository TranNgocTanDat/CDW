import Footer from "@/components/layout/Footer";
import Header1 from "@/components/layout/Header";
import { CartProvider } from "@/page/cart/components/cart-context";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <CartProvider>
        <Header1 />
          <Outlet />
        <Footer />
        </CartProvider>
      </div>
    </>
  );
};
export default MainLayout;
