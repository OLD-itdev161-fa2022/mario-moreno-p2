import React from 'react';
import "./Menu.css";
import ProductListItem from './ProductListItem';

function Menu(props) {
    const {products, clickProduct, editProduct} = props;

    return  products.map(product => (
            <div className =" card m-3" key = {product._id}>
                <ProductListItem 
                key = {product._id} 
                product={product}
                clickProduct = {clickProduct}
                editProduct = {editProduct}
                />
            </div>
        ));
}

export default Menu;
