import "./../CSS/AvailableJobs.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Redirect karne ke liye Add kiya

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBoxOpen,
  FaRoute,
  FaSearch,
  FaTimes,
  FaTruck,
  FaRupeeSign,
  FaCheckCircle
} from "react-icons/fa";

function AvailableJobs() {
  const [jobs, setJobs] = useState([]);
  const [bids, setBids] = useState([]); // Transporter ki Bids store karne ke liye
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState(null);
  const [search, setSearch] = useState("");

  const [price, setPrice] = useState("");
  const [vehicle, setVehicle] = useState("Mini Truck");
  const [eta, setEta] = useState("");
  const [note, setNote] = useState("");
  const [riderName, setRiderName] = useState("");
  const [riderMobile, setRiderMobile] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [maxWeight, setMaxWeight] = useState("");

  const navigate = useNavigate(); // Navigation Hook
  const transporterEmail = localStorage.getItem("email") || "transporter@gmail.com";

  // 1. Fetch Products/Jobs AND Bids on Mount
  useEffect(() => {
    fetchJobsAndBids();
  }, []);

  const fetchJobsAndBids = async () => {
    setLoading(true);
    try {
      // Products aur Bids dono parallel fetch karenge.
      // allSettled use kiya hai taaki agar ek API fail ho (jaise empty collection),
      // toh doosri ka data bhi UI mein zaroor aaye
      const [jobsResult, bidsResult] = await Promise.allSettled([
        axios.get("https://mover-packer-1.onrender.com/product/fetch"),
        axios.get("https://mover-packer-1.onrender.com/bid/fetch")
      ]);

      if (jobsResult.status === "fulfilled" && Array.isArray(jobsResult.value.data)) {
        setJobs(jobsResult.value.data);
      } else {
        setJobs([]);
      }

      if (bidsResult.status === "fulfilled" && Array.isArray(bidsResult.value.data)) {
        // Sirf current transporter ki bids store karenge
        const myBids = bidsResult.value.data.filter(
          (b) => b.transporter_email === transporterEmail
        );
        setBids(myBids);
      } else {
        setBids([]);
      }
    } catch (err) {
      console.log("Error fetching jobs or bids:", err);
    } finally {
      setLoading(false);
    }
  };

  const openQuoteModal = (job) => {
    setActiveJob(job);
    setPrice("");
    setVehicle("Mini Truck");
    setEta("");
    setNote("");
    setRiderName("");
    setRiderMobile("");
    setVehicleNumber("");
    setMaxWeight("");
  };

  const closeQuoteModal = () => setActiveJob(null);

  // 2. Submit Quotation
  const submitQuote = (e) => {
    e.preventDefault();

    // Stripe minimum error se bachne ke liye validation Check
    if (Number(price) < 50) {
      alert("Minimum quote price ₹50 honi chahiye!");
      return;
    }

    if (!riderName || !riderMobile || !vehicleNumber || !maxWeight) {
      alert("Rider Name, Rider Mobile, Vehicle Number aur Maximum Weight bharna zaroori hai!");
      return;
    }

    const bidData = {
      pid: activeJob._id,
      p_title: activeJob.title || activeJob.pname || "Transport Requirement",
      useremail: activeJob.useremail,
      transporter_email: transporterEmail,
      bid_price: Number(price),
      vehicle_type: vehicle,
      eta: eta,
      msg: note,
      rider_name: riderName,
      rider_mobile: riderMobile,
      vehicle_number: vehicleNumber,
      max_weight: maxWeight,
      pickupLocation: activeJob.pickupLocation,
      dropLocation: activeJob.dropLocation
    };

    axios
      .post("https://mover-packer-1.onrender.com/bid/save", bidData)
      .then((res) => {
        alert("Quotation Sent Successfully! 🚀");
        fetchJobsAndBids(); // List Refresh karein
        closeQuoteModal();
      })
      .catch((err) => {
        console.log("Error submitting quote:", err);
        alert("Failed to send quotation. Please try again.");
      });
  };

  // Helper Function: Job status/Bid check karne ke liye
  const getJobBidStatus = (jobId) => {
    const matchedBid = bids.find((b) => b.pid === jobId);
    if (!matchedBid) return { isQuoted: false, status: null };
    return { isQuoted: true, status: matchedBid.status, bidId: matchedBid._id };
  };

  // Active Deliveries par navigate karne wala handler
  const handleGoToActiveDeliveries = () => {
    // Apne Router ke hisab se path set karein (e.g. /active-deliveries)
    navigate("/transporter/active-deliveries"); 
  };

  // Search Filter Logic
  const filteredJobs = jobs.filter((j) => {
    const searchString = `${j.useremail || ""} ${j.title || j.pname || ""} ${j.pickupLocation || ""} ${j.dropLocation || ""} ${j._id || ""}`.toLowerCase();
    return searchString.includes(search.toLowerCase());
  });

  return (
    <div className="jobsPage">

      {/* Header */}
      <div className="jobsHeader">
        <div>
          <span className="jobsEyebrow">OPEN REQUESTS</span>
          <h1>Available Jobs</h1>
          <p>New customer booking requests waiting for a quote.</p>
        </div>

        <div className="jobsSearch">
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

      {/* Jobs grid */}
      <div className="jobsGrid">
        {loading ? (
          <p className="loadingText">Loading available jobs...</p>
        ) : filteredJobs.map((job) => {
          const { isQuoted, status } = getJobBidStatus(job._id);

          return (
            <div className="jobCard" key={job._id}>
              <div className="jobCardTop">
                <span className="jobId">#{job._id}</span>
                <span className="jobPosted">{job.info ? new Date(job.info).toLocaleDateString() : "Recently"}</span>
              </div>

              <h3>{job.useremail ? job.useremail.split('@')[0] : "Customer"}</h3>

              <div className="jobRoute">
                <div className="routePoint">
                  <span className="dot pickup"></span>
                  <p>{job.pickupLocation || "Pickup N/A"}</p>
                </div>
                <div className="routeLine"></div>
                <div className="routePoint">
                  <span className="dot drop"></span>
                  <p>{job.dropLocation || "Drop N/A"}</p>
                </div>
              </div>

              <div className="jobMeta">
                <div className="metaItem">
                  <FaBoxOpen />
                  <span>{job.title || job.catnm || "Goods"}</span>
                </div>
                <div className="metaItem">
                  <FaCalendarAlt />
                  <span>{job.subcatnm || "Flexible"}</span>
                </div>
                <div className="metaItem">
                  <FaRoute />
                  <span>{job.distance || "Standard Route"}</span>
                </div>
              </div>

              <div className="jobCardFooter">
                <div className="jobBudget">
                  <p>Customer Base Budget</p>
                  <h4>₹{job.baseprice || job.price || "N/A"}</h4>
                </div>

                {/* DYNAMIC BUTTON LOGIC */}
                {status === "accepted" ? (
                  <button 
                    className="acceptedBtn" 
                    onClick={handleGoToActiveDeliveries}
                    style={{ backgroundColor: '#2e7d32', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <FaCheckCircle /> Accepted! Go to Deliveries →
                  </button>
                ) : isQuoted ? (
                  <button className="quotedBtn" disabled>
                    Quotation Sent
                  </button>
                ) : (
                  <button
                    className="quoteBtn"
                    onClick={() => openQuoteModal(job)}
                  >
                    Send Quotation
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {!loading && filteredJobs.length === 0 && (
          <div className="emptyState">
            <FaBoxOpen />
            <h3>No matching requests</h3>
            <p>Try a different search term or wait for new postings.</p>
          </div>
        )}
      </div>

      {/* Send Quotation Modal */}
      {activeJob && (
        <div className="modalOverlay" onClick={closeQuoteModal}>
          <div className="quoteModal" onClick={(e) => e.stopPropagation()}>
            <div className="quoteModalHeader">
              <div>
                <span className="jobId">#{activeJob._id}</span>
                <h2>Quote for {activeJob.useremail ? activeJob.useremail.split('@')[0] : "Customer"}</h2>
              </div>
              <button className="closeBtn" onClick={closeQuoteModal}>
                <FaTimes />
              </button>
            </div>

            <div className="quoteRouteChip">
              <FaMapMarkerAlt />
              <span>{activeJob.pickupLocation} → {activeJob.dropLocation}</span>
            </div>

            <form onSubmit={submitQuote}>
              <label>Your Price</label>
              <div className="inputWithIcon">
                <FaRupeeSign />
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <label>Vehicle Type</label>
              <div className="inputWithIcon">
                <FaTruck />
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                >
                  <option>Mini Truck</option>
                  <option>Tempo (14 ft)</option>
                  <option>Container Truck</option>
                  <option>Pickup Van</option>
                </select>
              </div>

              <label>Vehicle Number</label>
              <div className="inputWithIcon">
                <FaTruck />
                <input
                  type="text"
                  placeholder="e.g. MP04 AB 4521"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  required
                />
              </div>

              <label>Maximum Weight Capacity</label>
              <div className="inputWithIcon">
                <FaBoxOpen />
                <input
                  type="text"
                  placeholder="e.g. 500 kg"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                  required
                />
              </div>

              <label>Rider Name</label>
              <div className="inputWithIcon">
                <FaTruck />
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={riderName}
                  onChange={(e) => setRiderName(e.target.value)}
                  required
                />
              </div>

              <label>Rider Mobile Number</label>
              <div className="inputWithIcon">
                <FaTruck />
                <input
                  type="text"
                  placeholder="e.g. 9876543210"
                  value={riderMobile}
                  onChange={(e) => setRiderMobile(e.target.value)}
                  required
                />
              </div>

              <label>Estimated Pickup Date</label>
              <div className="inputWithIcon">
                <FaCalendarAlt />
                <input
                  type="date"
                  value={eta}
                  onChange={(e) => setEta(e.target.value)}
                  required
                />
              </div>

              <label>Note to Customer (optional)</label>
              <textarea
                rows="3"
                placeholder="Packing included, 2 helpers, insured transit..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <button type="submit" className="submitQuoteBtn">
                Send Quotation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailableJobs;