import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Cart from "./components/cart";
import Default from "./components/default";
import Details from "./components/details";
import NavBar from "./components/navbar";
import ProductList from "./components/productlist";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/details" exact component={Details} />
          <Route path="/cart" exact component={Cart} />
          <Route component={Default} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App;
