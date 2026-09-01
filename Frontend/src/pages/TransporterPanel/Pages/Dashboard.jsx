import "./../CSS/Dashboard.css";

import {
  FaBoxOpen,
  FaTruckMoving,
  FaCheckCircle,
  FaWallet,
  FaArrowUp,
  FaClock,
  FaMapMarkedAlt,
  FaStar
} from "react-icons/fa";

function TransporterDashboard() {

  return (
    <div className="tpDashboard">

      {/* Welcome */}

      <div className="welcomeCard">

        <div>

          <span className="welcomeEyebrow">
            CONTROL TOWER
          </span>

          <h1>
            Welcome Back 👋
          </h1>

          <p>
            Track shipments, manage bookings and monitor earnings — all from one place.
          </p>

        </div>

        <button>
          View Open Loads
        </button>

      </div>


      {/* Stats */}

      <div className="statsGrid">

        <div className="statCard">
          <div className="statIcon blue">
            <FaBoxOpen />
          </div>

          <h2>24</h2>

          <p>Open Loads</p>

        </div>


        <div className="statCard">

          <div className="statIcon orange">
            <FaTruckMoving />
          </div>

          <h2>12</h2>

          <p>En Route</p>

        </div>


        <div className="statCard">

          <div className="statIcon green">
            <FaCheckCircle />
          </div>

          <h2>186</h2>

          <p>Moves Completed</p>

        </div>


        <div className="statCard">

          <div className="statIcon purple">
            <FaWallet />
          </div>

          <h2>₹85k</h2>

          <p>Total Earnings</p>

        </div>

      </div>

      <div className="laneDivider"></div>


      {/* Main Section */}

      <div className="dashboardGrid">


        {/* Activity */}

        <div className="activityCard">

          <h2>
            Recent Activity
          </h2>

          <div className="activityList">

            <div className="activityItem">

              <FaBoxOpen />

              <div>
                <h4>
                  New Order Received
                </h4>

                <p>
                  5 MIN AGO
                </p>
              </div>

            </div>


            <div className="activityItem">

              <FaTruckMoving />

              <div>
                <h4>
                  Driver Assigned
                </h4>

                <p>
                  20 MIN AGO
                </p>
              </div>

            </div>


            <div className="activityItem">

              <FaCheckCircle />

              <div>
                <h4>
                  Delivery Completed
                </h4>

                <p>
                  TODAY · 10:30 AM
                </p>
              </div>

            </div>

          </div>

        </div>



        {/* Performance */}

        <div className="performanceCard">

          <h2>
            Performance
          </h2>

          <div className="performanceCircle">

            <span>
              96%
            </span>

          </div>

          <p>
            On-Time Delivery Rate
          </p>

        </div>

      </div>



      {/* Bottom Cards */}

      <div className="bottomGrid">

        <div className="earningsCard">

          <div className="cardTop">

            <h2>
              Monthly Earnings
            </h2>

            <FaArrowUp />
          </div>

          <h1>
            ₹85,500
          </h1>

          <p>
            +12% compared to last month
          </p>

        </div>



        <div className="quickInfoCard">

          <h2>
            Quick Overview
          </h2>

          <div className="quickItem">

            <FaClock />

            <span>
              Avg Response Time : 12 min
            </span>

          </div>

          <div className="quickItem">

            <FaMapMarkedAlt />

            <span>
              Active Routes : 18
            </span>

          </div>

          <div className="quickItem">

            <FaStar />

            <span>
              Rating : 4.9 / 5
            </span>

          </div>

        </div>

      </div>

      <div className="laneDivider"></div>


      {/* Orders Table */}

      <div className="ordersCard">

        <h2>
          Recent Orders
        </h2>

        <table>

          <thead>

            <tr>

              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>#ORD1021</td>

              <td>Rahul Sharma</td>

              <td>₹4,500</td>

              <td>
                <span className="status pending">
                  Pending
                </span>
              </td>

            </tr>

            <tr>

              <td>#ORD1022</td>

              <td>Amit Verma</td>

              <td>₹7,800</td>

              <td>
                <span className="status running">
                  Running
                </span>
              </td>

            </tr>

            <tr>

              <td>#ORD1023</td>

              <td>Priya Patel</td>

              <td>₹12,500</td>

              <td>
                <span className="status completed">
                  Completed
                </span>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TransporterDashboard;