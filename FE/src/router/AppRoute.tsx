import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/page/HomePage";
import { CartPage } from "@/page/cart/Cart";
import LoginPage from "@/page/login/Login";
import RegisterPage from "@/page/register/Register";
import CategoryDetailPage from "@/page/category/CategoriesDetaiPage"; // ✅ Thêm dòng này

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailPage from "@/page/products/ProductDetaiPage.tsx";

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
      { path: "/categories/:cateId", element: <CategoryDetailPage /> }, // ✅ Route mới
      { path: "/products/:productId", element: <ProductDetailPage/> },

    ],
  },
]);

const AppRoute = () => <RouterProvider router={route} />;

export default AppRoute;
