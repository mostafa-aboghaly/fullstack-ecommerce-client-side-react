import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Products from "../components/pages/Products";
import Home from "../components/pages/Home";
import ProductPage from "../components/pages/ProductPage";
import LoginPage from "../components/pages/LoginPage";
import AppLayout from "../layout/AppLayout";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardProducts from "../components/DashboardProducts";
import AdminDashboard from "../components/pages/dashboard/AdminDashboard";
import NotFoundPage from "../components/errors/NotFoundPage.tsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:documentId" element={<ProductPage />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute redirectPath="/">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<DashboardProducts />} />
        <Route path="categories" element={<h1>hello from categories</h1>} />
      </Route>

      <Route
        path="/login"
        element={
          <ProtectedRoute isLoginPage redirectPath="/dashboard">
            <LoginPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
  {
    basename: "/fullstack-ecommerce-client-side-react",
  },
);
