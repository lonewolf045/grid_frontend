import React from "react";
import { ProductCard } from "./product";

const ProductItem = (props) => {
  const { product } = props;
  
  return (
    <ProductCard
      product={product}
      onAddToCart={props.addToCart}
      showQuickActions={true}
    />
  );
};

export default ProductItem;
