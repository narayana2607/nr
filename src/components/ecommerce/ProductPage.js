import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './ECommerce.css';

// Load Stripe
const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe Publishable Key

const ProductPage = () => {
  const [products] = useState([
    { id: 1, name: 'iPhone 13', price: 799, image: 'https://m.media-amazon.com/images/I/51kVvsTzVhL._AC_SX679_.jpg' },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 699, image: 'https://helios-i.mashable.com/imagery/articles/05dlTp4hFqQv1HZE19rSRE2/hero-image.fill.size_1248x702.v1695053686.jpg' },
    { id: 3, name: 'iPhone 14 Pro', price: 1299, image: 'https://i.pinimg.com/736x/04/b7/9b/04b79b4cdcec72e7ebee3464886d3be5.jpg' },
    { id: 4, name: 'Samsung Laptop', price: 1999, image: 'https://i.pinimg.com/736x/c8/2f/8d/c82f8d7b5f2e251677059b9d78e7ce2c.jpg' },
    { id: 5, name: 'Apple Watch', price: 399, image: 'https://m.media-amazon.com/images/I/51Pzh68ERNL._AC_SY445_.jpg' },
    { id: 6, name: 'iPhone 13', price: 799, image: 'https://m.media-amazon.com/images/I/51kVvsTzVhL._AC_SX679_.jpg' },
    { id: 7, name: 'Samsung Galaxy S24 Ultra', price: 699, image: 'https://helios-i.mashable.com/imagery/articles/05dlTp4hFqQv1HZE19rSRE2/hero-image.fill.size_1248x702.v1695053686.jpg' },
    { id: 8, name: 'iPhone 14 Pro', price: 1299, image: 'https://i.pinimg.com/736x/04/b7/9b/04b79b4cdcec72e7ebee3464886d3be5.jpg' },
    { id: 9, name: 'Samsung Laptop', price: 1999, image: 'https://i.pinimg.com/736x/c8/2f/8d/c82f8d7b5f2e251677059b9d78e7ce2c.jpg' },
    { id: 10, name: 'Apple Watch', price: 399, image: 'https://m.media-amazon.com/images/I/51Pzh68ERNL._AC_SY445_.jpg' },{ id: 1, name: 'iPhone 13', price: 799, image: 'https://m.media-amazon.com/images/I/51kVvsTzVhL._AC_SX679_.jpg' },
    { id: 12, name: 'Samsung Galaxy S24 Ultra', price: 699, image: 'https://helios-i.mashable.com/imagery/articles/05dlTp4hFqQv1HZE19rSRE2/hero-image.fill.size_1248x702.v1695053686.jpg' },
    { id: 13, name: 'iPhone 14 Pro', price: 1299, image: 'https://i.pinimg.com/736x/04/b7/9b/04b79b4cdcec72e7ebee3464886d3be5.jpg' },
    { id: 14, name: 'Samsung Laptop', price: 1999, image: 'https://i.pinimg.com/736x/c8/2f/8d/c82f8d7b5f2e251677059b9d78e7ce2c.jpg' },
    { id: 15, name: 'Apple Watch', price: 399, image: 'https://m.media-amazon.com/images/I/51Pzh68ERNL._AC_SY445_.jpg' },
    { id: 11, name: 'iPhone 13', price: 799, image: 'https://m.media-amazon.com/images/I/51kVvsTzVhL._AC_SX679_.jpg' },
    { id: 22, name: 'Samsung Galaxy S24 Ultra', price: 699, image: 'https://helios-i.mashable.com/imagery/articles/05dlTp4hFqQv1HZE19rSRE2/hero-image.fill.size_1248x702.v1695053686.jpg' },
    { id: 23, name: 'iPhone 14 Pro', price: 1299, image: 'https://i.pinimg.com/736x/04/b7/9b/04b79b4cdcec72e7ebee3464886d3be5.jpg' },
    { id: 24, name: 'Samsung Laptop', price: 1999, image: 'https://i.pinimg.com/736x/c8/2f/8d/c82f8d7b5f2e251677059b9d78e7ce2c.jpg' },
    { id: 25, name: 'Apple Watch', price: 399, image: 'https://m.media-amazon.com/images/I/51Pzh68ERNL._AC_SY445_.jpg' },{ id: 1, name: 'iPhone 13', price: 799, image: 'https://m.media-amazon.com/images/I/51kVvsTzVhL._AC_SX679_.jpg' },
    { id: 26, name: 'Samsung Galaxy S24 Ultra', price: 699, image: 'https://helios-i.mashable.com/imagery/articles/05dlTp4hFqQv1HZE19rSRE2/hero-image.fill.size_1248x702.v1695053686.jpg' },
    { id: 27, name: 'iPhone 14 Pro', price: 1299, image: 'https://i.pinimg.com/736x/04/b7/9b/04b79b4cdcec72e7ebee3464886d3be5.jpg' },
    { id: 28, name: 'Samsung Laptop', price: 1999, image: 'https://i.pinimg.com/736x/c8/2f/8d/c82f8d7b5f2e251677059b9d78e7ce2c.jpg' },
    { id: 29, name: 'Apple Watch', price: 399, image: 'https://m.media-amazon.com/images/I/51Pzh68ERNL._AC_SY445_.jpg' },{ id: 1, name: 'iPhone 13', price: 799, image: 'https://m.media-amazon.com/images/I/51kVvsTzVhL._AC_SX679_.jpg' },
    { id: 30, name: 'Samsung Galaxy S24 Ultra', price: 1699, image: 'https://helios-i.mashable.com/imagery/articles/05dlTp4hFqQv1HZE19rSRE2/hero-image.fill.size_1248x702.v1695053686.jpg' },
    { id: 31, name: 'iPhone 14 Pro', price: 1299, image: 'https://i.pinimg.com/736x/04/b7/9b/04b79b4cdcec72e7ebee3464886d3be5.jpg' },
    { id: 32, name: 'Samsung Laptop', price: 1999, image: 'https://i.pinimg.com/736x/c8/2f/8d/c82f8d7b5f2e251677059b9d78e7ce2c.jpg' },
    { id: 33, name: 'Apple Watch', price: 399, image: 'https://m.media-amazon.com/images/I/51Pzh68ERNL._AC_SY445_.jpg' },{ id: 1, name: 'iPhone 13', price: 799, image: 'https://m.media-amazon.com/images/I/51kVvsTzVhL._AC_SX679_.jpg' },
    { id: 34, name: 'Samsung Galaxy S24 Ultra', price: 699, image: 'https://helios-i.mashable.com/imagery/articles/05dlTp4hFqQv1HZE19rSRE2/hero-image.fill.size_1248x702.v1695053686.jpg' },
    { id: 35, name: 'iPhone 14 Pro', price: 1299, image: 'https://i.pinimg.com/736x/04/b7/9b/04b79b4cdcec72e7ebee3464886d3be5.jpg' },
    { id: 36, name: 'Samsung Laptop', price: 1999, image: 'https://i.pinimg.com/736x/c8/2f/8d/c82f8d7b5f2e251677059b9d78e7ce2c.jpg' },
    { id: 37, name: 'Apple Watch', price: 399, image: 'https://m.media-amazon.com/images/I/51Pzh68ERNL._AC_SY445_.jpg' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // Default payment method
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === product.id);
      if (productInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleStripeCheckout = async () => {
    const stripe = await stripePromise;

    try {
      setIsLoading(true);
      setError('');

      // Fetch the session ID from the backend
      const response = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        setError(`Stripe error: ${result.error.message}`);
      }
    } catch (error) {
      console.error('Error during Stripe checkout:', error);
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDummyPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPaymentStatus('Dummy Payment Successful!');
      setCart([]); // Clear cart after payment
      setIsLoading(false);
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div className="product-page dark-theme">
      {/* Payment Method Selector */}


      <div className="payment-method-selector">
        
        <label>
          <input
            type="radio"
            value="stripe"
            checked={paymentMethod === 'stripe'}
            onChange={() => setPaymentMethod('stripe')}
          />
          Stripe
        </label>
        
        <label>
          <input
            type="radio"
            value="dummy"
            checked={paymentMethod === 'dummy'}
            onChange={() => setPaymentMethod('dummy')}
          />
          Dummy Payment
        </label>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)} className="btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-section">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-image" />
                  <div>
                    <h4>{item.name}</h4>
                    <p>
                      ${item.price} x {item.quantity}
                    </p>
                    <button onClick={() => removeFromCart(item.id)} className="btn-remove">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            {paymentMethod === 'stripe' ? (
              <button
                onClick={handleStripeCheckout}
                className="btn-checkout"
                disabled={isLoading || cart.length === 0}
              >
                {isLoading ? 'Processing...' : 'Proceed with Stripe'}
              </button>
            ) : (
              <button
                onClick={handleDummyPayment}
                className="btn-checkout"
                disabled={isLoading || cart.length === 0}
              >
                {isLoading ? 'Processing...' : 'Proceed with Dummy Payment'}
              </button>
            )}
            {error && <p className="error">{error}</p>}
            {paymentStatus && <p className="success">{paymentStatus}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
