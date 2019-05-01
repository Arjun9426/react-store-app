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
    this.setState(
      () => {
        return { products: temp, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  increment = id => {
    console.log("in increment");
    let tempcart = [...this.state.cart];
    let index = tempcart.indexOf(this.getitem(id));
    tempcart[index].count++;
    tempcart[index].total += tempcart[index].price;
    this.setState(
      () => {
        return {
          cart: [...tempcart]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = id => {
    console.log("in increment");
    let tempcart = [...this.state.cart];
    let index = tempcart.indexOf(this.getitem(id));
    if (tempcart[index].count == 1) {
      this.remove(id);
    } else {
      tempcart[index].count--;
      tempcart[index].total -= tempcart[index].price;
      this.setState(
        () => {
          return {
            cart: [...tempcart]
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  remove = id => {
    console.log("item removed");
    let tempproduct = [...this.state.products];
    let tempcart = [...this.state.cart];
    let index = tempproduct.indexOf(this.getitem(id));
    tempcart = tempcart.filter(item => item.id !== id);
    tempproduct[index].inCart = false;
    tempproduct[index].count = 0;
    tempproduct[index].total = 0;
    this.setState(
      () => {
        return {
          products: [...tempproduct],
          cart: [...tempcart]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    console.log("cart cleared");
    this.setState(
      () => {
        return {
          cart: []
        };
      },
      () => {
        this.setProducts(); // objects will be set to default copy
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    let temptax = subTotal * 0.1;
    let tax = parseFloat(temptax.toFixed(2));
    let total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
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
