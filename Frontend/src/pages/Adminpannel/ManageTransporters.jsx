import "./ManageTransporters.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { __userapiurl } from "../../API_URL";
import {
  FaTruck,
  FaCheckCircle,
  FaBan,
  FaTrash
} from "react-icons/fa";

function ManageTransporters() {
  const [transporters, setTransporters] = useState([]);

  const fetchTransporters = () => {
    axios
      .get(__userapiurl + "fetch", {
        params: {
          condition_obj: JSON.stringify({
            role: "transporter",
          }),
        },
      })
      .then((response) => {
        setTransporters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTransporters();
  }, []);

  const changeStatus = (_id, status) => {
    axios
      .patch(__userapiurl + "update", {
        condition_obj: JSON.stringify({ _id }),
        content_obj: JSON.stringify({
          status: status ? 0 : 1,
        }),
      })
      .then(() => {
        fetchTransporters();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTransporter = (_id) => {
    if (!window.confirm("Delete this transporter?")) return;

    axios
      .delete(__userapiurl + "delete", {
        data: {
          condition_obj: JSON.stringify({ _id }),
        },
      })
      .then(() => {
        fetchTransporters();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="manageTransportersContainer">
      <div className="manageTransportersCard">

        <div className="mtHeader">
          <div>
            <span className="welcomeEyebrow">TRANSPORTER DIRECTORY</span>
            <h1><FaTruck /> Manage Transporters</h1>
          </div>

          <div className="mtCount">
            <h2>{transporters.length}</h2>
            <p>Total Transporters</p>
          </div>
        </div>

        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Vehicle Name</th>
                <th>Vehicle Number</th>
                <th>Max Weight (KG)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {transporters.length > 0 ? (
                transporters.map((row) => (
                  <tr key={row._id}>
                    <td>{row._id}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td>{row.city}</td>
                    <td>{row.vehicleName || "-"}</td>
                    <td>{row.vehicleNumber || "-"}</td>
                    <td>{row.maxWeightCapacity || "-"}</td>

                    <td>
                      {row.status ? (
                        <span className="verified">
                          <FaCheckCircle /> Approved
                        </span>
                      ) : (
                        <span className="blocked">
                          <FaBan /> Pending / Blocked
                        </span>
                      )}
                    </td>

                    <td className="actionBtns">
                      <button
                        className="statusBtn"
                        onClick={() =>
                          changeStatus(row._id, row.status)
                        }
                      >
                        {row.status ? "Block" : "Approve"}
                      </button>

                      <button
                        className="deleteBtn"
                        onClick={() =>
                          deleteTransporter(row._id)
                        }
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="noData">
                    No Transporters Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}

export default ManageTransporters;