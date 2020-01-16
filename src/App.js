import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/client/navbar";
import home from "./components/client/home";
import About from "./components/client/about";
import Login from "./components/client/login";
import Signup from "./components/client/signup";
import Mobilephones from "./components/client/mobilephones";
import Clothes from "./components/client/clothes";
import Laptops from "./components/client/laptops";
import Contact from "./components/client/Contact";
import Products from "./components/client/Products/Products";
import AddProduct from "./components/client/Products/AddProduct";
import Checkout from "./components/client/checkout/Checkout";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/mobilephones" component={Mobilephones} />
          <Route path="/clothes" component={Clothes} />
          <Route path="/laptops" component={Laptops} />
          <Route path="/checkout/:id" component={Checkout} />

          <Route path="/contact" component={Contact} />
          <Route path="/add-product" component={AddProduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
