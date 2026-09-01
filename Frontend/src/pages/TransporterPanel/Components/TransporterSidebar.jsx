import { useState } from "react";
import "./../CSS/TransporterSidebar.css";
import { NavLink } from "react-router-dom";
import { handleLogout } from "../../../login/Logout";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTruckMoving,
  FaClipboardList,
  FaWallet,
  FaTruck,
  FaFileAlt,
  FaStar,
  FaUser,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

function TransporterSidebar({ collapsed, setCollapsed, mobileOpen = false, setMobileOpen = () => {} }) {

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
    {mobileOpen && (
      <div className="sidebarOverlay" onClick={closeMobile}></div>
    )}

    <div
      className={
        (collapsed && !mobileOpen ? "tpSidebar collapsed" : "tpSidebar") +
        (mobileOpen ? " mobileOpen" : "")
      }
    >

      <div className="sidebarTop">

        <h2>
          {collapsed && !mobileOpen ? "TP" : "Transporter"}
        </h2>

        <button
          className="menuBtn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </button>

      </div>

      <nav>

        <NavLink to="/transporter" onClick={closeMobile}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/transporter/available-jobs" onClick={closeMobile}>
          <FaBoxOpen />
          <span>Available Jobs</span>
        </NavLink>

        <NavLink to="/transporter/active-deliveries" onClick={closeMobile}>
          <FaTruckMoving />
          <span>Active Deliveries</span>
        </NavLink>

        <NavLink to="/transporter/my-bookings" onClick={closeMobile}>
          <FaClipboardList />
          <span>My Bookings</span>
        </NavLink>

        <NavLink to="/transporter/earnings" onClick={closeMobile}>
          <FaWallet />
          <span>Earnings</span>
        </NavLink>

        <NavLink to="/transporter/vehicle-management" onClick={closeMobile}>
          <FaTruck />
          <span>Vehicle</span>
        </NavLink>

        <NavLink to="/transporter/documents" onClick={closeMobile}>
          <FaFileAlt />
          <span>Documents</span>
        </NavLink>

        <NavLink to="/transporter/reviews" onClick={closeMobile}>
          <FaStar />
          <span>Reviews</span>
        </NavLink>

        <NavLink to="/transporter/profile" onClick={closeMobile}>
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <button
          className="logoutBtn"
          onClick={() => setShowLogoutModal(true)}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </nav>

    </div>

    {showLogoutModal && (
      <div
        className="logoutOverlay"
        onClick={() => setShowLogoutModal(false)}
      >
        <div
          className="logoutModal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="logoutIcon">
            🚪
          </div>

          <h2>Logout</h2>

          <p>
            Are you sure you want to logout?
          </p>

          <div className="logoutButtons">

            <button
              className="cancelLogout"
              onClick={() => setShowLogoutModal(false)}
            >
              No
            </button>

            <button
              className="confirmLogout"
              onClick={() => {
                setShowLogoutModal(false);
                handleLogout();
              }}
            >
              Yes Logout
            </button>

          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default TransporterSidebar;