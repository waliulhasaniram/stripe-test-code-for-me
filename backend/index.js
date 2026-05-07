require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const uuid = require("uuid").v4;

//middleware
app.use(
  cors(
    (corsOptions = {
      origin: "http://localhost:5173",
      methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    }),
  ),
);
app.use(express.json());

//routes
app.get("/", async (req, res) => {
  res.send("Hello stripe");
});

app.post("/checkout", async (req, res) => {
  const { product, token } = req.body;
  console.log("Product", product);
  console.log("Price", product.price);
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      return stripe.charges.create(
        {
          amount: product.price * 100, // Stripe expects amount in cents
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey },
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

//listen
app.listen(port, () => console.log(`Server running on port ${port}`));
