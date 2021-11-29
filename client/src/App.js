import React, {useState, useEffect} from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from './components/Menu';
import Product from "./components/Product";
import NewProduct from "./components/NewProduct";
import Navigation from "./components/Navigation";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000")
    .then(res => setProducts(res.data))
    .catch(error => console.log(error));

  },[products]);

  function viewProduct (product){
  console.log(`view ${product.name}`);
  setProducts([product])
}


  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path = "/" render = {() => <Menu products ={products} clickProduct={viewProduct}/>} />
        <Route exact path = "/create-product" component = {NewProduct} />        
        <Route exact path = "/product/:id" component = {Product} />
      </Switch>
    </Router>
  );
}

export default App;
