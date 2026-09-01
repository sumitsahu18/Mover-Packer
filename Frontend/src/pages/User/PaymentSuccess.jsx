import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Processing payment verification...");

  const bidId = searchParams.get("bidId");
  const pid = searchParams.get("pid");
  const amount = searchParams.get("amount");
  const useremail = localStorage.getItem("email") || "";

  useEffect(() => {
    if (bidId) {
      // 1. Bid Status Ko 'accepted' Mark Karo
      axios
        .post("https://mover-packer-1.onrender.com/bid/update-status", {
          _id: bidId,
          pid: pid,
          status: "accepted"
        })
        .then(() => {
          // 2. Transaction DB Me Entry Save Karo
          return axios.post("https://mover-packer-1.onrender.com/txn/save", {
            uid: useremail,
            amt: Number(amount) || 0
          });
        })
        .then(() => {
          // 3. Payment ho chuke product ko "Add Product" list se hata do
          // (isse alag catch diya hai taaki delete fail hone par bhi
          // payment success message wrongly fail na dikhe)
          axios
            .delete("https://mover-packer-1.onrender.com/product/delete", {
              data: { _id: Number(pid) }
            })
            .catch((delErr) => {
              console.log("Product removal error:", delErr);
            });

          setStatus("Payment Successful & Booking Confirmed! 🎉");
        })
        .catch((err) => {
          console.error("Verification Error:", err);
          setStatus("Payment recorded, but status update failed.");
        });
    }
  }, [bidId, pid, amount, useremail]);

  return (
    <div style={{ padding: "80px 20px", textAlign: "center", color: "#fff" }}>
      <h2>{status}</h2>
      <button
        onClick={() => navigate("/user/Quotetion")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#2dd4bf",
          color: "#000",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Back to Quotations
      </button>
    </div>
  );
}

export default PaymentSuccess;