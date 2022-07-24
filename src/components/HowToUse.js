import React from "react";

const HowToUse = () => {
  //const { product } = props;
  //const url = './images/'+product.item_id+'.jpeg.'
  return (

      <div className="card is-half is-centred">
        <div className="card-content">
          <h3>How to use it?</h3>
          <ul>
            <li>&rarr;If you want to login as an existing user,
                <br/>
                &emsp;&emsp;Username: user_&#60;number&#62;@example.com
                <br/>
                &emsp;&emsp;Password: password&#60;number&#62;
                <br/>
                &emsp;&emsp;where &#60;number&#62; is in range 0 to 999, all inclusive
            </li>
            <li>
            &rarr;Otherwise, you can sign up as a new user by clicking on the Sign Up tab and entering the details. 
            </li>
          </ul>
        </div>
      </div>
  );
};

export default HowToUse;
