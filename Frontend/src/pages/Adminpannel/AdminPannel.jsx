import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader";
// import "./AdminPanel.css";
import "./AdminPannel.css"
import useBlockBackNavigation from "../../Components/useBlockBackNavigation";

export const AdminPannel = () => {

  useBlockBackNavigation();

  // Sidebar collapsed/expanded state — lifted here so both the sidebar
  // (toggle button) and the layout (content margin / header offset)
  // can react to it via the --sidebar-w CSS variable below.
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="tpAdminWrapper"
      style={{ "--sidebar-w": isMobile ? "0px" : (collapsed ? "84px" : "280px") }}
    >
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <AdminHeader onMenuClick={() => setMobileOpen((v) => !v)} />
      <main className="tpAdminContent">
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPannel;