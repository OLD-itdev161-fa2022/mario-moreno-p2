import React, {useState, useEffect} from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from './components/Menu';
import Product from "./components/Product";
import NewProduct from "./components/NewProduct";
import Navigation from "./components/Navigation";
import EditProduct from "./components/EditProduct";

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

function onUpdatedProduct(product){
  console.log("Updated product: ", product);
  const newProducts = [...products];
  const index = newProducts.findIndex(item => item._id === product._id);

  newProducts[index] = product;
  setProducts(newProducts);
}

function editProduct(product){
  setProductClicked(product);
}

  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path = "/" render = {() => <Menu products ={products} clickProduct= {viewProduct} editProduct = {editProduct}/>} />
        <Route  path = "/create-product" render = {() => <NewProduct onCreatedProduct = {onCreatedProduct}/>} /> 
        <Route  path = "/edit-product/:id" render = {() => <EditProduct onUpdatedProduct = {onUpdatedProduct} product={productClicked}/>} />        
        <Route  path = "/product/:id" render = {() => <Product product={productClicked}/>} />
      </Switch>
    </Router>
  );
}

export default App;
