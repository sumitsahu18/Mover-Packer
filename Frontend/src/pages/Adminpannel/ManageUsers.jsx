import "./ManageUsers.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { __userapiurl } from "../../API_URL";
import {
  FaUsers,
  FaCheckCircle,
  FaBan,
  FaTrash
} from "react-icons/fa";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(__userapiurl + "fetch", {
        params: {
          condition_obj: JSON.stringify({
            role: "user",
          }),
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
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
        fetchUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (_id) => {
    if (!window.confirm("Delete this user?")) return;

    axios
      .delete(__userapiurl + "delete", {
        data: {
          condition_obj: JSON.stringify({ _id }),
        },
      })
      .then(() => {
        fetchUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="manageUsersContainer">
      <div className="manageUsersCard">

        <div className="muHeader">
          <div>
            <span className="welcomeEyebrow">USER DIRECTORY</span>
            <h1><FaUsers /> Manage Users</h1>
          </div>

          <div className="muCount">
            <h2>{users.length}</h2>
            <p>Total Users</p>
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
                <th>Address</th>
                <th>City</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((row) => (
                  <tr key={row._id}>
                    <td>{row._id}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td>{row.address}</td>
                    <td>{row.city}</td>
                    <td>{row.gender}</td>

                    <td>
                      {row.status ? (
                        <span className="verified">
                          <FaCheckCircle /> Verified
                        </span>
                      ) : (
                        <span className="blocked">
                          <FaBan /> Blocked
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
                        {row.status ? "Block" : "Verify"}
                      </button>

                      <button
                        className="deleteBtn"
                        onClick={() =>
                          deleteUser(row._id)
                        }
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="noData">
                    No Users Found
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

export default ManageUsers;