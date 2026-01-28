import React from "react";
import withContext from "../withContext";
import { Link } from "react-router-dom";

const FrontPage = (props) => {
  const { products } = props.context;
  console.log("FrontPage - products:", products);

  return (
    <div style={{backgroundColor: "white", minHeight: "100vh"}}>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'48px'}}> Major Categories</h4>
        </div>
      </div>
      <br />
      <div className="container" style= {{margin: '20px auto 25px auto'}}>
        <div className="rows">
          <div className="row is-full columns">
            <Link className="card column is-half has-text-centered" style={{backgroundColor:"#3e8ed0",color:"#f0f0f0",margin:"10px 10px 10px 10px"}} to="/labels/snacks & beverages">
              <div className="card-content">
                <div className="title" style={{color:"#f0f0f0",fontFamily: 'Gluten'}}>Snacks and Beverages</div>
              </div>
            </Link>
            <Link className="card column is-half has-text-centered" style={{backgroundColor:"#3e8ed0",color:"#f0f0f0",margin:"10px 10px 10px 10px"}} to="/labels/packaged food">
              <div className="card-content">
                <div className="title" style={{color:"#f0f0f0",fontFamily: 'Gluten'}}>Packaged Food</div>
              </div>
            </Link>
          </div>
          <div className="row is-full columns">
            <Link className="card column is-one-third has-text-centered" style={{backgroundColor:"#3e8ed0",color:"#f0f0f0",margin:"10px 10px 10px 10px"}} to="/deal/Popular">
              <div className="card-content">
                <div className="title" style={{color:"#f0f0f0",fontFamily: 'Gluten'}}>Popular Products</div>
              </div>
            </Link>
            <Link className="card column is-one-third has-text-centered" style={{backgroundColor:"#3e8ed0",color:"#f0f0f0",margin:"10px 10px 10px 10px"}} to="/deal/Sponsored">
              <div className="card-content">
                <div className="title" style={{color:"#f0f0f0",fontFamily: 'Gluten'}}>Sponsored Products</div>
              </div>
            </Link>
            <Link className="card column is-one-third has-text-centered" style={{backgroundColor:"#3e8ed0",color:"#f0f0f0",margin:"10px 10px 10px 10px"}} to="/deal/Top Discounts">
              <div className="card-content">
                <div className="title" style={{color:"#f0f0f0",fontFamily: 'Gluten'}}>Top Discount</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};



export default withContext(FrontPage);
