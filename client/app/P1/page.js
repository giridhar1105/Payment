"use client"

import { useEffect } from 'react';

const GooglePay = () => {
  useEffect(() => {
    const loadGooglePayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://pay.google.com/gp/p/js/pay.js';
      script.async = true;
      document.body.appendChild(script);
    };

    loadGooglePayScript();
  }, []);

  const requestPayment = async () => {
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      merchantInfo: {
        merchantId: 'your-merchant-id', // Replace with your Merchant ID
        merchantName: 'Your Merchant Name',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: '10.00', // Replace with the actual amount
        currencyCode: 'USD',
      },
      // Additional configuration can go here
    };

    try {
      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      const paymentToken = paymentData.paymentMethodData.tokenizationData.token; // Extract the payment token

      // Send the payment token to your server
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentToken }),
      });

      const responseData = await response.json();
      console.log('Payment Response:', responseData);
    } catch (error) {
      console.error('Error with Google Pay:', error);
    }
  };

  return (
    <div>
      <h1>Google Pay Payment</h1>
      <button id="google-pay-button" onClick={requestPayment}>
        Pay with Google Pay
      </button>
    </div>
  );
};

export default GooglePay;
