import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

// Removed Header from Layout since it's now global in App.tsx
const Layout: React.FC = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
