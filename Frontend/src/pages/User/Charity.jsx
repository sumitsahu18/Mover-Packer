import "./Charity.css";
import axios from "axios";
import { useState } from "react";
import { __paymentapiurl } from "../../API_URL";

function Charity() {

  const [amount, setAmount] = useState("");

  const makePayment = async () => {

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {

      const response = await axios.post(__paymentapiurl, {
        amount: Number(amount),
      });

      window.open(response.data.url, "_self");

    } catch (err) {
      console.log(err);
      alert("Payment Failed");
    }
  };

  return (
    <div className="paymentContainer">

      <div className="paymentCard">

        <div className="paymentIcon">
          🚚
        </div>

        <h1>Transport Payment</h1>

        <p>
          Enter the amount you want to pay for transportation.
          Your payment is processed securely through Stripe.
        </p>

        <div className="paymentDetails">

          <label>Enter Transport Amount</label>

          <input
            type="number"
            placeholder="Enter Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="paymentRow total">
            <span>Total Amount</span>
            <strong>
              ₹{amount ? amount : 0}
            </strong>
          </div>

        </div>

        <button
          className="paymentBtn"
          onClick={makePayment}
        >
          Proceed To Payment
        </button>

      </div>

    </div>
  );
}

export default Charity;