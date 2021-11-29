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

  },[]);

  function viewProduct (product){
  console.log(`view ${product.name}`);
  setProductClicked(product);
  
  
}


  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path = "/" render = {() => <Menu products ={products} clickProduct= {viewProduct}/>} />
        <Route  path = "/create-product" component = {NewProduct} />        
        <Route  path = "/product/:id" render = {() => <Product product={productClicked}/>} />
      </Switch>
    </Router>
  );
}

export default App;
