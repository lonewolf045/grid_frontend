import React from "react";
import { Link } from "react-router-dom";
import { Layout, Card } from "./ui";
import withContext from "../withContext";
import { useParams } from "react-router-dom";
import "./FrontPage.css";

const ProductType = (props) => {
  const { products } = props.context;
  let { maj, min } = useParams();
  console.log("ProductType - products:", products, "maj:", maj, "min:", min);
  
  const types = products && products[maj] && products[maj][min] ? Object.keys(products[maj][min]) : [];
  
  return (
    <Layout.Page 
      title="Product Types"
      subtitle={`Browse ${maj} > ${min} product types`}
    >
      <div className="category-grid">
        {types.map((key) => (
          <Link 
            key={key} 
            className="category-link" 
            to={`/labels/${maj}/${min}/${key}`}
          >
            <Card 
              className="category-card category-card--secondary"
              hover
              padding="large"
            >
              <div className="category-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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

export default withContext(ProductType);
