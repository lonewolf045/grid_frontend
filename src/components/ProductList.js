import React from "react";
import { ProductGrid } from "./product";
import { Layout, LoadingSpinner, Breadcrumb } from "./ui";
import withContext from "../withContext";
import { useParams } from "react-router-dom";

const ProductList = (props) => {
  console.log("ProductList props:", props);
  const { maj, min, type } = useParams();
  console.log("ProductList params:", { maj, min, type });
  
  // Add error handling for context
  if (!props.context) {
    console.log("ProductList: No context found");
    return (
      <Layout.Page title="Loading...">
        <div className="loading-center">
          <LoadingSpinner size="large" text="Loading products..." />
        </div>
      </Layout.Page>
    );
  }

  const { products } = props.context;
  console.log("ProductList products:", products);
  
  // Navigate through the nested structure to get the products
  let productItems = [];
  if (products && products[maj] && products[maj][min] && products[maj][min][type]) {
    productItems = products[maj][min][type];
  }
  console.log("ProductList productItems:", productItems);

  const categoryTitle = `${maj} > ${min} > ${type}`;

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Products', href: '/products', icon: 'products' },
    { label: maj, href: `/labels/${maj}` },
    { label: min, href: `/labels/${maj}/${min}` },
    { label: type, href: `/labels/${maj}/${min}/${type}`, isActive: true }
  ];

  return (
    <Layout.Page 
      title="Our Products"
      subtitle={`Browse ${categoryTitle.toLowerCase()}`}
      breadcrumbs={<Breadcrumb items={breadcrumbItems} />}
    >
      <ProductGrid
        products={productItems}
        onAddToCart={props.context.addToCart}
        emptyMessage="No products found in this category"
        emptyDescription="Try browsing other categories or check back later for new products."
        columns="auto"
        gap="medium"
      />
    </Layout.Page>
  );
};

export default withContext(ProductList);
