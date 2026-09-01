import "./EPAdmin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { __userapiurl } from "../../API_URL";
import CPAdmin from "../Adminpannel/CPAdmin.jsx";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCity,
  FaVenusMars,
  FaShieldAlt,
  FaKey,
  FaCamera,
  FaClock
} from "react-icons/fa";

function EPAdmin() {

  const [showCPModal, setShowCPModal] = useState(false);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    gender: "",
  });

  const [form, setForm] = useState(profile);

  useEffect(() => {

    const userEmail = localStorage.getItem("email");

    axios
      .get(__userapiurl + "fetch", {
        params: {
          email: userEmail,
        },
      })
      .then((response) => {

        const user = response.data[0];

        const loaded = {
          name: user.name || "",
          email: user.email || "",
          mobile: user.mobile || "",
          address: user.address || "",
          city: user.city || "",
          gender: user.gender || "",
        };

        setProfile(loaded);
        setForm(loaded);

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(__userapiurl + "update", {

        condition_obj: JSON.stringify({
          email: form.email,
        }),

        content_obj: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          address: form.address,
          city: form.city,
          gender: form.gender,
        }),

      })
      .then(() => {
        setProfile(form);
        setEditing(false);
        alert("Profile Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Update Failed");
      });
  };

  const cancelEdit = () => {
    setForm(profile);
    setEditing(false);
  };

  return (
    <>
      <div className="profilePage">

        {/* Summary card */}
        <div className="profileSummary">

          <div className="avatarBlock">
            <div className="avatarCircle">
              {profile.name
                ? profile.name.split(" ").map((w) => w[0]).join("")
                : "AD"}
            </div>
            <button className="avatarEditBtn">
              <FaCamera />
            </button>
          </div>

          <div className="summaryInfo">
            <h1>{profile.name || "Admin"}</h1>

            <p className="memberSince">
              <FaClock /> Administrator Account
            </p>

            <div className="summaryStats">

              <div className="summaryStat">
                <FaShieldAlt className="statIconInline route" />
                <span>Full Access</span>
              </div>

              <div className="summaryStat">
                <FaEnvelope className="statIconInline amber" />
                <span>{profile.email}</span>
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
          <form className="profileCard" onSubmit={handleSubmit}>

            <h2>Personal Details</h2>

            <label><FaUser /> Full Name</label>
            <input
              type="text"
              value={form.name}
              disabled={!editing}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <label><FaEnvelope /> Email</label>
            <input
              type="email"
              value={form.email}
              disabled
            />

            <label><FaPhoneAlt /> Mobile</label>
            <input
              type="text"
              value={form.mobile}
              disabled={!editing}
              onChange={(e) => handleChange("mobile", e.target.value)}
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

          {/* Account details */}
          <div className="profileCard">

            <h2>Account Details</h2>

            <label><FaCity /> City</label>
            <select
              value={form.city}
              disabled={!editing}
              onChange={(e) => handleChange("city", e.target.value)}
            >
              <option value="">Select City</option>
              <option value="Indore">Indore</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Ujjain">Ujjain</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Nasik">Nasik</option>
            </select>

            <label><FaVenusMars /> Gender</label>
            <div className="genderRow">

              <label className="genderOption">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === "male"}
                  disabled={!editing}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                Male
              </label>

              <label className="genderOption">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === "female"}
                  disabled={!editing}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                Female
              </label>

            </div>

            <h2 className="docsHeading">Security</h2>

            <div className="docsList">
              <div className="docRow">
                <span><FaKey /> Password</span>

                <button
                  type="button"
                  className="changePasswordBtn"
                  onClick={() => setShowCPModal(true)}
                >
                  Change Password
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {
        showCPModal && (
          <CPAdmin
            closeModal={() => setShowCPModal(false)}
          />
        )
      }
    </>
  );
}

export default EPAdmin;