import React from 'react';
import "./Menu.css";
import ProductListItem from './ProductListItem';

function Menu(props) {
    const {products, clickProduct} = props;
    const user = true;

    return  products.map(product => (
            <div className =" card m-3" key = {product._id}>
                <ProductListItem 
                key = {product._id} 
                product={product}
                clickProduct = {clickProduct}
                />
                {user && <div className = "mx-3 mb-3">
                    <button className =" btn btn-secondary me-3">Edit</button>
                    <button className = "btn btn-danger">Delete</button>
                </div>}
            </div>
        ));
}

export default Menu;
