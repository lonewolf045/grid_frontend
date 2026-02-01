import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Layout } from "./ui";
import withContext from "../withContext";
import "./FrontPage.css";

const FrontPage = (props) => {
  // const { products } = props.context; // Available for future use

  const categories = [
    {
      title: "Snacks and Beverages",
      description: "Delicious snacks and refreshing drinks for every occasion",
      link: "/labels/snacks & beverages",
      color: "primary",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    },
    {
      title: "Packaged Food",
      description: "Quality packaged foods for your daily meals",
      link: "/labels/packaged food",
      color: "secondary",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-2 13H5L3 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4" />
        </svg>
      )
    }
  ];

  const deals = [
    {
      title: "Popular Products",
      description: "Customer favorites and trending items",
      link: "/deal/Popular",
      badge: "Trending"
    },
    {
      title: "Sponsored Products",
      description: "Featured products from our partners",
      link: "/deal/Sponsored",
      badge: "Featured"
    },
    {
      title: "Top Discounts",
      description: "Best deals and biggest savings",
      link: "/deal/Top Discounts",
      badge: "Save Big"
    }
  ];

  return (
    <Layout>
      <div className="frontpage">
        {/* Hero Section */}
        <section className="frontpage-hero">
          <div className="container">
            <div className="frontpage-hero-content">
              <h1 className="frontpage-hero-title">
                Welcome to
                <span className="frontpage-hero-highlight">Bhanumati ka Pitara</span>
              </h1>
              <p className="frontpage-hero-description">
                Your trusted online grocery store with fresh products and great deals
              </p>
              <div className="frontpage-hero-actions">
                <Link to="/products">
                  <Button variant="primary" size="large">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          {/* Categories Section */}
          <section className="frontpage-section">
            <div className="frontpage-section-header">
              <h2 className="frontpage-section-title">
                Shop by Category
              </h2>
              <p className="frontpage-section-subtitle">
                Browse our wide selection of fresh and quality products
              </p>
            </div>
            
            <div className="frontpage-categories">
              {categories.map((category, index) => (
                <Link 
                  key={index}
                  to={category.link}
                  className="frontpage-category-link"
                >
                  <Card 
                    className={`frontpage-category frontpage-category--${category.color}`}
                    hover
                    padding="large"
                  >
                    <div className="frontpage-category-icon">
                      {category.icon}
                    </div>
                    <Card.Title level={3}>
                      {category.title}
                    </Card.Title>
                    <Card.Description>
                      {category.description}
                    </Card.Description>
                    <div className="frontpage-category-arrow">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Deals Section */}
          <section className="frontpage-section">
            <div className="frontpage-section-header">
              <h2 className="frontpage-section-title">
                Special Deals
              </h2>
              <p className="frontpage-section-subtitle">
                Don't miss out on these amazing offers and discounts
              </p>
            </div>
            
            <div className="frontpage-deals">
              {deals.map((deal, index) => (
                <Link 
                  key={index}
                  to={deal.link}
                  className="frontpage-deal-link"
                >
                  <Card 
                    className="frontpage-deal"
                    hover
                    padding="medium"
                  >
                    {deal.badge && (
                      <div className="frontpage-deal-badge">
                        {deal.badge}
                      </div>
                    )}
                    <Card.Title level={4}>
                      {deal.title}
                    </Card.Title>
                    <Card.Description>
                      {deal.description}
                    </Card.Description>
                    <div className="frontpage-deal-cta">
                      <span>Explore</span>
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};



export default withContext(FrontPage);
