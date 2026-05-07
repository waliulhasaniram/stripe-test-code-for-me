require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');
const express = require('express');
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

//middleware
app.use(cors());
app.use(express.json());


//routes
app.get('/', async (req, res) => {
    res.send('Hello stripe');
});

//listen
app.listen(port, () => console.log(`Server running on port ${port}`));