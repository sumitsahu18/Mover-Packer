import { useState } from "react";
import { NavLink } from "react-router-dom";
import { handleLogout } from "../../login/Logout";
import "./UserSidebar.css";

import {
  FaTachometerAlt,
  FaPlusCircle,
  FaMoneyBillWave,
  FaSearch,
  FaTruckMoving,
  FaMapMarkerAlt,
  FaFileAlt,
  FaUserCog,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

function UserSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const closeMobile = () => setMobileOpen && setMobileOpen(false);

  return (
    <>
      {mobileOpen && (
        <div className="sidebarOverlay" onClick={closeMobile}></div>
      )}

      <div
        className={
          (collapsed && !mobileOpen ? "userSidebar collapsed" : "userSidebar") +
          (mobileOpen ? " mobileOpen" : "")
        }
      >
        <div className="sidebarTop">

          <h2>
            {collapsed && !mobileOpen ? "UP" : "User Panel"}
          </h2>

          <button
            className="menuBtn"
            onClick={() =>
              setCollapsed(!collapsed)
            }
          >
            <FaBars />
          </button>

        </div>

        <nav>

          <NavLink to="/user/dashboard" onClick={closeMobile}>
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/user/add-product" onClick={closeMobile}>
            <FaPlusCircle />
            <span>Add Product</span>
          </NavLink>

            <NavLink to="/user/Quotetion" onClick={closeMobile}>
            <FaUserCog />
            <span>Quatation</span>
          </NavLink>


          <NavLink to="/user/create-bid" onClick={closeMobile}>
            <FaMoneyBillWave />
            <span>Create Bid</span>
          </NavLink>

          <NavLink to="/user/search-product" onClick={closeMobile}>
            <FaSearch />
            <span>Search Product</span>
          </NavLink>

          <NavLink to="/user/track-shipment" onClick={closeMobile}>
            <FaTruckMoving />
            <span>Track Shipment</span>
          </NavLink>

          <NavLink to="/user/my-address" onClick={closeMobile}>
            <FaMapMarkerAlt />
            <span>My Address</span>
          </NavLink>

          <NavLink to="/user/document" onClick={closeMobile}>
            <FaFileAlt />
            <span>Document</span>
          </NavLink>

          <NavLink to="/user/profile-settings" onClick={closeMobile}>
            <FaUserCog />
            <span>Profile Settings</span>
          </NavLink>

          <button
            className="logoutBtn"
            onClick={() =>
              setShowLogoutModal(true)
            }
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </nav>
      </div>

      {showLogoutModal && (
        <div
          className="logoutOverlay"
          onClick={() =>
            setShowLogoutModal(false)
          }
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
                onClick={() =>
                  setShowLogoutModal(false)
                }
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

export default UserSidebar;