import "./SearchProduct.css";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaSearch,
  FaArrowLeft,
  FaBoxOpen,
  FaTags,
  FaRupeeSign,
  FaChevronRight,
  FaLayerGroup
} from "react-icons/fa";

import {
  __categoryapiurl,
  __subcategoryapiurl,
  __productapiurl
} from "../../API_URL";

// NOTE: adjust this if your uploads folder is served from a different
// static path on the backend (server.js doesn't show an express.static
// mount yet, so this is the assumed convention — falls back to a plain
// icon automatically if the image 404s).
const CATICON_BASE = "https://mover-packer-1.onrender.com/assets/uploads/caticons/";
const PRODUCTICON_BASE = "https://mover-packer-1.onrender.com/assets/uploads/producticon/";

function SearchProduct() {

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [view, setView] = useState("categories"); // categories | subcategories | products | search
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: load every category admin has added
  useEffect(() => {
    axios
      .get(__categoryapiurl + "fetch")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.log(err);
        setCategories([]);
      });
  }, []);

  // Step 2: category card clicked -> load its subcategories
  const openCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(null);
    setLoading(true);

    axios
      .get(__subcategoryapiurl + "fetch", {
        params: { catnm: cat.catnm }
      })
      .then((res) => {
        setSubcategories(res.data);
        setView("subcategories");
      })
      .catch((err) => {
        console.log(err);
        setSubcategories([]);
        setView("subcategories");
      })
      .finally(() => setLoading(false));
  };

  // Step 3: subcategory card clicked -> load matching products
  const openSubcategory = (sub) => {
    setSelectedSubcategory(sub);
    setLoading(true);

    axios
      .get(__productapiurl + "fetch", {
        params: {
          condition_obj: {
            catnm: selectedCategory.catnm,
            subcatnm: sub.subcatnm
          }
        }
      })
      .then((res) => {
        setProducts(res.data);
        setView("products");
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
        setView("products");
      })
      .finally(() => setLoading(false));
  };

  // Top search bar -> search products directly by title
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSelectedCategory(null);
    setSelectedSubcategory(null);

    axios
      .get(__productapiurl + "fetch", {
        params: {
          condition_obj: {
            title: { $regex: searchTerm.trim(), $options: "i" }
          }
        }
      })
      .then((res) => {
        setProducts(res.data);
        setView("search");
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
        setView("search");
      })
      .finally(() => setLoading(false));
  };

  const goToCategories = () => {
    setView("categories");
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchTerm("");
  };

  const goToSubcategories = () => {
    setView("subcategories");
    setSelectedSubcategory(null);
  };

  return (
    <div className="searchPage">

      {/* Header + search bar */}
      <div className="searchHeader">

        <div>
          <span className="searchEyebrow">BROWSE CATALOG</span>
          <h1>Search Products</h1>
          <p>Pick a category, then a subcategory — or just search by name.</p>
        </div>

        <form className="searchBar" onSubmit={handleSearchSubmit}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">

        <span
          className={view === "categories" ? "crumb active" : "crumb"}
          onClick={goToCategories}
        >
          Categories
        </span>

        {selectedCategory && view !== "search" && (
          <>
            <FaChevronRight />
            <span
              className={view === "subcategories" ? "crumb active" : "crumb"}
              onClick={goToSubcategories}
            >
              {selectedCategory.catnm}
            </span>
          </>
        )}

        {selectedSubcategory && view === "products" && (
          <>
            <FaChevronRight />
            <span className="crumb active">
              {selectedSubcategory.subcatnm}
            </span>
          </>
        )}

        {view === "search" && (
          <>
            <FaChevronRight />
            <span className="crumb active">
              Results for "{searchTerm}"
            </span>
          </>
        )}

      </div>

      {loading && <div className="loadingBar">Loading...</div>}

      {/* ===================== Categories ===================== */}
      {!loading && view === "categories" && (

        <div className="cardGrid">

          {categories.map((cat) => (
            <div
              className="catCard"
              key={cat._id}
              onClick={() => openCategory(cat)}
            >
              <div className="catIconWrap">
                {cat.catIconnm ? (
                  <img
                    src={CATICON_BASE + cat.catIconnm}
                    alt={cat.catnm}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div className="catIconFallback">
                  <FaLayerGroup />
                </div>
              </div>

              <h3>{cat.catnm}</h3>
              <span className="catArrow"><FaChevronRight /></span>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="emptyState">
              <FaBoxOpen />
              <h3>No categories yet</h3>
              <p>Categories added by admin will show up here.</p>
            </div>
          )}

        </div>

      )}

      {/* ===================== Subcategories ===================== */}
      {!loading && view === "subcategories" && (

        <div className="cardGrid">

          <button className="backBtn" onClick={goToCategories}>
            <FaArrowLeft /> All Categories
          </button>

          {subcategories.map((sub) => (
            <div
              className="catCard"
              key={sub._id}
              onClick={() => openSubcategory(sub)}
            >
              <div className="catIconWrap">
                {sub.subcaticonnm ? (
                  <img
                    src={CATICON_BASE + sub.subcaticonnm}
                    alt={sub.subcatnm}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div className="catIconFallback">
                  <FaTags />
                </div>
              </div>

              <h3>{sub.subcatnm}</h3>
              <span className="catArrow"><FaChevronRight /></span>
            </div>
          ))}

          {subcategories.length === 0 && (
            <div className="emptyState">
              <FaTags />
              <h3>No subcategories here</h3>
              <p>This category doesn't have any subcategories yet.</p>
            </div>
          )}

        </div>

      )}

      {/* ===================== Products (from subcategory or search) ===================== */}
      {!loading && (view === "products" || view === "search") && (

        <div className="productGrid">

          <button
            className="backBtn"
            onClick={view === "products" ? goToSubcategories : goToCategories}
          >
            <FaArrowLeft /> {view === "products" ? "Back to Subcategories" : "Back to Categories"}
          </button>

          {products.map((p) => (
            <div className="productCard" key={p._id}>

              <div className="productImgWrap">
                {p.piconnm ? (
                  <img
                    src={PRODUCTICON_BASE + p.piconnm}
                    alt={p.title}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div className="productImgFallback">
                  <FaBoxOpen />
                </div>
              </div>

              <h3>{p.title}</h3>

              <div className="productTags">
                <span className="tagChip"><FaLayerGroup /> {p.catnm}</span>
                <span className="tagChip"><FaTags /> {p.subcatnm}</span>
              </div>

              <div className="productPrice">
                <FaRupeeSign />
                <span>{p.baseprice}</span>
              </div>

            </div>
          ))}

          {products.length === 0 && (
            <div className="emptyState">
              <FaBoxOpen />
              <h3>No products found</h3>
              <p>Try a different category, subcategory or search term.</p>
            </div>
          )}

        </div>

      )}

    </div>
  );
}

export default SearchProduct;