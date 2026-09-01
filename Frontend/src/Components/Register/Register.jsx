import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import Navbar from "../NavbarComponent/Navbar";
import Footer from "../FooterComponent/Footer";

function Register() {
  const navigate = useNavigate();

  // Customer ya Transporter
  const [userType, setUserType] = useState("user");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  // Transporter-only fields
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [maxWeightCapacity, setMaxWeightCapacity] = useState("");

  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState({});
  const [emailChecking, setEmailChecking] = useState(false);

  // OTP Verification States
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Unique Email Check
  const checkEmailUnique = async (val) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return;
    setEmailChecking(true);
    try {
      const res = await axios.get(
        `https://mover-packer-1.onrender.com/user/check-email?email=${val}`
      );
      if (res.data.exists) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
      }
    } catch (e) {
      // silently fail
    } finally {
      setEmailChecking(false);
    }
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    } else if (password.length > 10) {
      newErrors.password = "Password must be at most 10 characters";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      newErrors.mobile = "Mobile must be exactly 10 digits";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!city) {
      newErrors.city = "City is required";
    }

    if (!gender) {
      newErrors.gender = "Gender is required";
    }

    // Transporter-only validation
    if (userType === "transporter") {
      if (!vehicleName.trim()) {
        newErrors.vehicleName = "Vehicle name is required";
      }

      if (!vehicleNumber.trim()) {
        newErrors.vehicleNumber = "Vehicle number is required";
      }

      if (!maxWeightCapacity.trim()) {
        newErrors.maxWeightCapacity = "Max weight capacity is required";
      } else if (isNaN(maxWeightCapacity) || Number(maxWeightCapacity) <= 0) {
        newErrors.maxWeightCapacity = "Enter a valid weight in KG";
      }
    }

    return newErrors;
  };

  // 1. STEP 1: Registration Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setOutput("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const user = {
      name,
      email,
      password,
      mobile,
      address,
      city,
      gender,
      role: userType,
      // Transporter-only fields (backend inhe User model mein save karega)
      ...(userType === "transporter" && {
        vehicleName,
        vehicleNumber,
        maxWeightCapacity,
      }),
    };

    axios
      .post("https://mover-packer-1.onrender.com/user/save", user)
      .then(() => {
        setLoading(false);
        setShowOtpScreen(true);
        setOutput("✅ OTP sent to your email! Please check your inbox.");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response?.status === 409) {
          setErrors((prev) => ({
            ...prev,
            email: "This email is already registered",
          }));
        } else {
          setOutput(
            "❌ Registration failed: " +
              (error.response?.data?.message || error.message)
          );
        }
      });
  };

  // 2. STEP 2: OTP Verify Submit
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length !== 6) {
      setOutput("❌ Please enter valid 6-digit OTP");
      return;
    }
    setLoading(true);
    setOutput("");

    axios
      .post("https://mover-packer-1.onrender.com/user/verify-otp", { email, otp })
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          if (userType === "transporter") {
            alert(
              "Account Verified! Ab aapka account Admin approval ke liye pending hai. Approval ke baad hi Login kar payenge."
            );
          } else {
            alert("Account Verified Successfully! Please Sign in.");
          }
          navigate("/login");
        } else {
          setOutput("❌ " + res.data.msg);
        }
      })
      .catch((err) => {
        setLoading(false);
        setOutput(
          "❌ " + (err.response?.data?.msg || "Invalid or Expired OTP")
        );
      });
  };

  const clearErr = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <>
      <Navbar />
      <div className="rg-wrap">
        <div className="rg-bg-circles">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="rg-floating">
          <span className="rg-fi rg-fi1">📦</span>
          <span className="rg-fi rg-fi2">🚚</span>
          <span className="rg-fi rg-fi3">🏠</span>
          <span className="rg-fi rg-fi4">📍</span>
          <span className="rg-fi rg-fi5">🗃️</span>
          <span className="rg-fi rg-fi6">🏢</span>
        </div>

        <div className="rg-card">
          <div className="rg-card-inner">
            <div className="rg-accent-bar"></div>

            <div className="rg-header">
              <div className="rg-brand">
                <div className="rg-brand-icon">🚚</div>
                <div>
                  <div className="rg-brand-name">
                    Mover<em>&amp;Packer</em>
                  </div>
                  <div className="rg-brand-tag">Safe · Reliable · On Time</div>
                </div>
              </div>
              <div className="rg-progress">
                <div className="rg-pb rg-done"></div>
                <div
                  className={`rg-pb ${showOtpScreen ? "rg-done" : "rg-active"}`}
                ></div>
                <div
                  className={`rg-pb ${showOtpScreen ? "rg-active" : ""}`}
                ></div>
              </div>
            </div>

            <div className="rg-body">
              <h2 className="rg-title">
                {showOtpScreen ? "Verify Email via OTP" : "Create your account"}
              </h2>
              <p className="rg-sub">
                {showOtpScreen
                  ? `Enter the 6-digit code sent to ${email}`
                  : "Book and track your move from one place"}
              </p>

              {!showOtpScreen && (
                <div className="rg-typeToggle">
                  <button
                    type="button"
                    className={userType === "user" ? "rg-typeBtn active" : "rg-typeBtn"}
                    onClick={() => setUserType("user")}
                  >
                    📦 Register as Customer
                  </button>

                  <button
                    type="button"
                    className={userType === "transporter" ? "rg-typeBtn active" : "rg-typeBtn"}
                    onClick={() => setUserType("transporter")}
                  >
                    🚚 Register as Transporter
                  </button>
                </div>
              )}

              {output && (
                <div
                  className={
                    output.startsWith("✅") ? "rg-success" : "rg-error-box"
                  }
                >
                  {output}
                </div>
              )}

              {!showOtpScreen ? (
                /* REGISTRATION FORM */
                <form onSubmit={handleSubmit} noValidate>
                  <div className="rg-sec-head">Personal info</div>
                  <div className="rg-g2">
                    <div className="rg-f">
                      <label>👤 Full name</label>
                      <input
                        type="text"
                        placeholder="Rahul Sharma"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          clearErr("name");
                        }}
                        className={errors.name ? "rg-input-err" : ""}
                      />
                      {errors.name && (
                        <span className="rg-err">{errors.name}</span>
                      )}
                    </div>
                    <div className="rg-f">
                      <label>✉️ Email</label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearErr("email");
                        }}
                        onBlur={() => checkEmailUnique(email)}
                        className={errors.email ? "rg-input-err" : ""}
                      />
                      {emailChecking && (
                        <span className="rg-checking">Checking...</span>
                      )}
                      {errors.email && (
                        <span className="rg-err">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="rg-g2">
                    <div className="rg-f">
                      <label>
                        🔒 Password{" "}
                        <span className="rg-hint">(5–10 chars)</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Min 5, Max 10 characters"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearErr("password");
                        }}
                        className={errors.password ? "rg-input-err" : ""}
                      />
                      {errors.password && (
                        <span className="rg-err">{errors.password}</span>
                      )}
                    </div>
                    <div className="rg-f">
                      <label>
                        📱 Mobile <span className="rg-hint">(10 digits)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          clearErr("mobile");
                        }}
                        className={errors.mobile ? "rg-input-err" : ""}
                        maxLength={10}
                      />
                      {errors.mobile && (
                        <span className="rg-err">{errors.mobile}</span>
                      )}
                    </div>
                  </div>

                  <div className="rg-sec-head">Moving details</div>
                  <div className="rg-g1">
                    <div className="rg-f">
                      <label>📍 Current address</label>
                      <textarea
                        placeholder="House no, Street, Area, Locality"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          clearErr("address");
                        }}
                        rows={3}
                        className={errors.address ? "rg-input-err" : ""}
                      ></textarea>
                      {errors.address && (
                        <span className="rg-err">{errors.address}</span>
                      )}
                    </div>
                  </div>

                  <div className="rg-g2">
                    <div className="rg-f">
                      <label>🏙️ City</label>
                      <select
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          clearErr("city");
                        }}
                        className={`${city ? "picked" : ""} ${
                          errors.city ? "rg-input-err" : ""
                        }`}
                      >
                        <option value="">Select City</option>
                        <option value="Indore">Indore</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Ujjain">Ujjain</option>
                        <option value="Jabalpur">Jabalpur</option>
                        <option value="Gwalior">Gwalior</option>
                      </select>
                      {errors.city && (
                        <span className="rg-err">{errors.city}</span>
                      )}
                    </div>
                    <div className="rg-f">
                      <label>🧑 Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                          clearErr("gender");
                        }}
                        className={`${gender ? "picked" : ""} ${
                          errors.gender ? "rg-input-err" : ""
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <span className="rg-err">{errors.gender}</span>
                      )}
                    </div>
                  </div>

                  {/* Transporter-only fields */}
                  {userType === "transporter" && (
                    <>
                      <div className="rg-sec-head">Vehicle details</div>

                      <div className="rg-g2">
                        <div className="rg-f">
                          <label>🚛 Vehicle Name</label>
                          <input
                            type="text"
                            placeholder="Tata Ace / Eicher Truck"
                            value={vehicleName}
                            onChange={(e) => {
                              setVehicleName(e.target.value);
                              clearErr("vehicleName");
                            }}
                            className={errors.vehicleName ? "rg-input-err" : ""}
                          />
                          {errors.vehicleName && (
                            <span className="rg-err">{errors.vehicleName}</span>
                          )}
                        </div>

                        <div className="rg-f">
                          <label>🔢 Vehicle Number</label>
                          <input
                            type="text"
                            placeholder="MP09AB1234"
                            value={vehicleNumber}
                            onChange={(e) => {
                              setVehicleNumber(e.target.value.toUpperCase());
                              clearErr("vehicleNumber");
                            }}
                            className={errors.vehicleNumber ? "rg-input-err" : ""}
                          />
                          {errors.vehicleNumber && (
                            <span className="rg-err">{errors.vehicleNumber}</span>
                          )}
                        </div>
                      </div>

                      <div className="rg-g1">
                        <div className="rg-f">
                          <label>⚖️ Maximum Weight Capacity (KG)</label>
                          <input
                            type="number"
                            placeholder="e.g. 2000"
                            value={maxWeightCapacity}
                            onChange={(e) => {
                              setMaxWeightCapacity(e.target.value);
                              clearErr("maxWeightCapacity");
                            }}
                            className={errors.maxWeightCapacity ? "rg-input-err" : ""}
                          />
                          {errors.maxWeightCapacity && (
                            <span className="rg-err">{errors.maxWeightCapacity}</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <button type="submit" className="rg-btn" disabled={loading}>
                    <span className="rg-btn-icon">🚚</span>
                    {loading
                      ? "Sending OTP..."
                      : userType === "transporter"
                      ? "Register as Transporter"
                      : "Register & Book My Move"}
                  </button>
                </form>
              ) : (
                /* OTP VERIFICATION FORM */
                <form onSubmit={handleVerifyOTP}>
                  <div className="rg-g1">
                    <div className="rg-f" style={{ textAlign: "center" }}>
                      <label style={{ fontSize: "16px", marginBottom: "10px" }}>
                        🔑 Enter 6-Digit OTP
                      </label>
                      <input
                        type="text"
                        placeholder="123456"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{
                          textAlign: "center",
                          fontSize: "22px",
                          letterSpacing: "6px",
                          fontWeight: "bold",
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="rg-btn"
                    style={{ marginTop: "20px" }}
                    disabled={loading}
                  >
                    {loading
                      ? "Verifying..."
                      : "Verify OTP & Complete Registration"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowOtpScreen(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#666",
                      cursor: "pointer",
                      marginTop: "15px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    ← Edit Details / Re-enter Email
                  </button>
                </form>
              )}

              {!showOtpScreen && (
                <p className="rg-login-link">
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              )}

              <div className="rg-trust">
                <div className="rg-trust-item">🛡️ Secure</div>
                <div className="rg-trust-item">⏰ On-time</div>
                <div className="rg-trust-item">⭐ 50K+ clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;