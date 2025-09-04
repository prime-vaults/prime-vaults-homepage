import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
      <div className="app-flex-element" />
      <Footer />
    </div>
  );
}
