import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/page/HomePage";
import { CartPage } from "@/page/cart/Cart";
import LoginPage from "@/page/login/Login";
import RegisterPage from "@/page/register/Register";
import CategoryDetailPage from "@/page/category/CategoriesDetaiPage"; // ✅ Thêm dòng này

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailPage from "@/page/products/ProductDetaiPage.tsx";
import OAuth2RedirectHandler from "@/page/login/OAuth2RedirectHandler";
import OrderPage from "@/page/order/CheckoutPage";
import AdminPage from "@/page/admin/PageAdmin";
import VerifyPage from "@/page/register/Verify";
import UploadAvatarForm from "@/components/layout/Header/Profile";
import SearchResultPage from "@/page/products/components/SearchPage";
import OrdersUser from "@/page/order/OrdersUser";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/homepage", element: <HomePage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/verify", element: <VerifyPage /> },
      { path: "/categories/:cateId", element: <CategoryDetailPage /> }, // ✅ Route mới
      { path: "/products/:productId", element: <ProductDetailPage /> },
      { path: "/oauth2-redirect", element: <OAuth2RedirectHandler /> },
      { path: "/create-order", element: <OrderPage /> },
      { path: "/profile", element: <UploadAvatarForm /> },
       { path: "/search", element: <SearchResultPage /> },
       {path: "/orders/me", element: <OrdersUser />}, // Thêm route cho trang đơn hàng của người dùng
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

const AppRoute = () => <RouterProvider router={route} />;

export default AppRoute;
