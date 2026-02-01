import React from "react";
import { Link } from "react-router-dom";
import { Layout, Card } from "./ui";
import withContext from "../withContext";
import { useParams } from "react-router-dom";
import "./FrontPage.css";

const ProductLabel = (props) => {
  const { products } = props.context;
  let { maj } = useParams();
  console.log("ProductLabel - products:", products, "maj:", maj);
  
  const categories = products && products[maj] ? Object.keys(products[maj]) : [];
  
  return (
    <Layout.Page 
      title="Minor Categories"
      subtitle={`Browse ${maj} subcategories`}
    >
      <div className="category-grid">
        {categories.map((key) => (
          <Link 
            key={key} 
            className="category-link" 
            to={`/labels/${maj}/${key}`}
          >
            <Card 
              className="category-card category-card--secondary"
              hover
              padding="large"
            >
              <div className="category-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <Card.Title level={3} className="category-card-title">
                {key
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Card.Title>
              <div className="category-card-arrow">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Layout.Page>
  );
};

export default withContext(ProductLabel);
