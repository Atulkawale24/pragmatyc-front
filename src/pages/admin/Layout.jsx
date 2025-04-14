import React from "react";
import SideNav from "../../common-components/SideNav";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import MobileMenu from "../../common-components/MobileMenu";

const Layout = () => {
  const toggleState = useSelector((state) => state?.showMobileMenu?.state);
  return (
    <div
      className="bg-[#F7F7FD] p-2"
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <div className="flex gap-2 h-[100%]">
        {toggleState &&
          <MobileMenu />
        }
        <SideNav />
        <div className="w-[80%] route_view">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
