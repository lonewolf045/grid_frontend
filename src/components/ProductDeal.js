import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import { useParams } from "react-router-dom";

const ProductDeal = (props) => {
  const { products } = props.context;
  const { maj } = useParams();
  let productItems = products && products[maj] ? products[maj] : [];

  return (
    <div style={{backgroundColor: "white", minHeight: "100vh"}}>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'46px'}}>Products</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="columns is-multiline">
          {productItems && productItems.length ? (
            productItems.map((product) => (
              <ProductItem
                className="column is-one-third is-narrow"
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
    </div>
  );
};

export default withContext(ProductDeal);
