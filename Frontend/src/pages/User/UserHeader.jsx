import "./UserHeader.css";

import {
  FaBell,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaSearch,
  FaEnvelope,
  FaBars
} from "react-icons/fa";

import { useState } from "react";
import { handleLogout } from "../../login/Logout";

function UserHeader({ onMenuClick }) {

  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };

  return (
    <header className="userHeader">

      <div className="headerLeft">

        <button
          className="mobileMenuBtn"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>

        <div className="headerTitle">
          <h2>User Control Center</h2>
          <p>Manage bookings and shipments</p>
        </div>

        <div className="searchBox">
          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
          />
        </div>

      </div>

      <div className="headerRight">

        <div className="headerIcon">
          <FaBell />
        </div>

        <div className="headerIcon">
          <FaEnvelope />
        </div>

        <button
          className="themeBtn"
          onClick={toggleTheme}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="profileBox">

          <div
            className="profileCard"
            onClick={() =>
              setOpen(!open)
            }
          >

            <FaUserCircle
              size={40}
              color="#fff"
            />

            <div className="profileInfo">
              <h4>Sumit</h4>
              <p>ONLINE</p>
            </div>

          </div>

          {
            open && (
              <div className="dropdown">

                <div>
                  Edit Profile
                </div>

                <div>
                  Change Password
                </div>

                <div>
                  Settings
                </div>

                <div
                  onClick={handleLogout}
                >
                  Logout
                </div>

              </div>
            )
          }

        </div>

      </div>

    </header>
  );
}

export default UserHeader;