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
    const { paymentToken } = req.body; 

    try {const express = require('express');
      const bodyParser = require('body-parser');
      const axios = require('axios');
      const cors = require('cors'); 
      require('dotenv').config();
      
      const app = express();
      const PORT = process.env.PORT || 4000;
      
      app.use(cors());
      app.use(bodyParser.json());
      
      async function createPaymentHandler(req, res) {
        if (req.method === 'POST') {
          const { paymentToken } = req.body;
      
          if (!paymentToken) {
            return res.status(400).json({ error: 'Payment token is required' });
          }
      
          try {
            const paymentGatewayResponse = await axios.post('https://zerotize.in/api_payment_init', {
              amount: 10000,
              currency: 'inr',
              payment_method: paymentToken,
              confirmation_method: 'manual', 
              confirm: true, 
            }, {
              headers: {
                'Authorization': `Bearer ${process.env.PAYMENT_GATEWAY_SECRET}`,
                'Content-Type': 'application/json',
              },
            });
      
            return res.status(200).json(paymentGatewayResponse.data);
          } catch (error) {
            console.error('Error processing payment:', error.response ? error.response.data : error.message);
            return res.status(500).json({ error: 'Payment processing error' });
          }
        } else {
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`Method ${req.method} Not Allowed`);
        }
      }
      
      app.post('/api/create-payment', createPaymentHandler);
      
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
      
      const paymentGatewayResponse = await axios.post('https://zerotize.in/api_payment_init', {
        amount: 10000,
        currency: 'inr',
        payment_method: paymentToken,
        confirmation_method: 'manual',
        confirm: true, 
      }, {
        headers: {
          'Authorization': `hwXjBHKMs6fOLGsf`,
          'Content-Type': 'application/json',
        },
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

app.post('/api/create-payment', createPaymentHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
