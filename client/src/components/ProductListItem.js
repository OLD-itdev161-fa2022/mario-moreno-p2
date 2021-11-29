import React from 'react';
import { useHistory } from "react-router";
import slugify from "slugify";
import Product from './Product';

function ProductListItem (props) {
    const {product, clickProduct} = props;
    const history = useHistory();

    const handleClick = (product) => {
        const slug = slugify(product.name, {lower: true});

        clickProduct(product);
        history.push(`/menu/${slug}`);
    };
    
    return(
        <div>
            <div className = "card-body" onClick = {() => handleClick(product)}>
                <Product name ={product.name} description ={product.description} price ={product.price} />
            </div>
            
        </div>
    );
}

export default ProductListItem;
