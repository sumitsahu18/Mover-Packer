import './Addproduct.css';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Alert from "../../Components/AlertComponent/Alert";

import { __categoryapiurl , __subcategoryapiurl , __productapiurl } from '../../API_URL';

function Addproduct() {
  
  const [title, setTitle] = useState("");
  const [categorynm, setCategorynm] = useState("");
  const [subcategorynm, setSubCategorynm] = useState("");
  const [description, setDescription] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [baseprice, setBaseprice] = useState("");
  const [file, setFile] = useState(null);
  const [alertOutput, setAlertOutput] = useState(false);
  const [cList, setCList] = useState([]);
  const [scList, setSCList] = useState([]);
  const [product, setproduct] = useState([]);

  // Login user ka email local storage se lein
  const currentUserEmail = localStorage.getItem("email");

  // Ref Target for Scroll
  const productsRef = useRef(null);

  // Smooth Scroll Function
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. Fetch Categories
  useEffect(() => {
    axios
      .get(__categoryapiurl+'fetch')
      .then((response) => {
        setCList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 2. Fetch Sub-categories
  useEffect(() => {
    if(categorynm) {
      axios.get(__subcategoryapiurl+'fetch', {
          params: { catnm: categorynm },
        })
        .then((response) => {
          setSCList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categorynm]);

  // 3. Fetch Products Function (Reuse karne ke liye function banaya)
  const fetchMyProducts = () => {
    axios.get(__productapiurl+'fetch')
      .then((response) => {
        // FILTER: Sirf current logged in user ke email waale products dikhao
        const myProducts = response.data.filter(
          (item) => item.useremail === currentUserEmail
        );
        setproduct(myProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMyProducts();
  }, [currentUserEmail]);

  const handleProductIcon = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddProduct = () => {
    var formData = new FormData();

    formData.append("title", title);
    formData.append("catnm", categorynm);
    formData.append("subcatnm", subcategorynm);
    formData.append("description", description);
    formData.append("pickupLocation", pickupLocation);
    formData.append("dropLocation", dropLocation);
    formData.append("baseprice", baseprice);
    formData.append("useremail", currentUserEmail);
    formData.append("producticon", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(__productapiurl+"save", formData, config)
      .then((response) => {
        console.log(response);
        setAlertOutput(true);
        setTimeout(() => {
          setAlertOutput(false);
        }, 4000);

        // Reset form fields
        setTitle("");
        setCategorynm("");
        setSubCategorynm("");
        setDescription("");
        setPickupLocation("");
        setDropLocation("");
        setBaseprice("");
        setFile(null);
        if (document.getElementById("myfile")) {
          document.getElementById("myfile").value = "";
        }

        // Product add hone ke baad list refresh karein
        fetchMyProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>    
      <div id="tooplate_content">
        {alertOutput && (
          <Alert type="success" message="Product Added Successfully..." />
        )}

        {/* Header + Scroll Button Row */}
        <div className="header-action-row">
          <h2>Add Product Here!!!</h2>
          <button type="button" className="view-products-btn" onClick={scrollToProducts}>
            Added Products ↓
          </button>
        </div>

        <form action="">
          <div className="row">
            <div className="form-group col-sm-6">
              <input
                type="text"
                className="form-control border-0 py-4"
                placeholder="Title"
                required="required"
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group col-sm-6">
              <select
                id="option"
                className="form-control border-0 px-2"
                required="required"
                value={categorynm || ''}
                onChange={(e) => setCategorynm(e.target.value)}
              >
                <option value="">Select Category</option>
                {cList.map((row) => (
                  <option key={row._id || row.catnm} value={row.catnm}>{row.catnm}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm-6">
              <select
                id="option"
                className="form-control border-0 px-2"
                required="required"
                value={subcategorynm || ''}
                onChange={(e) => setSubCategorynm(e.target.value)}
              >
                <option value="">Select Sub Category</option>
                {scList.map((row) => (
                  <option key={row._id || row.subcatnm} value={row.subcatnm}>{row.subcatnm}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-sm-6">
              <input
                type="text"
                className="form-control border-0 py-4"
                placeholder="Description"
                required="required"
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm-6">
              <input
                type="text"
                className="form-control border-0 py-4"
                placeholder="Pickup Location"
                value={pickupLocation || ''}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>

            <div className="form-group col-sm-6">
              <input
                type="text"
                className="form-control border-0 py-4"
                placeholder="Drop Location"
                value={dropLocation || ''}
                onChange={(e) => setDropLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm-6">
              <input
                type="text"
                className="form-control border-0 py-4"
                placeholder="Base Price"
                required="required"
                value={baseprice || ''}
                onChange={(e) => setBaseprice(e.target.value)}
              />
            </div>
            <div className="form-group col-sm-6">
              <input
                type="file"
                id="myfile"
                className="form-control border-0 h-100"
                placeholder="Product Icon"
                required="required"
                onChange={handleProductIcon}
              />
            </div>
          </div>

          <div className="row actionBtns">
            <div className="form-group">
              <button
                id="addproductbtn"
                type="button"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>
        </form>

        {/* Ref added to card container */}
        <div className="card-container" ref={productsRef}>
          {product && product.length > 0 ? (
            product.map((row) => (
              <div className="quote-card" key={row._id}>
                
                <div className="card-header">
                  <span className="req-id">#REQ{row._id}</span>
                  <span className="time-ago">
                    {row.info ? new Date(row.info).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently'}
                  </span>
                </div>

                <h3 className="customer-name">{row.title}</h3>

                <div className="location-container">
                  <div className="location-item">
                    <span className="dot green-dot"></span>
                    <span className="location-text">{row.pickupLocation || 'Pickup Location'}</span>
                  </div>
                  <div className="vertical-line"></div>
                  <div className="location-item">
                    <span className="dot orange-dot"></span>
                    <span className="location-text">{row.dropLocation || 'Drop Location'}</span>
                  </div>
                </div>

                <div className="tags-container">
                  <div className="tag">
                    <span>📦</span> {row.catnm} {row.subcatnm ? `- ${row.subcatnm}` : ''}
                  </div>
                  <div className="tag">
                    <span>📅</span> {row.info ? new Date(row.info).toLocaleDateString() : 'Date'}
                  </div>
                </div>

                <hr className="card-divider" />

                <div className="card-footer">
                  <div className="budget-section">
                    <span className="budget-label">Base Price</span>
                    <span className="budget-amount">₹{row.baseprice}</span>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', marginTop: '20px', width: '100%' }}>
              No products added by you yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Addproduct;