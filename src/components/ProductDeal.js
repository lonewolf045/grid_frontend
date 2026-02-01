import React from "react";
import { ProductGrid } from "./product";
import { Layout } from "./ui";
import withContext from "../withContext";
import { useParams } from "react-router-dom";

const ProductDeal = (props) => {
  const { products } = props.context;
  const { maj } = useParams();
  let productItems = products && products[maj] ? products[maj] : [];

  return (
    <Layout.Page 
      title={`${maj} Products`}
      subtitle={`Discover our ${maj.toLowerCase()} collection`}
    >
      <ProductGrid
        products={productItems}
        onAddToCart={props.context.addToCart}
        emptyMessage={`No ${maj.toLowerCase()} products found`}
        emptyDescription="Check back later for new products in this category."
        columns="auto"
        gap="medium"
      />
    </Layout.Page>
  );
};

export default withContext(ProductDeal);
