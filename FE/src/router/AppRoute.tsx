
// src/route/AppRoute.tsx

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/page/HomePage";
import { CartPage } from "@/page/cart/Cart";
import LoginPage from "@/page/login/Login";
import RegisterPage from "@/page/register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <RegisterPage /> },
    //   { path: "/product", element: <Product /> },
    //   { path: "/about", element: <About /> },
    //   { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/login", element: <LoginPage /> },

    //   { path: "/checkout", element: <CheckoutPage /> },
      { path: "/homepage", element: <HomePage /> },
    //   { path: "/successPayment", element: <PaymentSuccessPage /> }, // Route for payment success

      // Thêm route cho trang chi tiết sản phẩm
    //   { path: "/product-detail/:productId", element: <ProductDetail /> },

      { path: "/register", element: <RegisterPage /> },
      

    ],
  },
//   {
//     path: "/admin",
//     element: <PageAdmin />,
//     children: [
//       {path: "/admin", element: <Dashboard />},
//       {path: "/admin/customer", element: <Product />},
//     ],
//   }
]);

const AppRoute = () => <RouterProvider router={route} />;

export default AppRoute;
