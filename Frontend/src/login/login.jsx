import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { __userapiurl } from "../API_URL";
import Navbar from "../Components/NavbarComponent/Navbar";
import Footer from "../Components/FooterComponent/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role set to 'user'
  const [showPass, setShowPass] = useState(false);
  const [output, setOutput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [roleError, setRoleError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = "none";
      }, 800);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous errors
    setOutput("");
    setEmailError("");
    setPasswordError("");
    setRoleError("");

    // Backend ko role bhi bhej rahe hain
    const users = { email: email, password: password, role: role };
    console.log("Login Payload:", users);

    axios
      .post(__userapiurl + "login", users)
      .then((response) => {
        console.log("response", response.data);

        if (!response.data.status) {
          // Backend response ke mutabiq precise error messages
          if (response.data.code === "EMAIL_NOT_FOUND") {
            setEmailError(response.data.msg);
          } else if (response.data.code === "WRONG_PASSWORD") {
            setPasswordError(response.data.msg);
          } else if (response.data.code === "INVALID_ROLE") {
            setRoleError(response.data.msg);
          } else if (response.data.code === "NOT_VERIFIED") {
            setOutput("You are not verified, please contact with admin");
          } else {
            setOutput(response.data.msg || "Something went wrong");
          }
          return;
        }

        const userinfo = response.data.userDetails;
        console.log("userinfo", userinfo);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("_id", userinfo._id);
        localStorage.setItem("name", userinfo.name);
        localStorage.setItem("email", userinfo.email);
        localStorage.setItem("mobile", userinfo.mobile);
        localStorage.setItem("city", userinfo.city);
        localStorage.setItem("gender", userinfo.address);
        localStorage.setItem("role", userinfo.role);
        localStorage.setItem("info", userinfo.info);

        // Dynamic Routing according to selected role
        if (userinfo.role === "admin") {
          navigate("/admin");
        } else if (userinfo.role === "transporter") {
          navigate("/transporter");
        } else {
          navigate("/user");
        }
      })
      .catch((error) => {
        console.log("invalid", error);
        setOutput(
          error.response?.data?.msg || "Something went wrong, please try again"
        );
      });
  };

  return (
    <>
      <Navbar />
      <div className="lp-wrap" style={{ marginTop: 30 }}>
        <div className="lp-card">
          {/* ── LEFT PANEL ── */}
          <div className="lp-left">
            <div className="lp-brand">
              <p className="lp-brand-name">
                Swift<span>Move</span>
              </p>
              <p className="lp-brand-tag">
                Trusted Packers &amp; Movers Across India
              </p>
            </div>

            {/* Animated scene — sizes itself to whatever height the
                right panel ends up needing, instead of a fixed px value */}
            <div className="lp-scene">
              <div
                className="lp-box"
                style={{
                  width: 30, height: 30,
                  background: "#f5a623",
                  top: "6%", left: "16%",
                  animationDelay: "0s",
                }}
              />
              <div
                className="lp-box"
                style={{
                  width: 22, height: 22,
                  background: "#ff8c69",
                  top: "2%", right: "20%",
                  animationDelay: "0.4s",
                }}
              />
              <div
                className="lp-box"
                style={{
                  width: 18, height: 18,
                  background: "#6fcf97",
                  top: "16%", left: "36%",
                  animationDelay: "0.8s",
                }}
              />
              <div
                className="lp-box"
                style={{
                  width: 24, height: 24,
                  background: "#4f8cff",
                  top: "0%", left: "54%",
                  animationDelay: "0.2s",
                }}
              />

              <div className="lp-road" />
              <div className="lp-truck-wrap">
                <div className="lp-truck">
                  <div className="lp-truck-body" />
                  <div className="lp-truck-cab" />
                  <div className="lp-truck-wheel lp-w1" />
                  <div className="lp-truck-wheel lp-w2" />
                  <div className="lp-truck-wheel lp-w3" />
                </div>
              </div>
            </div>

            <div className="lp-stats">
              <div className="lp-stat">
                <strong>12K+</strong>
                <span>Moves Done</span>
              </div>
              <div className="lp-stat">
                <strong>98%</strong>
                <span>On-Time</span>
              </div>
              <div className="lp-stat">
                <strong>50+</strong>
                <span>Cities</span>
              </div>
            </div>

            <p className="lp-tagline">Safe. Reliable. On Time.</p>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="lp-right">
            <div className="lp-form-wrap">
              <p className="lp-form-eyebrow">Portal Login · SwiftMove</p>
              <h1 className="lp-form-title">Sign In</h1>

              <form onSubmit={handleSubmit}>
                {/* ── ROLE SELECTION FIELD ── */}
                <div className="lp-field">
                  <label htmlFor="role">Select Account Type</label>
                  <div className="lp-select-wrap">
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">User / Customer</option>
                      <option value="transporter">Transporter</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  {/* error slot always rendered — reserves its height
                      whether empty or not, so nothing else moves */}
                  <p className="lp-error">{roleError}</p>
                </div>

                {/* ── EMAIL FIELD ── */}
                <div className="lp-field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="lp-error">{emailError}</p>
                </div>

                {/* ── PASSWORD FIELD ── */}
                <div className="lp-field">
                  <label htmlFor="password">Password</label>
                  <div className="lp-pass-wrap">
                    <input
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="lp-pass-toggle"
                      onClick={() => setShowPass(!showPass)}
                      aria-label="Toggle password visibility"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                  <p className="lp-error">{passwordError}</p>
                </div>

                <div className="lp-row">
                  <label className="lp-remember">
                    <input type="checkbox" /> Remember me
                  </label>
                  <Link to="/forgot-password" className="lp-forgot">
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className="lp-btn">
                  Sign In as {role.toUpperCase()} →
                </button>

                <p className="lp-output">{output}</p>
              </form>

              <div className="lp-divider">
                <span>or continue with</span>
              </div>

              <button className="lp-google-btn">
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="lp-register">
                New to SwiftMove?{" "}
                <Link to="/register">Create a free account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;