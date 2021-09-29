import React from "react";
import withContext from "../withContext";
import OrderItem from "./OrderItem";

const Cart = props => {
  const { user } = props.context;
  const orderHis = user.orderHis;
  const orderKeys = Object.keys(orderHis || {});
  console.log(orderHis)
  return (
    <>
      <div className="hero is-primary has-background-info">
        <div className="hero-body container">
          <h4 className="title">Order History</h4>
        </div>
      </div>
      <br />
      {orderKeys.map((key) => {
            const orders = orderHis[key].pro_det;
            return (<div className="container">
                        <div className= "title"><h1>Order Id: {key}</h1></div><br/>
                        <div className="column columns is-multiline">
                            {orders.length ? (orders.map(o => (
                                <OrderItem
                                    orderItem={o}
                                />
                            ))):(
                                <div className="column">
                                    <div className="title has-text-grey-light">No order history!</div>
                                </div>
                            ) }        
                        </div>
                    </div>)
      })}
      
    </>
  );
};

export default withContext(Cart);