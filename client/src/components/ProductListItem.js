import React from 'react';
import { useHistory } from "react-router";
import slugify from "slugify";

function ProductListItem (props) {

    const {product, clickProduct, editProduct , deleteProduct, user} = props;
    const history = useHistory();

    const handleClick = (product) => {
        const slug = slugify(product.name, {lower: true});

        clickProduct(product);
        history.push(`/product/${slug}`);
    };

    const handleEdit = (product) =>{
        editProduct(product);
        history.push(`/edit-product/${product._id}`);
    }
    
    return(
        <div>
            <div className = "m-3" onClick = {() => handleClick(product)}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className ="fw-bold">${product.price}</p>
            </div>
            {user && <div className = "mx-3 mb-3">
                    <button className =" btn btn-secondary me-3" onClick = {()=> handleEdit(product)}>Edit</button>
                    <button className = "btn btn-danger" onClick = {() => deleteProduct(product)}>Delete</button>
            </div>}
        </div>
    );
}

export default ProductListItem;
