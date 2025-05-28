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
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

const AppRoute = () => <RouterProvider router={route} />;

export default AppRoute;
