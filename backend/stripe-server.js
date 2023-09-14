const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51NYCQeKoX4yf2BcD38ZV9enuyIuCnYmqKw3v8OxgRRjZX0UgfJiXKnSC8llbu8ZQxkgxMdMurj2GSsXj0j64bE0q00w9u8PYe9');


const allowedOrigins = ['http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const YOUR_DOMAIN1 = 'http://localhost:3000/Confirmation';
const YOUR_DOMAIN2 = 'http://localhost:3000/error'; // Replace with your frontend domain

app.post('/create-checkout-session', async (req, res) => {
  const { title, price, images } = req.body;

  try {
    if (!title || isNaN(price) || price <= 0 || !images || !Array.isArray(images)) {
      return res.status(400).json({ error: 'Invalid title, price, or images.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: title,
              images: images, // Include the images in line_items
            },
            unit_amount: Math.floor(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN1}?success=true`,
      cancel_url: `${YOUR_DOMAIN2}?canceled=true`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
  }
});


app.listen(4242, () => console.log('Running on port 4242'));
