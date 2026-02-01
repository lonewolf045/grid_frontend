import Card from "./ui/Card";
import OptimizedImage from "./ui/OptimizedImage";
import "./OrderItem.css";

const OrderItem = props => {
  const { orderItem } = props;
  
  return (
    <Card className="order-item-card" variant="default" padding="medium">
      <div className="order-item-content">
        <div className="order-item-image">
          <OptimizedImage.Product
            imageName={orderItem.item_id}
            productName={orderItem.name}
            context="order"
            className="order-item-img"
            width={64}
            height={64}
            placeholder="/images/placeholder-product.jpg"
            fallback="/images/default-product.jpg"
          />
        </div>
        
        <div className="order-item-details">
          <h3 className="order-item-name">{orderItem.name}</h3>
          <div className="order-item-meta">
            <div className="price-info">
              {orderItem.discount > 0 ? (
                <>
                  <span className="order-item-price current">₹{orderItem.dprice}</span>
                  <span className="order-item-price original">₹{orderItem.oprice}</span>
                  <span className="discount-badge">{orderItem.discount}% OFF</span>
                </>
              ) : (
                <span className="order-item-price">₹{orderItem.oprice}</span>
              )}
            </div>
            {orderItem.quantity && (
              <span className="order-item-quantity">Qty: {orderItem.quantity}g</span>
            )}
          </div>
          <div className="order-item-category">
            <span className="category-path">
              {orderItem.major} → {orderItem.minor} → {orderItem.typeP}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderItem;