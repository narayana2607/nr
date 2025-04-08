import React, { useState, useEffect, useRef } from 'react';
import './FoodHome.css';
import foodmain1 from '../images/foodmain1.jpg';

const FoodHome = () => {
  const [items] = useState([
    { category: 'Appetizers', title: 'Bruschetta', description: 'Grilled bread topped with fresh tomatoes, basil, and olive oil.', price: 7.99, image: 'https://images.unsplash.com/photo-1580476262700-c45559492895?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Appetizers', title: 'Mozzarella Sticks', description: 'Crispy fried mozzarella served with marinara sauce.', price: 8.49, image: 'https://plus.unsplash.com/premium_photo-1664647352697-b08e7552594a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Appetizers', title: 'Stuffed Mushrooms', description: 'Mushroom caps stuffed with a savory cheese and herb filling.', price: 9.99, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Appetizers', title: 'Spinach Artichoke Dip', description: 'Creamy dip served with warm tortilla chips.', price: 8.99, image: 'https://images.unsplash.com/photo-1627845231704-54f558b21b75?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Appetizers', title: 'Garlic Parmesan Wings', description: 'Oven-baked wings tossed in garlic parmesan sauce.', price: 10.99, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Appetizers', title: 'Loaded Nachos', description: 'Tortilla chips topped with cheese, jalapeños, sour cream, and guacamole.', price: 11.49, image: 'https://images.unsplash.com/photo-1571127455795-94fd49865a1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Appetizers', title: 'Shrimp Cocktail', description: 'Chilled shrimp served with zesty cocktail sauce.', price: 12.49, image: 'https://images.unsplash.com/photo-1614777774511-789989745564?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Appetizers', title: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze.', price: 8.99, image: 'https://images.unsplash.com/photo-1574484284464-a75177462e67?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Appetizers', title: 'Mini Crab Cakes', description: 'Golden brown crab cakes with remoulade sauce.', price: 12.99, image: 'https://images.unsplash.com/photo-1628157411678-712964727497?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D' },
    { category: 'Appetizers', title: 'Deviled Eggs', description: 'Classic deviled eggs with a hint of paprika.', price: 7.49, image: 'https://images.unsplash.com/photo-1614777774511-789989745564?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

    { category: 'Main Courses', title: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and fresh basil.', price: 12.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Desserts', title: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center.', price: 7.99, image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cartWarning, setCartWarning] = useState('');
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const cartModalRef = useRef(null);
  const addNotificationTimeout = useRef(null);

  // Search functionality
   // Search functionality
   useEffect(() => {
    setFilteredItems(
      items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

  // Add item to cart with notification
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.title === item.title);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    
    setAddedItem(item);
    setShowAddNotification(true);
    setCartWarning('');
    
    if (addNotificationTimeout.current) {
      clearTimeout(addNotificationTimeout.current);
    }
    
    addNotificationTimeout.current = setTimeout(() => {
      setShowAddNotification(false);
    }, 2000);
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.title === item.title);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.title !== item.title);
      }
    });
  };

  // Confirm order
  const confirmOrder = () => {
    if (cart.length > 0 && paymentMethod) {
      setOrderSuccess(true);
      setCart([]);
      setPaymentMethod('');
      setTimeout(() => setOrderSuccess(false), 3000);
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isCartOpen) {
        setIsCartOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      if (addNotificationTimeout.current) {
        clearTimeout(addNotificationTimeout.current);
      }
    };
  }, [isCartOpen]);

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleViewCart = () => {
    if (cart.length === 0) {
      setCartWarning('Please add items to your cart before viewing it.');
    } else {
      setIsCartOpen(true);
      setCartWarning('');
    }
  };

  // Render cart modal
  const renderCart = () => (
    <div className={`cart-modal ${isCartOpen ? 'open' : ''}`} ref={cartModalRef}>
      <div className="cart-modal-content">
        <h3>Your Order</h3>
        {cart.length > 0 ? (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-info">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <div>
                      <span className="cart-item-title">
                        {item.title} (x{item.quantity})
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="cart-item-quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(item)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <strong>Total:</strong> <span>${calculateTotal()}</span>
            </div>
            <div className="payment-options">
              <strong>Payment Method:</strong>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Card
              </label>
              {!paymentMethod && <p className="payment-warning">Please select a payment method.</p>}
            </div>
            <div className="cart-buttons">
              <button
                className="confirm-order-button"
                onClick={confirmOrder}
                disabled={!paymentMethod}
              >
                Confirm Order
              </button>
              <button className="close-cart-button" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bar-home-container">
      <div className="bar-hero-section" style={{ backgroundImage: `url(${foodmain1})` }}>
        <h1 className="bar-hero-text">Welcome to NNR BAR & RESTAURANT</h1>
        <p className="bar-hero-subtext">Delicious food, cozy ambiance</p>
      </div>

      <section id="menu-section" className="bar-menu-items-section">
        <h2>Menu</h2>
        <div className="bar-menu-controls">
          <input
            type="text"
            className="bar-search-input"
            placeholder="Search for an item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="view-cart-button" onClick={handleViewCart}>
            View Cart ({cart.length})
          </button>
        </div>
        {cartWarning && <p className="cart-warning">{cartWarning}</p>}
        <div className="bar-menu-items">
          {filteredItems.map((item, index) => (
            <div key={index} className="bar-menu-item">
              <div className="bar-menu-item-image-container">
                <img src={item.image} alt={item.title} className="bar-menu-item-image" />
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <p>
                <strong>${item.price.toFixed(2)}</strong>
              </p>
              <button className="bar-order-button" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Add to Cart Notification */}
      {showAddNotification && (
        <div className="add-to-cart-notification">
          <span className="notification-text">
            Added {addedItem?.title} to cart!
          </span>
          <button 
            className="view-cart-now-button"
            onClick={() => {
              setIsCartOpen(true);
              setShowAddNotification(false);
            }}
          >
            View Cart
          </button>
        </div>
      )}

      {isCartOpen && renderCart()}

      {orderSuccess && <div className="order-success-notification">Order placed successfully!</div>}
    </div>
  );
};

export default FoodHome;