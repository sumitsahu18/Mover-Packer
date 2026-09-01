import "./MyProducts.css";

function MyProducts({ productList = [] }) {

  return (
    <div className="myProductsContainer">

      <div className="myProductsTitle">
        My Added Products
      </div>

      <div className="productsGrid">

        {productList.map((row,index)=>(
          <div className="productCard" key={index}>

            <div className="productImageBox">

              <img
                src={row.producticon}
                alt=""
                className="productImage"
              />

            </div>

            <div className="productContent">

              <h3>{row.title}</h3>

              <p>{row.description}</p>

              <div className="priceBox">
                ₹ {row.baseprice}
              </div>

              <div className="locationInfo">

                <div>
                  <strong>Pickup:</strong>
                  <span>{row.pickupLocation}</span>
                </div>

                <div>
                  <strong>Drop:</strong>
                  <span>{row.dropLocation}</span>
                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyProducts;