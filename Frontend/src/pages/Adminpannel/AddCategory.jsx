import "./AddCategory.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { __categoryapiurl } from "../../API_URL";
import { FaFolderPlus, FaLayerGroup, FaTrash, FaImage } from "react-icons/fa";

function AddCategory() {
  const [catnm, setCatnm] = useState("");
  const [catIconnm, setCatIconnm] = useState(null);
  const [cList, setCList] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const fetchCategories = () => {
    axios
      .get(__categoryapiurl + "fetch")
      .then((response) => {
        setCList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    console.log("Before Submit =", catIconnm);

    if (!catnm.trim()) {
      alert("Please enter category name");
      return;
    }

    if (!catIconnm) {
      alert("Please select category image");
      return;
    }

    const formData = new FormData();

    formData.append("catnm", catnm);
    formData.append("caticon", catIconnm);

    console.log("Selected File =", catIconnm);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    axios
      .post(__categoryapiurl + "save", formData)
      .then((response) => {
        console.log(response.data);

        alert("Category Added Successfully");

        setCatnm("");
        setCatIconnm(null);

        fetchCategories();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response?.data);

        alert("Error adding category");
      });
  };

  const handleDelete = (_id) => {
    axios
      .delete(__categoryapiurl + "delete", {
        data: {
          condition_obj: JSON.stringify({ _id }),
        },
      })
      .then(() => {
        fetchCategories();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="categoryContainer">
      <div className="categoryCard">
        <span className="welcomeEyebrow">CATALOG SETUP</span>
        <h1><FaFolderPlus /> Add Category</h1>

        <div className="inputGroup">
          <label>Category Name</label>

          <input
            type="text"
            value={catnm}
            onChange={(e) => setCatnm(e.target.value)}
            placeholder="Enter category name"
          />
        </div>

        <div className="inputGroup">
          <label>Category Icon</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              console.log("File Selected =", e.target.files[0]);
              setCatIconnm(e.target.files[0]);
            }}
          />
        </div>

        <div className="categoryActions">
          <button className="addBtn" onClick={handleAddCategory}>
            <FaFolderPlus /> Add Category
          </button>

          <button
            className="showBtn"
            onClick={() => setShowCategories(!showCategories)}
          >
            <FaLayerGroup /> {showCategories ? "Hide Categories" : "Show Categories"}
          </button>
        </div>
      </div>

      {showCategories && (
        <div className="categoryTableCard">
          <h2><FaLayerGroup /> All Categories</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Icon</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cList.length > 0 ? (
                cList.map((row) => (
                  <tr key={row._id}>
                    <td>{row._id}</td>

                    <td>{row.catnm}</td>

                    <td><FaImage /> {row.catIconnm}</td>

                    <td>
                      <button
                        className="deleteBtn"
                        onClick={() => handleDelete(row._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="noData">
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AddCategory;