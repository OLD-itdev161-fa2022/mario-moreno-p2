import React, {useState, useEffect} from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from './components/Menu';
import Product from "./components/Product";
import NewProduct from "./components/NewProduct";
import Navigation from "./components/Navigation";

function App() {
  const [products, setProducts] = useState([]);
  const [productClicked, setProductClicked]= useState(null);


  useEffect(() => {
    axios.get("http://localhost:5000")
    .then(res => setProducts(res.data))
    .catch(error => console.log(error));

  });

  function viewProduct (product){
  console.log(`view ${product.name}`);
  setProductClicked(product);
}

function onCreatedProduct(product){
  const newProducts = [...products, product];
  setProducts(newProducts);
}


  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path = "/" render = {() => <Menu products ={products} clickProduct= {viewProduct}/>} />
        <Route  path = "/create-product" render = {() => <NewProduct onCreatedProduct = {onCreatedProduct}/>} />        
        <Route  path = "/product/:id" render = {() => <Product product={productClicked}/>} />
      </Switch>
    </Router>
  );
}

export default App;
