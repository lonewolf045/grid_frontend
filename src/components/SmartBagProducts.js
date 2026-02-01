import React from "react";
import { ProductGrid } from "./product";
import { Breadcrumb } from "./ui";
import withContext from "../withContext";
import { useParams } from "react-router-dom";

const SmartBagProducts = (props) => {
  const { user } = props.context;
  const { maj } = useParams();
  
  // Check if user is logged in and has smartbag data
  if (!user || !user.smartbag) {
    return (
      <div className="empty-state">
        <p>You need to be logged in to access your smart bag.</p>
      </div>
    );
  }

  // Get products from smartbag data for the specific category
  let productItems = [];
  if (user.smartbag && user.smartbag[maj]) {
    productItems = user.smartbag[maj];
  }

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Smart Bag', href: '/smart-bag' },
    { label: maj, href: `/smartbag/${maj}`, isActive: true }
  ];

  const categoryTitle = maj
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="smartbag-products-page">
      <div className="page-header">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="page-title">Smart Bag - {categoryTitle}</h1>
        <p className="page-subtitle">Your personalized {categoryTitle.toLowerCase()} recommendations</p>
      </div>
      
      <ProductGrid
        products={productItems}
        onAddToCart={props.context.addToCart}
        emptyMessage={`No ${categoryTitle.toLowerCase()} products in your smart bag`}
        emptyDescription="Your smart bag will be populated with personalized recommendations based on your preferences and shopping history."
        columns="auto"
        gap="medium"
      />
    </div>
  );
};

export default withContext(SmartBagProducts);