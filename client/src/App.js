import React, {useState, useEffect} from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from './components/Menu';
import Product from "./components/Product";
import NewProduct from "./components/NewProduct";
import Navigation from "./components/Navigation";
import EditProduct from "./components/EditProduct";

function App() {

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [productClicked, setProductClicked]= useState(null);

  //loads on component did mount
  useEffect(() => {
    axios.get("http://localhost:5000")
    .then(res => setProducts(res.data))
    .catch(error => console.log(error));
    setUser(false);
  
  },[]);

  function isLogged(){
    if (user){
      setUser(false);
    }else{
      setUser(true);
    }
  }
  //runs when selecting a product
  function viewProduct (product){
  console.log(`view ${product.name}`);
  setProductClicked(product);
}

//sets the new state after creating a new product
function onCreatedProduct(product){
  const newProducts = [...products, product];
  setProducts(newProducts);
}

//sets the new state after updating a product
function onUpdatedProduct(product){
  console.log("Updated product: ", product);
  const newProducts = [...products];
  const index = newProducts.findIndex(item => item._id === product._id);

  newProducts[index] = product;
  setProducts(newProducts);
}

// runs when editing a product
function editProduct(product){
  setProductClicked(product);
}

//deletes a product and sets the new state
function deleteProduct(product){
  axios.delete(`http://localhost:5000/product/${product._id}`)
  .then(response => {
    const newProducts = products.filter(item => item._id !== product._id);
    setProducts(newProducts);
    alert(`Delete ${product.name}?`);
  })
}

  return (
    <Router>
      <Navigation user = {user} isLogged ={isLogged}/>
      <Switch>
        <Route exact path = "/" 
          render = {() => <Menu user ={user} products ={products} clickProduct= {viewProduct} editProduct = {editProduct} deleteProduct={deleteProduct}/>} />
        <Route  path = "/create-product" render = {() => <NewProduct onCreatedProduct = {onCreatedProduct}/>} /> 
        <Route  path = "/edit-product/:id" render = {() => <EditProduct onUpdatedProduct = {onUpdatedProduct} product={productClicked}/>} />        
        <Route  path = "/product/:id" render = {() => <Product product={productClicked}/>} />
      </Switch>
    </Router>
  );
}

export default App;
