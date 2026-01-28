import React from "react";
import withContext from "../withContext";
import {
  Link,
  useParams,
} from "react-router-dom";

const ProductLabel = (props) => {
  const { products } = props.context;
  let { maj } = useParams();
  console.log("ProductLabel - products:", products, "maj:", maj);
  
  return (
    <div style={{backgroundColor: "white", minHeight: "100vh"}}>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC'
          ,fontSize:'44px'}}>Minor Categories</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products[maj] && Object.keys(products[maj]).map((key) => (
            <Link key={key} className="card " to={`/labels/${maj}/${key}`} style={{backgroundColor:"#3e8ed0",margin:"10px 10px 10px 10px",width:"425px",color:"#f0f0f0"}}>
              <div className="card-content ">
                <div className="title has-text-centered" style={{color:"#f0f0f0",fontSize : "2em",fontFamily: 'Gluten'}}>
                  {key
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withContext(ProductLabel);
