import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
// this is an API, using this  we need not to do state lifting , we can use provider&consumer
//to pass and use the data
const ProductContext = React.createContext();
// provider-> it provies product info  to file, it included on the top of file
// consumer -> it is used to fetch the actual product info into the jsx file

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let temp = [];
    storeProducts.forEach(item => {
      const singleitem = { ...item };
      temp = [...temp, singleitem];
    });
    this.setState(() => {
      return { products: temp };
    });
  };
  getitem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    console.log("in handle detail");
    const product = this.getitem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addtocart = id => {
    //  console.log("in addtocart");
    console.log(this.state.cart);
    let temp = [...this.state.products];
    let index = temp.indexOf(this.getitem(id));
    let product = temp[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(() => {
      return { products: temp, cart: [...this.state.cart, temp] };
    });
  };

  increment = id => {
    console.log("in increment");
  };
  decrement = id => {
    console.log("in increment");
  };
  remove = id => {
    console.log("item removed");
  };
  clearCart = () => {
    console.log("cart cleared");
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addtocart: this.addtocart,
          increment: this.increment,
          decrement: this.decrement,
          remove: this.remove,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

/* console.log("in addtocart");
    let temp = [...this.state.products];
    let index = temp.indexof(this.getitem(id));
    let product = temp[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(() => {
      return { products: temp, cart: [...this.state.cart, temp] };
    });
    */
