import React from 'react'

function Product (props) {
    const { product } = props;
    
    return (
        
            <div className = "card-single">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
            </div>
    
    )
}

export default Product;


