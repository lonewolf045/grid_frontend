import React, { useState, useMemo } from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";
import { Layout, Breadcrumb, Button, Card } from "./ui";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = props => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate cart totals
  const cartSummary = useMemo(() => {
    let subtotal = 0;
    let totalItems = 0;
    
    cartKeys.forEach(key => {
      const item = cart[key];
      subtotal += (item.product.dprice || 0) * (item.amount || 0);
      totalItems += item.amount || 0;
    });
    
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
    const total = subtotal + tax + shipping;
    
    return {
      subtotal,
      tax,
      shipping,
      total,
      totalItems
    };
  }, [cart, cartKeys]);

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Cart', href: '/cart', icon: 'cart', isActive: true }
  ];

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await props.context.checkout();
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Layout.Page 
      title="Shopping Cart"
      subtitle={cartKeys.length ? `${cartSummary.totalItems} item${cartSummary.totalItems !== 1 ? 's' : ''} in your cart` : "Your cart is empty"}
      breadcrumbs={<Breadcrumb items={breadcrumbItems} />}
    >
      {cartKeys.length ? (
        <div className="cart-layout">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            <Card className="cart-items-card" padding="medium">
              <Card.Header>
                <Card.Title level={3}>Items in Cart</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="cart-items-list">
                  {cartKeys.map(key => (
                    <CartItem
                      cartKey={key}
                      key={key}
                      cartItem={cart[key]}
                      removeFromCart={props.context.removeFromCart}
                    />
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
          
          {/* Cart Summary Section */}
          <div className="cart-summary-section">
            <Card className="cart-summary-card" padding="medium" variant="secondary">
              <Card.Header>
                <Card.Title level={3}>Order Summary</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="cart-summary-details">
                  <div className="summary-row">
                    <span>Subtotal ({cartSummary.totalItems} items)</span>
                    <span>₹{cartSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (10%)</span>
                    <span>₹{cartSummary.tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>
                      {cartSummary.shipping === 0 ? (
                        <span className="free-shipping">FREE</span>
                      ) : (
                        `₹${cartSummary.shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {cartSummary.shipping > 0 && (
                    <div className="shipping-notice">
                      <small>Free shipping on orders over ₹500</small>
                    </div>
                  )}
                  <div className="summary-divider"></div>
                  <div className="summary-row summary-total">
                    <span>Total</span>
                    <span>₹{cartSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="cart-summary-actions">
                  <Button
                    onClick={handleCheckout}
                    variant="primary"
                    size="large"
                    fullWidth
                    loading={isCheckingOut}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>
                  <Button
                    onClick={props.context.clearCart}
                    variant="outline"
                    size="medium"
                    fullWidth
                  >
                    Clear Cart
                  </Button>
                </div>
              </Card.Footer>
            </Card>
            
            {/* Continue Shopping */}
            <div className="continue-shopping">
              <Link to="/products" className="continue-shopping-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <div className="cart-empty-content">
            <div className="cart-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <h3 className="cart-empty-title">Your cart is empty</h3>
            <p className="cart-empty-description">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <div className="cart-empty-actions">
              <Button
                as={Link}
                to="/products"
                variant="primary"
                size="large"
              >
                Start Shopping
              </Button>
              <Button
                as={Link}
                to="/deal/Popular"
                variant="outline"
                size="large"
              >
                View Popular Items
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout.Page>
  );
};

export default withContext(Cart);