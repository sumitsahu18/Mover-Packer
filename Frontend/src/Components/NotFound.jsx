import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }
        
    if (role === "admin"){
      navigate("/admin", { replace: true });
    } else if (role === "transporter") {
      navigate("/transporter", { replace: true });
    } else {
      navigate("/user", { replace: true });
    }
  };

  return (
    <div className="nfContainer">
      <div className="nfCard">
        <div className="nfIcon">
          <FaExclamationTriangle />
        </div>

        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>Ye page exist nahi karta ya URL galat hai.</p>

        <button onClick={goBack}>
          <FaHome /> Go Back Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;