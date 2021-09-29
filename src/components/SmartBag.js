import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ProductList = props => {
  const { user } = props.context;
  console.log(user.smartbag)
  const keys = Object.keys(user.smartbag);
  //const products = user.smartbag['top'];
  console.log(keys)
  return (
    <>
      <div className="hero is-primary has-background-info">
        <div className="hero-body container">
          <h4 className="title has-background-info">Smart Bag</h4>
        </div>
      </div>
      <br />
      {keys.map((key) => {
        const products = user.smartbag[key];
        return(
          <div className="container">
            <div className= "title"><h1>{key.charAt(0).toUpperCase()+ key.slice(1)}</h1></div><br/>
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
      )})}
      
    </>
  );
};

export default withContext(ProductList);