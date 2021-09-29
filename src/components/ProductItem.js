import React from "react";

const ProductItem = (props) => {
  const { product } = props;
  return (
    <div className=" column is-half">
      <div className="box has-background-warning">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name} <br />
              <span
                className="tag is-primary"
                style={{
                  color: "white",
                  textDecoration: "none",
                  height: "auto",
                  width: "auto",
                }}
              >
                {product.discount > 0 ? (
                  <p>
                    <del
                      className="amount"
                      style={{ color: "red", fontSize: "18px" }}
                    >
                      {product.oprice}
                    </del>
                    <ins
                      className="amount"
                      style={{
                        color: "white",
                        fontSize: "24px",
                        padding: "1em 0.25em 1em .5em",
                      }}
                    >
                      {product.dprice}
                    </ins>
                  </p>
                ) : (
                  <p>
                    <ins
                      className="amount"
                      style={{ color: "white", fontSize: "24px" }}
                    >
                      {product.oprice}
                    </ins>
                  </p>
                )}
              </span>
            </b>
            <div className="is-clearfix">
              <button
                className="button is-small is-primary   is-pulled-right has-background-info"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
