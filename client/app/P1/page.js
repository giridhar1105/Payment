"use client";

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
        merchantId: '5452805218',
        merchantName: 'Giridhar',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: '100.00',
        currencyCode: 'INR',
      },
    };

    try {
      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      const paymentToken = paymentData.paymentMethodData.tokenizationData.token;

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-5">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Google Pay Payment</h1>
      <button
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none"
        onClick={requestPayment}
      >
        Pay with Google Pay
      </button>
    </div>
  );
};

export default GooglePay;
