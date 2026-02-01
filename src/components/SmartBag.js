import React from "react";
import withContext from "../withContext";
import { Link } from "react-router-dom";
import { Card, Button, Layout, Breadcrumb } from "./ui";

const SmartBag = props => {
  const { user } = props.context;
  
  // Breadcrumb configuration
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Smart Bag', href: '/smart-bag', icon: 'cart', isActive: true }
  ];
  
  if (!user || !user.smartbag) {
    return (
      <Layout.Page
        title="Smart Bag"
        subtitle="Your personalized shopping recommendations"
        breadcrumbs={<Breadcrumb items={breadcrumbItems} />}
      >
        <div className="empty-state">
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z" />
              </svg>
            </div>
            <h3 className="empty-state-title">Please log in to view Smart Bag</h3>
            <p className="empty-state-description">
              Your smart bag contains personalized product recommendations based on your shopping preferences.
            </p>
            <Button as={Link} to="/login" variant="primary" size="large">
              Log In
            </Button>
          </div>
        </div>
      </Layout.Page>
    );
  }
  
  const keys = Object.keys(user.smartbag);
  
  if (keys.length === 0) {
    return (
      <Layout.Page
        title="Smart Bag"
        subtitle="Your personalized shopping recommendations"
        breadcrumbs={<Breadcrumb items={breadcrumbItems} />}
      >
        <div className="empty-state">
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z" />
              </svg>
            </div>
            <h3 className="empty-state-title">Your Smart Bag is Empty</h3>
            <p className="empty-state-description">
              Start shopping to get personalized recommendations in your smart bag.
            </p>
            <Button as={Link} to="/products" variant="primary" size="large">
              Start Shopping
            </Button>
          </div>
        </div>
      </Layout.Page>
    );
  }
  
  return (
    <Layout.Page
      title="Smart Bag"
      subtitle="Your personalized shopping recommendations"
      breadcrumbs={<Breadcrumb items={breadcrumbItems} />}
    >
      <div className="smartbag-categories">
        {keys.map((key) => (
          <Link key={key} to={`/smartbag/${key}`} className="smartbag-category-link">
            <Card hover className="smartbag-category-card">
              <Card.Body>
                <div className="smartbag-category-content">
                  <div className="smartbag-category-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z" />
                    </svg>
                  </div>
                  <h3 className="smartbag-category-title">
                    {key
                      .toLowerCase()
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </h3>
                  <p className="smartbag-category-description">
                    Discover personalized recommendations
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </Layout.Page>
  );
};

export default withContext(SmartBag);