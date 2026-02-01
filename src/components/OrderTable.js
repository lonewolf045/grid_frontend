import OrderItem from "./OrderItem";
import withContext from "../withContext";
import { useParams } from "react-router-dom";
import Layout from "./layout/Layout";
import Breadcrumb from "./ui/Breadcrumb";
import "./OrderTable.css";

const OrderTable = (props) => {
  const { user } = props.context;
  const { key } = useParams();
  
  // Get order data from user context
  const orderList = user?.orderHis;
  
  if (!user) {
    return (
      <Layout.Page
        title="Order Details"
        subtitle="Please log in to view order details"
        breadcrumbs={
          <Breadcrumb items={[
            { label: 'Home', href: '/', icon: 'home' },
            { label: 'Order History', href: '/order-history', icon: 'user' },
            { label: 'Order Details', href: `/orderHis/${key}`, isActive: true }
          ]} />
        }
      >
        <div className="empty-state">
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
            </div>
            <h3 className="empty-state-title">Please log in</h3>
            <p className="empty-state-description">
              You need to be logged in to view order details.
            </p>
          </div>
        </div>
      </Layout.Page>
    );
  }
  
  if (!orderList || !orderList[key]) {
    return (
      <Layout.Page
        title="Order Details"
        subtitle="Order not found"
        breadcrumbs={
          <Breadcrumb items={[
            { label: 'Home', href: '/', icon: 'home' },
            { label: 'Order History', href: '/order-history', icon: 'user' },
            { label: 'Order Details', href: `/orderHis/${key}`, isActive: true }
          ]} />
        }
      >
        <div className="empty-state">
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16l-4-4-4 4" />
                <path d="M12 8v8" />
              </svg>
            </div>
            <h3 className="empty-state-title">Order Not Found</h3>
            <p className="empty-state-description">
              The order you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </Layout.Page>
    );
  }
  
  const orders = orderList[key].pro_det;
  const orderInfo = orderList[key];
  
  // Calculate order total from products
  const orderTotal = orders?.reduce((total, item) => {
    return total + (parseFloat(item.dprice) || 0);
  }, 0) || 0;
  
  return (
    <Layout.Page
      title={`Order #${key}`}
      subtitle={`${orders?.length || 0} item${orders?.length !== 1 ? 's' : ''} in this order`}
      breadcrumbs={
        <Breadcrumb items={[
          { label: 'Home', href: '/', icon: 'home' },
          { label: 'Order History', href: '/order-history', icon: 'user' },
          { label: `Order #${key}`, href: `/orderHis/${key}`, isActive: true }
        ]} />
      }
    >
      {/* Order Summary */}
      {orderInfo && (
        <div className="order-summary">
          <div className="order-summary-header">
            <h3>Order Summary</h3>
            <div className="order-status">
              <span className="status-badge status-badge--completed">Completed</span>
            </div>
          </div>
          <div className="order-details">
            <div className="order-detail-item">
              <span className="detail-label">Order Date:</span>
              <span className="detail-value">Day {orderInfo.day_of_month}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Items Count:</span>
              <span className="detail-value">{orders?.length || 0} items</span>
            </div>
            <div className="order-total">
              <span className="total-label">Total Amount:</span>
              <span className="total-amount">₹{orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Order Items */}
      <div className="order-items-section">
        <h3 className="section-title">Order Items</h3>
        <div className="order-items-grid">
          {orders && orders.length ? (
            orders.map((order, index) => (
              <OrderItem key={index} orderItem={order} />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-content">
                <div className="empty-state-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l-1 7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 9z" />
                  </svg>
                </div>
                <h3 className="empty-state-title">No products found</h3>
                <p className="empty-state-description">
                  This order appears to be empty or the products couldn't be loaded.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout.Page>
  );
};

export default withContext(OrderTable);