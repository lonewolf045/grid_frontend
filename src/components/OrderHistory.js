import { Link } from "react-router-dom";
import withContext from "../withContext";
import Layout from "./layout/Layout";
import Card from "./ui/Card";
import Breadcrumb from "./ui/Breadcrumb";
import "./OrderHistory.css";

const OrderHistory = props => {
  const { user } = props.context;
  
  // Breadcrumb configuration
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Order History', href: '/order-history', icon: 'user', isActive: true }
  ];
  
  if (!user || !user.orderHis) {
    return (
      <Layout.Page
        title="Order History"
        subtitle="View your past orders and track their status"
        breadcrumbs={<Breadcrumb items={breadcrumbItems} />}
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
            <h3 className="empty-state-title">Please log in to view Order History</h3>
            <p className="empty-state-description">
              You need to be logged in to access your order history and track your purchases.
            </p>
            <div className="empty-state-actions">
              <Link to="/login" className="btn btn--primary">
                Log In
              </Link>
              <Link to="/signup" className="btn btn--secondary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </Layout.Page>
    );
  }
  
  const orderHis = user.orderHis;
  const keys = Object.keys(orderHis || {});
  
  if (keys.length === 0) {
    return (
      <Layout.Page
        title="Order History"
        subtitle="View your past orders and track their status"
        breadcrumbs={<Breadcrumb items={breadcrumbItems} />}
      >
        <div className="empty-state">
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                <path d="M12 3v18" />
              </svg>
            </div>
            <h3 className="empty-state-title">No orders yet</h3>
            <p className="empty-state-description">
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
            <div className="empty-state-actions">
              <Link to="/" className="btn btn--primary">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </Layout.Page>
    );
  }
  
  return (
    <Layout.Page
      title="Order History"
      subtitle={`You have ${keys.length} order${keys.length !== 1 ? 's' : ''}`}
      breadcrumbs={<Breadcrumb items={breadcrumbItems} />}
    >
      <div className="order-history-grid">
        {keys.map((key) => (
          <Card
            key={key}
            variant="interactive"
            hover={true}
            clickable={true}
            as={Link}
            to={`/orderHis/${key}`}
            className="order-history-card"
          >
            <Card.Header>
              <div className="order-card-header">
                <div className="order-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                    <path d="M12 3v18" />
                  </svg>
                </div>
                <div className="order-status">
                  <span className="status-badge status-badge--completed">Completed</span>
                </div>
              </div>
            </Card.Header>
            
            <Card.Body>
              <Card.Title level={3}>
                Order #{key}
              </Card.Title>
              <Card.Description>
                Click to view order details and items
              </Card.Description>
            </Card.Body>
            
            <Card.Footer>
              <div className="order-card-footer">
                <span className="order-date">
                  View Details →
                </span>
              </div>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </Layout.Page>
  );
};

export default withContext(OrderHistory);