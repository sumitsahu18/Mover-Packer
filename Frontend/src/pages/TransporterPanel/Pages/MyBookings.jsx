import "./../CSS/MyBookings.css";
import { useState } from "react";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaEye
} from "react-icons/fa";

// TODO(backend): replace with GET /api/transporter/bookings
// (full history — every quote this transporter has ever sent)
const dummyBookings = [
  { id: "BOK1093", customer: "Amit Verma", pickup: "Arera Colony, Bhopal", drop: "MP Nagar, Bhopal", date: "23 Jul 2026", amount: "₹4,500", status: "active" },
  { id: "BOK1092", customer: "Sneha Iyer", pickup: "New Market, Bhopal", drop: "Hiran Magri, Udaipur", date: "24 Jul 2026", amount: "₹18,000", status: "active" },
  { id: "BOK1091", customer: "Rahul Sharma", pickup: "Kolar Road, Bhopal", drop: "Vijay Nagar, Indore", date: "28 Jul 2026", amount: "₹10,500", status: "active" },
  { id: "REQ2042", customer: "Priya Patel", pickup: "Shahpura, Bhopal", drop: "Civil Lines, Jabalpur", date: "30 Jul 2026", amount: "₹8,500", status: "quoted" },
  { id: "BOK1075", customer: "Karan Mehta", pickup: "TT Nagar, Bhopal", drop: "Sector 5, Gurugram", date: "12 Jul 2026", amount: "₹22,000", status: "completed" },
  { id: "BOK1064", customer: "Neha Joshi", pickup: "Habibganj, Bhopal", drop: "Vastrapur, Ahmedabad", date: "05 Jul 2026", amount: "₹15,200", status: "completed" },
  { id: "BOK1051", customer: "Vikram Singh", pickup: "Bittan Market, Bhopal", drop: "Ratlam", date: "28 Jun 2026", amount: "₹6,800", status: "cancelled" }
];

const TABS = [
  { key: "all", label: "All" },
  { key: "quoted", label: "Quoted" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" }
];

function MyBookings() {

  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = dummyBookings.filter((b) => {
    const matchesTab = tab === "all" || b.status === tab;
    const matchesSearch = (b.customer + b.id + b.pickup + b.drop)
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bookingsPage">

      {/* Header */}
      <div className="bookingsHeader">

        <div>
          <span className="bookingsEyebrow">FULL HISTORY</span>
          <h1>My Bookings</h1>
          <p>Every quote you've sent, across every status.</p>
        </div>

        <div className="bookingsSearch">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by customer, city or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      {/* Tabs */}
      <div className="bookingsTabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={tab === t.key ? "tabBtn active" : "tabBtn"}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bookingsTableCard">

        <table>

          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Route</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((b) => (
              <tr key={b.id}>

                <td className="mono">#{b.id}</td>

                <td>{b.customer}</td>

                <td>
                  <div className="routeCell">
                    <FaMapMarkerAlt />
                    <span>{b.pickup} → {b.drop}</span>
                  </div>
                </td>

                <td className="mono">{b.date}</td>

                <td className="mono">{b.amount}</td>

                <td>
                  <span className={"status " + b.status}>
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
                </td>

                <td>
                  <button className="viewBtn">
                    <FaEye />
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

        {filtered.length === 0 && (
          <div className="emptyState">
            <h3>No bookings found</h3>
            <p>Try a different filter or search term.</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default MyBookings;