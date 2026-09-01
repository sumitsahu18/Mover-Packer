import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar";
import UserHeader from "./UserHeader";
import useBlockBackNavigation from "../../Components/useBlockBackNavigation";

function UserPanel() {

  useBlockBackNavigation();

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
      style={{
        "--sidebar-w": isMobile ? "0px" : (collapsed ? "90px" : "280px"),
        minHeight: "100vh",
        background: "#0B1220"
      }}
    >
      <UserSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <UserHeader onMenuClick={() => setMobileOpen((v) => !v)} />

      <div
        style={{
          marginLeft: "var(--sidebar-w)",
          marginTop: "80px",
          padding: "25px",
          transition: "margin-left .3s ease"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default UserPanel;