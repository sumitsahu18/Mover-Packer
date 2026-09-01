import "./../CSS/TPProfile.css";
import { useState } from "react";

import {
  FaStar,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaCamera,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard
} from "react-icons/fa";

// TODO(backend): replace with GET /api/transporter/profile
const initialProfile = {
  name: "Deepak Yadav",
  phone: "+91 98765 12340",
  email: "deepak.yadav@example.com",
  address: "E-7, Arera Colony, Bhopal, MP",
  vehicleType: "Tempo (14 ft)",
  vehicleNumber: "MP04 AB 4521",
  vehicleCapacity: "2.5 Tonne",
  memberSince: "Mar 2024",
  rating: 4.9,
  completedTrips: 186
};

// TODO(backend): replace with GET /api/transporter/documents
const documents = [
  { name: "Aadhar Card", status: "verified" },
  { name: "Driving License", status: "verified" },
  { name: "Vehicle RC", status: "verified" },
  { name: "Insurance", status: "pending" }
];

function TPProfile() {

  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initialProfile);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = (e) => {
    e.preventDefault();

    // TODO(backend): PATCH /api/transporter/profile
    setProfile(form);
    setEditing(false);
  };

  const cancelEdit = () => {
    setForm(profile);
    setEditing(false);
  };

  return (
    <div className="profilePage">

      {/* Summary card */}
      <div className="profileSummary">

        <div className="avatarBlock">
          <div className="avatarCircle">
            {profile.name.split(" ").map((w) => w[0]).join("")}
          </div>
          <button className="avatarEditBtn">
            <FaCamera />
          </button>
        </div>

        <div className="summaryInfo">
          <h1>{profile.name}</h1>
          <p className="memberSince">
            <FaClock /> Transporter since {profile.memberSince}
          </p>

          <div className="summaryStats">

            <div className="summaryStat">
              <FaStar className="statIconInline amber" />
              <span>{profile.rating} Rating</span>
            </div>

            <div className="summaryStat">
              <FaCheckCircle className="statIconInline green" />
              <span>{profile.completedTrips} Trips Completed</span>
            </div>

            <div className="summaryStat">
              <FaTruck className="statIconInline route" />
              <span>{profile.vehicleType}</span>
            </div>

          </div>
        </div>

        {!editing && (
          <button className="editProfileBtn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}

      </div>

      <div className="laneDivider"></div>

      <div className="profileGrid">

        {/* Personal details */}
        <form className="profileCard" onSubmit={saveChanges}>

          <h2>Personal Details</h2>

          <label><FaUser /> Full Name</label>
          <input
            type="text"
            value={form.name}
            disabled={!editing}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <label><FaPhoneAlt /> Phone Number</label>
          <input
            type="text"
            value={form.phone}
            disabled={!editing}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <label><FaEnvelope /> Email</label>
          <input
            type="email"
            value={form.email}
            disabled={!editing}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <label><FaMapMarkerAlt /> Address</label>
          <textarea
            rows="2"
            value={form.address}
            disabled={!editing}
            onChange={(e) => handleChange("address", e.target.value)}
          />

          {editing && (
            <div className="formActions">
              <button type="button" className="cancelBtn" onClick={cancelEdit}>
                Cancel
              </button>
              <button type="submit" className="saveBtn">
                Save Changes
              </button>
            </div>
          )}

        </form>

        {/* Vehicle details */}
        <div className="profileCard">

          <h2>Vehicle Details</h2>

          <label><FaTruck /> Vehicle Type</label>
          <input
            type="text"
            value={form.vehicleType}
            disabled={!editing}
            onChange={(e) => handleChange("vehicleType", e.target.value)}
          />

          <label><FaIdCard /> Vehicle Number</label>
          <input
            type="text"
            value={form.vehicleNumber}
            disabled={!editing}
            onChange={(e) => handleChange("vehicleNumber", e.target.value)}
          />

          <label><FaTruck /> Load Capacity</label>
          <input
            type="text"
            value={form.vehicleCapacity}
            disabled={!editing}
            onChange={(e) => handleChange("vehicleCapacity", e.target.value)}
          />

          <h2 className="docsHeading">Documents</h2>

          <div className="docsList">
            {documents.map((doc) => (
              <div className="docRow" key={doc.name}>
                <span>{doc.name}</span>
                <span className={"docStatus " + doc.status}>
                  {doc.status === "verified" ? "Verified" : "Pending"}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default TPProfile;