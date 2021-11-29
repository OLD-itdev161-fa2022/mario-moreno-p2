import React from 'react'

function Product (props) {
    const { name, description, price} = props;
    
    return (
        <div className = "card-body mx-3">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{price}</p>
            </div>
            
    )
}

export default Product;


