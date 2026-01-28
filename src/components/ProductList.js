import React from "react";
import ProductItem from "./ProductItem";
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
      <div style={{backgroundColor: "white", minHeight: "100vh", padding: "20px"}}>
        <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
          <div className="hero-body container">
            <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'38px'}}>Loading...</h4>
          </div>
        </div>
      </div>
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

  return (
    <div style={{backgroundColor: "white", minHeight: "100vh"}}>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'38px'}}>Our Products</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {productItems && productItems.length ? (
            productItems.map((product) => (
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
    </div>
  );
};

export default withContext(ProductList);
