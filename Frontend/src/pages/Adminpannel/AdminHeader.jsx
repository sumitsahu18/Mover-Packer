import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";
import { handleLogout } from "../../login/Logout";
import { FaBars } from "react-icons/fa";

const AdminHeader = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const adminName = localStorage.getItem("name") || "Admin";
  const storedRole = localStorage.getItem("role");
  const adminRole =
    storedRole === "admin"
      ? "Super Admin"
      : storedRole
      ? storedRole.charAt(0).toUpperCase() + storedRole.slice(1)
      : "Super Admin";

  // Close the dropdown when clicking anywhere outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToProfile = () => {
    setDropdownOpen(false);
    navigate("/admin/edit-profile");
  };

  const logoutNow = () => {
    setDropdownOpen(false);
    handleLogout();
  };

  return (
    <header className="tpHeader">
      <div className="headerLeft">
        <button className="mobileMenuBtn" onClick={onMenuClick} aria-label="Toggle menu">
          <FaBars />
        </button>

        <div className="headerTitle">
          <h2>Admin Control Room</h2>
          <p>Manage users, transporters &amp; operations</p>
        </div>

        <div className="searchBox">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search users, shipments, ID..." />
        </div>
      </div>

      <div className="headerRight">
        <button className="themeBtn" aria-label="Toggle theme">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>

        <div className="headerIcon" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>

        <div className="profileBox" ref={dropdownRef}>
          <div className="profileCard" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-1a7 7 0 0 1 14 0v1" />
            </svg>
            <div className="profileInfo">
              <h4>{adminName}</h4>
              <p>{adminRole}</p>
            </div>
          </div>

          {dropdownOpen && (
            <div className="dropdown">
              <div onClick={goToProfile}>My Profile</div>
              <div onClick={logoutNow}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;