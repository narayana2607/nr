import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Load Stripe with Publishable Key
const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual key

const PaymentComponent = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch client secret from backend
  const fetchPaymentIntent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment intent');
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      setPaymentStatus('Failed to start payment. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setPaymentStatus(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment successful!');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('Payment failed. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Payment</h2>
      {paymentStatus && <p>{paymentStatus}</p>}

      {!clientSecret ? (
        <button onClick={fetchPaymentIntent} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Start Payment'}
        </button>
      ) : (
        <form onSubmit={handlePayment}>
          <CardElement />
          <button type="submit" disabled={!stripe || isLoading}>
            {isLoading ? 'Processing...' : `Pay $${totalAmount}`}
          </button>
        </form>
      )}
    </div>
  );
};

const PaymentPage = ({ totalAmount }) => (
  <Elements stripe={stripePromise}>
    <PaymentComponent totalAmount={totalAmount} />
  </Elements>
);

export default PaymentPage;
