import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTruck,
  FaRupeeSign,
  FaCalendarAlt,
  FaCheck,
  FaCreditCard,
  FaUser,
  FaWeightHanging,
  FaMapMarkerAlt,
  FaIdCard,
  FaPhoneAlt
} from "react-icons/fa";
import "./UserQuotes.css";

function UserQuotes() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    fetchUserBids();
  }, []);

  const fetchUserBids = () => {
    setLoading(true);
    axios
      .get("https://mover-packer-1.onrender.com/bid/fetch")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const userSpecificBids = userEmail 
            ? res.data.filter((b) => b.useremail === userEmail)
            : res.data;

          // Declined quotations turant list se hata denge, permanently
          const visibleBids = userSpecificBids.filter((b) => b.status !== "rejected");

          setBids(visibleBids);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching bids:", err);
        setBids([]);
        setLoading(false);
      });
  };

  // Accept Quote and trigger Payment Flow
  const handleAcceptAndPay = (bid) => {
  axios
    .post("https://mover-packer-1.onrender.com/payment", {
      amount: bid.bid_price,
      bidId: bid._id,
      pid: bid.pid,
      p_title: bid.p_title,
      useremail: bid.useremail,
      transporter_email: bid.transporter_email
    })
    .then((res) => {
      if (res.data.url) {
        // Direct Stripe Checkout Page Redirect
        window.location.href = res.data.url;
      } else {
        alert("Payment URL generate nahi ho paaya.");
      }
    })
    .catch((err) => {
      console.log("Payment Error:", err);
      alert("Stripe server error! Check console.");
    });
};

  const handleDecline = (bidId) => {
    axios
      .post("https://mover-packer-1.onrender.com/bid/update-status", {
        bidId: bidId,
        status: "rejected"
      })
      .then(() => {
        alert("Quotation declined.");
        // Declined quotation card ko turant list se hata do
        setBids((prev) => prev.filter((b) => b._id !== bidId));
      })
      .catch((err) => {
        console.log("Decline Error:", err);
        // Backend fail hone par bhi UI se turant hata denge
        setBids((prev) => prev.filter((b) => b._id !== bidId));
      });
  };

  return (
    <div className="userQuotesContainer">
      <h2>Transporter Quotations Received</h2>

      {loading ? (
        <p className="loadingText">Loading received quotations...</p>
      ) : bids.length === 0 ? (
        <div className="noQuotes">
          <p>No transporter has quoted on your requests yet.</p>
        </div>
      ) : (
        <div className="quotesList">
          {bids.map((bid) => (
            <div className={`quoteCard ${bid.status || "pending"}`} key={bid._id}>
              <div className="quoteHeader">
                <div>
                  <span className="transporterLabel">TRANSPORTER</span>
                  <h3 className="quoteTitle">{bid.p_title || "Requirement Request"}</h3>
                  <p className="jobTitleRef">From: {bid.transporter_email ? bid.transporter_email.split("@")[0] : "Transporter"}</p>
                </div>
                <div className="quotePrice">
                  <FaRupeeSign />
                  <span>{bid.bid_price}</span>
                </div>
              </div>

              <div className="quoteDetails">
                <div className="detailChip">
                  <FaUser />
                  <span>Rider: {bid.rider_name || "N/A"}</span>
                </div>
                <div className="detailChip">
                  <FaTruck />
                  <span>{bid.vehicle_type || "Mini Truck"}</span>
                </div>
                <div className="detailChip">
                  <FaWeightHanging />
                  <span>Max Weight: {bid.max_weight || "N/A"}</span>
                </div>
                <div className="detailChip">
                  <FaCalendarAlt />
                  <span>ETA: {bid.eta || "As scheduled"}</span>
                </div>
              </div>

              <div className="quoteRoute">
                <div className="routeItem">
                  <FaMapMarkerAlt className="pickupIcon" />
                  <span>Pickup: {bid.pickupLocation || "N/A"}</span>
                </div>
                <div className="routeItem">
                  <FaMapMarkerAlt className="dropIcon" />
                  <span>Drop: {bid.dropLocation || "N/A"}</span>
                </div>
              </div>

              {bid.msg && <p className="quoteNote">"{bid.msg}"</p>}

              {bid.status === "accepted" && (
                <div className="revealBox">
                  <div className="detailChip revealChip">
                    <FaIdCard />
                    <span>Vehicle No: {bid.vehicle_number || "N/A"}</span>
                  </div>
                  <div className="detailChip revealChip">
                    <FaPhoneAlt />
                    <span>Rider Mobile: {bid.rider_mobile || "N/A"}</span>
                  </div>
                </div>
              )}

              <div className="quoteActions">
                {bid.status === "accepted" ? (
                  <span className="statusTag acceptedTag">
                    <FaCheck /> Booking Confirmed & Paid
                  </span>
                ) : (
                  <>
                    <button
                      className="acceptBtn"
                      onClick={() => handleAcceptAndPay(bid)}
                    >
                      <FaCreditCard style={{ marginRight: '6px' }} />
                      Accept Quote & Pay
                    </button>
                    <button
                      className="rejectBtn"
                      onClick={() => handleDecline(bid._id)}
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserQuotes;