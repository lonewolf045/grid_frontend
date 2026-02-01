import React, { useState, memo } from "react";
import { Card, Button, OptimizedImage } from "./ui";
import "./CartItem.css";

const CartItem = memo(props => {
  const { cartItem, cartKey } = props;
  const { product, amount } = cartItem;
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await props.removeFromCart(cartKey);
    } finally {
      setIsRemoving(false);
    }
  };

  const itemTotal = (product.dprice || 0) * (amount || 0);

  return (
    <Card className="cart-item" padding="medium" hover>
      <div className="cart-item-content">
        {/* Product Image */}
        <div className="cart-item-image">
          <OptimizedImage
            src={product.image || "https://bulma.io/images/placeholders/128x128.png"}
            alt={product.shortDesc || product.name}
            width={80}
            height={80}
            className="cart-item-img"
          />
        </div>
        
        {/* Product Details */}
        <div className="cart-item-details">
          <h4 className="cart-item-name">{product.name}</h4>
          {product.shortDesc && (
            <p className="cart-item-description">{product.shortDesc}</p>
          )}
          <div className="cart-item-meta">
            <span className="cart-item-price">₹{product.dprice}</span>
            <span className="cart-item-quantity">Qty: {amount}</span>
          </div>
        </div>
        
        {/* Item Total & Actions */}
        <div className="cart-item-actions">
          <div className="cart-item-total">
            <span className="total-label">Total:</span>
            <span className="total-amount">₹{itemTotal.toFixed(2)}</span>
          </div>
          <Button
            onClick={handleRemove}
            variant="danger"
            size="small"
            loading={isRemoving}
            disabled={isRemoving}
            className="remove-button"
          >
            {isRemoving ? 'Removing...' : 'Remove'}
          </Button>
        </div>
      </div>
    </Card>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;