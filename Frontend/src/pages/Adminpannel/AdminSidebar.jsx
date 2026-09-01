import { useState } from "react";
import "./AdminSidebar.css";
import { NavLink } from "react-router-dom";
import { handleLogout } from "../../login/Logout";
import {
  FaTachometerAlt,
  FaUsers,
  FaTruck,
  FaFolderPlus,
  FaSitemap,
  FaUserCog,
  FaSignOutAlt,
  FaBars,
  FaCog
} from "react-icons/fa";

function AdminSidebar({ collapsed = false, setCollapsed = () => {}, mobileOpen = false, setMobileOpen = () => {} }) {

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
            {collapsed && !mobileOpen ? "AD" : "Admin"}
          </h2>

          <button
            className="menuBtn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaBars />
          </button>

        </div>

        <nav>

          <NavLink to="/admin/dashboard" onClick={closeMobile}>
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/manage-users" onClick={closeMobile}>
            <FaUsers />
            <span>Manage Users</span>
          </NavLink>

          <NavLink to="/admin/manage-transporters" onClick={closeMobile}>
            <FaTruck />
            <span>Manage Transporters</span>
          </NavLink>

          <NavLink to="/admin/add-category" onClick={closeMobile}>
            <FaFolderPlus />
            <span>Add Category</span>
          </NavLink>

          <NavLink to="/admin/add-sub-category" onClick={closeMobile}>
            <FaSitemap />
            <span>Add Sub Category</span>
          </NavLink>

          <NavLink to="/admin/settings" onClick={closeMobile}>
            <FaCog />
            <span>Settings</span>
          </NavLink>

          <NavLink to="/admin/edit-profile" onClick={closeMobile}>
            <FaUserCog />
            <span>Edit Profile</span>
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

export default AdminSidebar;