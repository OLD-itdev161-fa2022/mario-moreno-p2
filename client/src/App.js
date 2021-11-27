import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from './components/Menu';
import Product from "./components/Product";
import NewProduct from "./components/NewProduct";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path = "/" component = {Menu} />
        <Route exact path = "/create-product" component = {NewProduct} />        
        <Route exact path = "/product/:id" component = {Product} />
      </Switch>
    </Router>
  );
}

export default App;
