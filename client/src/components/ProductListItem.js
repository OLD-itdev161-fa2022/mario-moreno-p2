import React from 'react';
import { useHistory } from "react-router";
import slugify from "slugify";

function ProductListItem (props) {
    const {product, clickProduct} = props;
    const history = useHistory();

    const handleClick = (product) => {
        const slug = slugify(product.name, {lower: true});

        clickProduct(product);
        history.push(`/product/${slug}`);
    };
    
    return(
        <div>
            <div className = "m-3" onClick = {() => handleClick(product)}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
            </div>
        </div>
    );
}

export default ProductListItem;
