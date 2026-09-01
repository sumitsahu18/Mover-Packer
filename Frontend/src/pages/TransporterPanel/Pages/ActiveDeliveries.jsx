import "./../CSS/ActiveDeliveries.css";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBoxOpen,
  FaTruck,
  FaSearch,
  FaCheckCircle,
  FaCheck
} from "react-icons/fa";

const STAGES = [
  "Pickup Scheduled",
  "Picked Up",
  "In Transit",
  "Delivered"
];

function ActiveDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const transporterEmail = localStorage.getItem("email") || "";

  // 1. Fetch Active Deliveries from MongoDB
  useEffect(() => {
    fetchActiveDeliveries();
  }, []);

  const fetchActiveDeliveries = () => {
    setLoading(true);
    axios
      .get(`https://mover-packer-1.onrender.com/bid/active-deliveries?transporterEmail=${transporterEmail}`)
      .then((res) => {
        // Map backend fields to UI fields
        const formattedData = res.data.map((item) => ({
          id: item._id,
          customerName: item.useremail || "Customer",
          phone: item.userphone || item.phone || "+91 9876543210",
          pickup: item.pickup || item.p_title || "Pickup Location",
          drop: item.drop || "Drop Location",
          date: item.date || "Today",
          itemType: item.itemType || item.p_title || "Household Goods",
          distance: item.distance || "N/A",
          amount: `₹${item.bid_price}`,
          vehicle: item.vehicle_type || "Transport Truck",
          stageIndex: item.stageIndex || 0
        }));

        setDeliveries(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching deliveries:", err);
        setLoading(false);
      });
  };

  // 2. Advance Stage in Backend & State
  const advanceStage = (id) => {
    const currentDelivery = deliveries.find((d) => d.id === id);
    if (!currentDelivery || currentDelivery.stageIndex >= STAGES.length - 1) return;

    const nextStage = currentDelivery.stageIndex + 1;

    // Optimistic UI Update (Pehle UI update, fir Backend API)
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, stageIndex: nextStage } : d))
    );

    // Call Backend API to Save Progress
    axios
      .patch("https://mover-packer-1.onrender.com/bid/update-stage", {
        bidId: id,
        stageIndex: nextStage
      })
      .catch((err) => {
        console.error("Failed to update stage in database:", err);
        // Rollback on error
        fetchActiveDeliveries();
      });
  };

  const filtered = deliveries.filter((d) =>
    (d.customerName + d.pickup + d.drop + d.id)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="deliveriesPage">

      {/* Header */}
      <div className="deliveriesHeader">
        <div>
          <span className="deliveriesEyebrow">PAID &amp; CONFIRMED</span>
          <h1>Active Deliveries</h1>
          <p>Bookings where your quotation was accepted and payment is confirmed.</p>
        </div>

        <div className="deliveriesSearch">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by customer, city or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="laneDivider"></div>

      {/* Deliveries list */}
      <div className="deliveriesList">
        {loading ? (
          <div className="emptyState">
            <h3>Loading Active Orders...</h3>
          </div>
        ) : (
          filtered.map((d) => (
            <div className="deliveryCard" key={d.id}>

              <div className="deliveryTopRow">
                <div className="deliveryCustomer">
                 <span className="jobId">#{String(d.id).slice(-6).toUpperCase()}</span>
                  <h3>{d.customerName}</h3>
                </div>

                <div className="paidBadge">
                  <FaCheckCircle />
                  Paid · {d.amount}
                </div>
              </div>

              <div className="deliveryRoute">
                <div className="routePoint">
                  <span className="dot pickup"></span>
                  <p>{d.pickup}</p>
                </div>
                <div className="routeLine"></div>
                <div className="routePoint">
                  <span className="dot drop"></span>
                  <p>{d.drop}</p>
                </div>
              </div>

              <div className="deliveryMeta">
                <div className="metaItem">
                  <FaBoxOpen />
                  <span>{d.itemType}</span>
                </div>

                <div className="metaItem">
                  <FaCalendarAlt />
                  <span>{d.date}</span>
                </div>

                <div className="metaItem">
                  <FaTruck />
                  <span>{d.vehicle}</span>
                </div>

                <div className="metaItem">
                  <FaMapMarkerAlt />
                  <span>{d.distance}</span>
                </div>

                <a className="metaItem callChip" href={`tel:${d.phone}`}>
                  <FaPhoneAlt />
                  <span>{d.phone}</span>
                </a>
              </div>

              {/* Stage tracker */}
              <div className="stageTracker">
                {STAGES.map((stage, i) => (
                  <div
                    className={
                      "stageStep" +
                      (i < d.stageIndex ? " done" : "") +
                      (i === d.stageIndex ? " current" : "")
                    }
                    key={stage}
                  >
                    <span className="stageDot">
                      {i < d.stageIndex ? <FaCheck /> : i + 1}
                    </span>
                    <p>{stage}</p>
                    {i < STAGES.length - 1 && <span className="stageConnector"></span>}
                  </div>
                ))}
              </div>

              <div className="deliveryFooter">
                {d.stageIndex < STAGES.length - 1 ? (
                  <button
                    className="advanceBtn"
                    onClick={() => advanceStage(d.id)}
                  >
                    Mark as "{STAGES[d.stageIndex + 1]}"
                  </button>
                ) : (
                  <span className="deliveredTag">
                    <FaCheckCircle /> Delivered
                  </span>
                )}
              </div>

            </div>
          ))
        )}

        {!loading && filtered.length === 0 && (
          <div className="emptyState">
            <FaTruck />
            <h3>No active deliveries</h3>
            <p>Accepted &amp; paid bookings will show up here.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default ActiveDeliveries;