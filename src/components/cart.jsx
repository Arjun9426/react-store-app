import React, { Component } from "react";
import Title from "./title";
import CartColumns from "./cartcolumns";
import EmptyCart from "./emptycart";
import { ProductConsumer } from "../context";
import CartList from "./cartlist";
import CartTotal from "./carttotal";
class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            if (value.cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotal value={value} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

export default Cart;
