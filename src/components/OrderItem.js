import Card from "./ui/Card";
import OptimizedImage from "./ui/OptimizedImage";
import "./OrderItem.css";

const OrderItem = props => {
  const { orderItem } = props;
  
  return (
    <Card className="order-item-card" variant="default" padding="medium">
      <div className="order-item-content">
        <div className="order-item-image">
          <OptimizedImage
            src={orderItem.image || "https://bulma.io/images/placeholders/128x128.png"}
            alt={orderItem.shortDesc || orderItem.name}
            width={64}
            height={64}
            className="order-item-img"
          />
        </div>
        
        <div className="order-item-details">
          <h3 className="order-item-name">{orderItem.name}</h3>
          <div className="order-item-meta">
            <span className="order-item-price">₹{orderItem.oprice}</span>
            {orderItem.quantity && (
              <span className="order-item-quantity">Qty: {orderItem.quantity}</span>
            )}
          </div>
          {orderItem.shortDesc && (
            <p className="order-item-description">{orderItem.shortDesc}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OrderItem;