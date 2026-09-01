import "./AddSubCategory.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  __categoryapiurl,
  __subcategoryapiurl,
} from "../../API_URL";

function SubCategory() {
  const [catnm, setCatnm] = useState("");
  const [subcatnm, setSubCatnm] = useState("");
  const [file, setFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    axios
      .get(__categoryapiurl + "fetch")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchSubCategories = () => {
    axios
      .get(__subcategoryapiurl + "fetch")
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    if (!catnm || !subcatnm || !file) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();

    formData.append("catnm", catnm);
    formData.append("subcatnm", subcatnm);
    formData.append("caticon", file);

    axios
      .post(__subcategoryapiurl + "save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Sub Category Added Successfully");

        setCatnm("");
        setSubCatnm("");
        setFile(null);

        fetchSubCategories();
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  };

  const handleShow = () => {
    fetchSubCategories();
    setShowTable(!showTable);
  };

  return (
    <div className="subCategoryContainer">
      <div className="subCategoryCard">
        <h1>Add Sub Category</h1>

        <div className="inputGroup">
          <label>Select Category</label>

          <select
            value={catnm}
            onChange={(e) => setCatnm(e.target.value)}
          >
            <option value="">Select Category</option>

            {categories.map((row) => (
              <option key={row._id} value={row.catnm}>
                {row.catnm}
              </option>
            ))}
          </select>
        </div>

        <div className="inputGroup">
          <label>Sub Category Name</label>

          <input
            type="text"
            value={subcatnm}
            onChange={(e) => setSubCatnm(e.target.value)}
            placeholder="Enter Sub Category"
          />
        </div>

        <div className="inputGroup">
          <label>Sub Category Icon</label>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="btnBox">
          <button
            className="addBtn"
            onClick={handleSubmit}
          >
            Add Sub Category
          </button>

          <button
            className="showBtn"
            onClick={handleShow}
          >
            {showTable
              ? "Hide Sub Categories"
              : "Show Sub Categories"}
          </button>
        </div>
      </div>

      {showTable && (
        <div className="tableCard">
          <h2>All Sub Categories</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Icon Name</th>
              </tr>
            </thead>

            <tbody>
              {subCategories.length > 0 ? (
                subCategories.map((row) => (
                  <tr key={row._id}>
                    <td>{row._id}</td>
                    <td>{row.catnm}</td>
                    <td>{row.subcatnm}</td>
                    <td>{row.subcaticonnm}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center" }}
                  >
                    No Data Found
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

export default SubCategory;