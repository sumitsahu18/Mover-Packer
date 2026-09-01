import "./CPAdmin.css";
import { useState } from "react";
import axios from "axios";
import { __userapiurl } from "../../API_URL";

function CPAdmin({ closeModal }) {

  const [npassword, setNewPassword] = useState("");
  const [cnpassword, setConfirmPassword] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = () => {

    const email = localStorage.getItem("email");

    if (!npassword || !cnpassword) {

      setOutput(
        "Please fill all fields"
      );

      return;
    }

    if (npassword !== cnpassword) {

      setOutput(
        "New Password and Confirm Password do not match"
      );

      setConfirmPassword("");

      return;
    }

    const update_details = {

      condition_obj: JSON.stringify({
        email: email
      }),

      content_obj: JSON.stringify({
        password: cnpassword
      })

    };

    axios.patch(
      __userapiurl + "update",
      update_details
    )
    .then(() => {

      alert(
        "Password Changed Successfully"
      );

      setNewPassword("");
      setConfirmPassword("");

      closeModal();

    })
    .catch((error) => {

      console.log(error);

      setOutput(
        "Unable to change password"
      );
    });
  };

  return (
    <div className="cpOverlay">

      <div className="cpCard">

        <div className="cpHeader">

          <h2>
            Change Password
          </h2>

          <button
            className="closeBtn"
            onClick={closeModal}
          >
            ✕
          </button>

        </div>

        {
          output && (
            <div className="errorBox">
              {output}
            </div>
          )
        }

        <div className="cpInputGroup">

          <label>
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            value={npassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

        </div>

        <div className="cpInputGroup">

          <label>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={cnpassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

        </div>

        <div className="cpActions">

          <button
            className="cancelBtn"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            className="saveBtn"
            onClick={handleSubmit}
          >
            Update Password
          </button>

        </div>

      </div>

    </div>
  );
}

export default CPAdmin;