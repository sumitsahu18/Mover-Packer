import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBoxOpen,
  FaTruckMoving,
  FaCheckCircle,
  FaWallet,
  FaArrowUp,
  FaMapMarkerAlt,
  FaFileAlt,
  FaGift,
  FaBell,
  FaPlus,
} from "react-icons/fa";

import "./Dashboard.css";
import axios from "axios";
import { __bidapiurl, __productapiurl } from "../../API_URL";

const Dashboard = () => {
  const navigate = useNavigate();

  const [bidcard, setbidcards] = useState([]);
  const [product, setproduct] = useState([]);

  // LocalStorage se login user ka email get karein
  const currentUserEmail = localStorage.getItem("email");

  // 1. Fetch Products for Current User Only
  useEffect(() => {
    axios
      .get(__productapiurl + "fetch")
      .then((response) => {
        console.log("productData raw:", response.data);
        
        // Filter: Sirf wo products jinko currentUserEmail ne add kiya hai
        const userProducts = response.data.filter(
          (item) => item.useremail === currentUserEmail
        );
        
        setproduct(userProducts);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, [currentUserEmail]);

  // 2. Fetch Bids for Current User Only
  useEffect(() => {
    axios
      .get(__bidapiurl + "fetch")
      .then((response) => {
        console.log("bidData raw:", response.data);

        // Filter: Ya toh bid me useremail store ho, ya p_useremail
        // (Jo bhi key aapke bid collection me user ko indicate karti ho)
        const userBids = response.data.filter(
          (item) =>
            item.useremail === currentUserEmail ||
            item.p_useremail === currentUserEmail
        );

        setbidcards(userBids);
      })
      .catch((error) => {
        console.log("Error fetching bids:", error);
      });
  }, [currentUserEmail]);

  // Dynamic calculations (Ab ye filtered data par hongi)
  const acceptedCount = bidcard.filter((item) => item.status === "accepted").length;
  const rejectedCount = bidcard.filter((item) => item.status === "rejected").length;
  
  // Delivered count
  const deliveredCount = bidcard.filter(
    (item) => item.status === "accepted" && item.stageIndex === 3
  ).length;

  return (
    <div className="dashboardContainer">
      {/* Welcome Section */}
      <section className="welcomeSection">
        <div>
          <h2>Welcome Back 👋</h2>
          <p>Manage your products, shipments and documents from one place.</p>
        </div>

        <button
          className="addProductBtn"
          onClick={() => navigate("/user/add-product")}
        >
          <FaPlus /> Add Product
        </button>
      </section>

      {/* Statistics */}
      <section className="statsGrid">
        <div className="statCard blue">
          <div className="statIcon">
            <FaBoxOpen />
          </div>
          <div>
            <h3>{product?.length || 0}</h3>
            <span>Total Products</span>
            <p>
              <FaArrowUp /> Total active
            </p>
          </div>
        </div>

        <div className="statCard green">
          <div className="statIcon">
            <FaTruckMoving />
          </div>
          <div>
            <h3>{acceptedCount}</h3>
            <span>Accepted Quotation</span>
            <p>
              <FaArrowUp /> Active bookings
            </p>
          </div>
        </div>

        <div className="statCard orange">
          <div className="statIcon">
            <FaCheckCircle />
          </div>
          <div>
            <h3>{deliveredCount}</h3>
            <span>Delivered</span>
            <p>
              <FaArrowUp />{" "}
              {bidcard.length > 0
                ? Math.round((deliveredCount / bidcard.length) * 100)
                : 0}
              % success
            </p>
          </div>
        </div>

        <div className="statCard purple">
          <div className="statIcon">
            <FaWallet />
          </div>
          <div>
            <h3>{rejectedCount}</h3>
            <span>Rejected Quotation</span>
            <p>By your side</p>
          </div>
        </div>
      </section>

      {/* Middle Section */}
      <section className="middleGrid">
        <div className="chartCard">
          <h3>Monthly Shipment Analytics</h3>
          <div className="chartPlaceholder">📈 Graph will come here</div>
        </div>

        <div className="statusCard">
          <h3>Shipment Status</h3>
          <ul>
            <li>
              <span className="dot greenDot"></span>
              Delivered
              <strong>
                {bidcard.length > 0
                  ? Math.round((deliveredCount / bidcard.length) * 100)
                  : 0}
                %
              </strong>
            </li>
            <li>
              <span className="dot blueDot"></span>
              In Transit
              <strong>
                {bidcard.length > 0
                  ? Math.round(
                      (bidcard.filter((i) => i.stageIndex === 2).length /
                        bidcard.length) *
                        100
                    )
                  : 0}
                %
              </strong>
            </li>
            <li>
              <span className="dot yellowDot"></span>
              Pending
              <strong>
                {bidcard.length > 0
                  ? Math.round(
                      (bidcard.filter((i) => i.stageIndex < 2).length /
                        bidcard.length) *
                        100
                    )
                  : 0}
                %
              </strong>
            </li>
          </ul>
        </div>
      </section>

      {/* Table Section */}
      <section className="tableCard">
        <div className="tableHeading">
          <h3>Recent Orders</h3>
          <button onClick={() => navigate("/user/orders")}>View All</button>
        </div>

        <div className="tableResponsive">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product / Title</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {bidcard.length > 0 ? (
                bidcard.slice(0, 5).map((item) => {
                  let stageLabel = "Pending";
                  let badgeClass = "pending";

                  if (item.stageIndex === 0) {
                    stageLabel = "Pickup Scheduled";
                    badgeClass = "pending";
                  } else if (item.stageIndex === 1) {
                    stageLabel = "Picked Up";
                    badgeClass = "transit";
                  } else if (item.stageIndex === 2) {
                    stageLabel = "In Transit";
                    badgeClass = "transit";
                  } else if (item.stageIndex === 3) {
                    stageLabel = "Delivered";
                    badgeClass = "delivered";
                  }

                  return (
                    <tr key={item._id}>
                      <td>#{String(item._id).slice(-6).toUpperCase()}</td>
                      <td>{item.p_title || "Product"}</td>
                      <td>{item.vehicle_type || "Mini Truck"}</td>
                      <td>
                        <span className={`badge ${badgeClass}`}>
                          {stageLabel}
                        </span>
                      </td>
                      <td>
                        {item.info
                          ? new Date(item.info).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No active orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Grid */}
      <section className="bottomGrid">
        <div className="quickCard">
          <h3>Quick Actions</h3>
          <button onClick={() => navigate("/user/add-product")}>
            <FaBoxOpen /> Add Product
          </button>
          <button>
            <FaTruckMoving /> Track Shipment
          </button>
          <button>
            <FaGift /> Charity
          </button>
          <button>
            <FaMapMarkerAlt /> My Address
          </button>
          <button>
            <FaFileAlt /> Upload Document
          </button>
        </div>

        <div className="notificationCard">
          <h3>
            <FaBell /> Notifications
          </h3>
          <div className="notifyItem">✅ Driver assigned successfully.</div>
          <div className="notifyItem">🚚 Shipment reached warehouse.</div>
          <div className="notifyItem">💰 Payment completed.</div>
          <div className="notifyItem">📄 Document verified.</div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;