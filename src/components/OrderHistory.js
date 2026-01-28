import React from "react";
import withContext from "../withContext";
import {
  Link,
} from "react-router-dom";

const OrderHistory = props => {
  const { user } = props.context;
  
  if (!user || !user.orderHis) {
    return (
      <div style={{backgroundColor: "white", minHeight: "100vh", padding: "20px"}}>
        <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
          <div className="hero-body container">
            <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'48px'}}>Please log in to view Order History</h4>
          </div>
        </div>
      </div>
    );
  }
  
  const orderHis = user.orderHis;
  const keys = Object.keys(orderHis || {});
  
  return (
    <div style={{backgroundColor: "white", minHeight: "100vh"}}>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'48px'}}>Order History</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {keys.map((key) => (
            <Link key={key} className="card " to={`/orderHis/${key}`} style={{backgroundColor:"#3e8ed0",margin:"10px 10px 10px 10px",width:"425px",color:"#f0f0f0"}}>
              <div className="card-content ">
                <div className="title has-text-centered" style={{color:"#f0f0f0",fontSize : "2em",fontFamily: 'Gluten'}}>
                  Order Id: {key}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withContext(OrderHistory);