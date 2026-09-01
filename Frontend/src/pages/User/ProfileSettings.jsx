import "./ProfileSettings.css";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaSave
} from "react-icons/fa";

function ProfileSettings() {

  const [showPassword,setShowPassword] = useState(false);

  const [profile,setProfile] = useState({
    name:"Sumit Sahu",
    email:localStorage.getItem("email") || "",
    mobile:"",
    address:""
  });

  const [password,setPassword] = useState({
    current:"",
    newPass:"",
    confirm:""
  });

  const handleProfileChange=(e)=>{
    setProfile({
      ...profile,
      [e.target.name]:e.target.value
    });
  };

  const handlePasswordChange=(e)=>{
    setPassword({
      ...password,
      [e.target.name]:e.target.value
    });
  };

  const saveProfile=()=>{
    alert("Profile Save API Lagani Hai");
  };

  const updatePassword=()=>{
    alert("Password Update API Lagani Hai");
  };

  return (

    <div className="profilePage">

      <div className="profileHero">

        <div className="profileAvatar">
          <FaUser />
        </div>

        <div>
          <h2>Profile Settings</h2>
          <p>
            Manage your account information
          </p>
        </div>

      </div>

      <div className="profileCard">

        <h3>Personal Information</h3>

        <div className="profileGrid">

          <div className="inputGroup">
            <label>
              <FaUser />
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </div>

          <div className="inputGroup">
            <label>
              <FaEnvelope />
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              readOnly
            />
          </div>

          <div className="inputGroup">
            <label>
              <FaPhone />
              Mobile
            </label>

            <input
              type="text"
              name="mobile"
              value={profile.mobile}
              onChange={handleProfileChange}
            />
          </div>

          <div className="inputGroup">
            <label>
              <FaMapMarkerAlt />
              Address
            </label>

            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
            />
          </div>

        </div>

        <button
          className="saveBtn"
          onClick={saveProfile}
        >
          <FaSave />
          Save Profile
        </button>

      </div>

      <div className="passwordSection">

        <button
          className="togglePasswordBtn"
          onClick={() =>
            setShowPassword(!showPassword)
          }
        >
          <FaLock />
          {
            showPassword
            ? "Hide Password Settings"
            : "Change Password"
          }
        </button>

        {
          showPassword && (

            <div className="passwordCard">

              <h3>Password Security</h3>

              <div className="inputGroup">

                <label>
                  Current Password
                </label>

                <input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="inputGroup">

                <label>
                  New Password
                </label>

                <input
                  type="password"
                  name="newPass"
                  value={password.newPass}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="inputGroup">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                />
              </div>

              <button
                className="updateBtn"
                onClick={updatePassword}
              >
                Update Password
              </button>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default ProfileSettings;