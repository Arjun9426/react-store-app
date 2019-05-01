import React, { Component } from "react";
import CartItem from "./cartitem";

const CartList = ({ value }) => {
  return (
    <div className="container-fluid">
      {value.cart.map(item => {
        return <CartItem key={item.id} value={value} item={item} />;
      })}
    </div>
  );
};

export default CartList;
