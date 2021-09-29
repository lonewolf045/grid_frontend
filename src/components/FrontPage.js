import React from "react";

import ProductLabel from "./ProductLabel";
import ProductDeal from "./ProductDeal";
import withContext from "../withContext";
import { Switch, Route, Link, MemoryRouter as Router } from "react-router-dom";

const FrontPage = (props) => {
  const { products } = props.context;
  let productKeys = Object.keys(products);

  return (
    <Router>
      <div className="hero is-primary has-background-info">
        <div className="hero-body container">
          <h4 className="title has-background-info">Categories</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          <Link className="card" to="/labels/snacks & beverages">
            <div className="card-content">
              <div className="title">Snacks and Beverages</div>
            </div>
          </Link>
          <Link className="card" to="/labels/packaged food">
            <div className="card-content">
              <div className="title">Packaged Food</div>
            </div>
          </Link>
          <Link className="card" to="/deal/Popular">
            <div className="card-content">
              <div className="title">Popular Products</div>
            </div>
          </Link>
          <Link className="card" to="/deal/Sponsored">
            <div className="card-content">
              <div className="title">Sponsored Products</div>
            </div>
          </Link>
          <Link className="card" to="/deal/Top Discounts">
            <div className="card-content">
              <div className="title">Top Discount</div>
            </div>
          </Link>
        </div>
      </div>
      <Switch>
        <Route exact path="/labels/:maj">
          <ProductLabel productList={products} />
        </Route>
        <Route exact path="/deal/:maj">
          <ProductDeal productList={products} />
        </Route>
      </Switch>
    </Router>
  );
};

export default withContext(FrontPage);
