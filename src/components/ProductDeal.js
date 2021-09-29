import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import { useParams } from "react-router-dom";

const ProductDeal = (props) => {
  const { productList } = props;
  const { maj } = useParams();
  let products = productList[maj];

  return (
    <>
      <div className="hero is-primary has-background-info">
        <div className="hero-body container">
          <h4 className="title has-background-info">Products</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product) => (
              <ProductItem
                product={product}
                key={product.item_id}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(ProductDeal);
