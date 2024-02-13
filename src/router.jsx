import { createBrowserRouter } from "react-router-dom";
import {
  SignUp,
  Login,
  AddProduct,
  HomePage,
  ProductDetails,
} from "./pages/index";
import App from "./App";
import ErrorPage from "./pages/Error/ErrorPage";
import IsAuthenticated, { IsNotAuthenticated } from "./utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "sell_product",
        element: (
          <IsAuthenticated>
            <AddProduct />
          </IsAuthenticated>
        ),
      },
      {
        path: "product_details",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/signUp",
    element: (
      <IsNotAuthenticated>
        <SignUp />
      </IsNotAuthenticated>
    ),
  },
  {
    path: "/login",
    element: (
      <IsNotAuthenticated>
        <Login />
      </IsNotAuthenticated>
    ),
  },
]);

export default router;
