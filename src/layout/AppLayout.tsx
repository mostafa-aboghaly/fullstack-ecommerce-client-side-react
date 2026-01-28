import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import CartDrawer from "../components/CartDrawer";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <CartDrawer />
    </>
  );
};
export default AppLayout;
