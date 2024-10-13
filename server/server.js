const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Payment handler
async function createPaymentHandler(req, res) {
  if (req.method === 'POST') {
    const { paymentToken } = req.body; // Expecting a payment token from Google Pay

    try {
      // Use the payment token to process payment with your payment processor
      const paymentGatewayResponse = await axios.post('https://your-payment-gateway.com/api/pay', {
        token: paymentToken,
      });

      return res.status(200).json(paymentGatewayResponse.data);
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).json({ error: 'Payment processing error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Define the POST route for creating payments
app.post('/api/create-payment', createPaymentHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
