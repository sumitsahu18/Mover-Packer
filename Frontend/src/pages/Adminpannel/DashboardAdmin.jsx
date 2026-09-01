import "./DashboardAdmin.css";

import {
  FaUsers,
  FaBoxOpen,
  FaLayerGroup,
  FaTruck,
  FaUserPlus,
  FaClipboardCheck,
  FaUserEdit,
  FaArrowUp,
  FaChartPie,
  FaShieldAlt
} from "react-icons/fa";

function DashboardAdmin() {
  return (
    <div className="adDashboard">

      {/* Welcome Banner */}

      <div className="welcomeCard">

        <div>
          <span className="welcomeEyebrow">ADMIN CONTROL PANEL</span>

          <h1>Welcome Admin 👋</h1>

          <p>
            Manage users, categories, products and transport bookings
            from one place.
          </p>
        </div>

        <button>Manage Users</button>

      </div>

      {/* Stats */}

      <div className="statsGrid">

        <div className="statCard">
          <div className="statIcon blue">
            <FaUsers />
          </div>
          <h2>150</h2>
          <p>Total Users</p>
        </div>

        <div className="statCard">
          <div className="statIcon orange">
            <FaBoxOpen />
          </div>
          <h2>85</h2>
          <p>Total Products</p>
        </div>

        <div className="statCard">
          <div className="statIcon green">
            <FaLayerGroup />
          </div>
          <h2>12</h2>
          <p>Categories</p>
        </div>

        <div className="statCard">
          <div className="statIcon purple">
            <FaTruck />
          </div>
          <h2>43</h2>
          <p>Bookings</p>
        </div>

      </div>

      <div className="laneDivider"></div>

      {/* Main Section */}

      <div className="dashboardGrid">

        {/* Activity */}

        <div className="activityCard">

          <h2>Recent Activities</h2>

          <div className="activityList">

            <div className="activityItem">
              <FaUserPlus />
              <div>
                <h4>Rahul Sharma — Added New Product</h4>
                <p>20 JUL 2026</p>
              </div>
              <span className="status completed">Completed</span>
            </div>

            <div className="activityItem">
              <FaClipboardCheck />
              <div>
                <h4>Amit Verma — Created Booking</h4>
                <p>20 JUL 2026</p>
              </div>
              <span className="status pending">Pending</span>
            </div>

            <div className="activityItem">
              <FaUserEdit />
              <div>
                <h4>Priya Patel — Updated Profile</h4>
                <p>19 JUL 2026</p>
              </div>
              <span className="status completed">Completed</span>
            </div>

          </div>

        </div>

        {/* Performance */}

        <div className="performanceCard">

          <h2>Platform Health</h2>

          <div className="performanceCircle">
            <span>96%</span>
          </div>

          <p>Overall Uptime</p>

        </div>

      </div>

    </div>
  );
}

export default DashboardAdmin;