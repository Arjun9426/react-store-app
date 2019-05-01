import React, { Component } from "react";
import { Link } from "react-router-dom";
const CartTotal = ({ value }) => {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div
            className="col-10 mt-2 ml-sm-5 
          text-capitalize text-right  ml-md-auto col-sm-8"
          >
            <Link to="/">
              <button
                onClick={() => {
                  clearCart();
                }}
                className="btn btn-outline-danger text-uppercase
                mb-3 px-5"
              >
                clear cart
              </button>
            </Link>

            <h5>
              <span className="text-title">
                subTotal:
                <span>
                  <strong>$ {cartSubTotal}</strong>
                </span>
              </span>
            </h5>

            <h5>
              <span className="text-title">
                Tax:
                <span>
                  <strong>$ {cartTax}</strong>
                </span>
              </span>
            </h5>

            <h5>
              <span className="text-title">
                Total:
                <span>
                  <strong>$ {cartTotal}</strong>
                </span>
              </span>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartTotal;
