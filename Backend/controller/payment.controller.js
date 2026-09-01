import Stripe from 'stripe';

let stripe;
function getStripe() {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

async function Gateway(req, res) {
  try {
    const stripe = getStripe();
    const { amount, bidId, pid, p_title, useremail, transporter_email } = req.body;

    const product = await stripe.products.create({
      name: `Transport Booking: ${p_title || 'Mover Service'}`,
      description: `Transporter: ${transporter_email || 'Verified Transporter'}`,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(Number(amount) * 100), // INR to Paisa conversion
      currency: "inr",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      // Payment success hone par bidId & pid query params me bhejenge
      success_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/user/payment-success?bidId=${bidId}&pid=${pid}&amount=${amount}`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/user/Quotetion?payment=cancelled`,
      customer_email: useremail || "customer@gmail.com",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default Gateway;