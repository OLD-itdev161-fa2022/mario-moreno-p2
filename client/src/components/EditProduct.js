import React,{useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';


function EditProduct({onUpdatedProduct, product}) {
    const history = useHistory();
    const [productData, setProductData]= useState({
        name: product.name,
        description: product.description,
        price: product.price
    });

    const {name, description, price} = productData;

    function onChange(e){
        const {name, value} = e.target;

        setProductData({
            ...productData,
            [name]: value
        });
    }
    
    function cancel(){
        history.push("/");
    }

    const update = async () => {
        
        if(!name || !description || !price){
            console.log("Name, Description and Price are required");
        }else{
            const NewProduct = {
                name: name,
                description: description,
                price: price
            };

            try {
                const config = {
                headers: {
                    "Content-Type": "application/json"
                    }
                }
                const body = JSON.stringify(NewProduct);
                const res = await axios.put(`http://localhost:5000/edit-product/${product._id}`, body , config);

                onUpdatedProduct(res.data);
                history.push("/");
                
            } catch(error) {
                console.error(error);
        
            }
        }

    }
    return (
        <div className ="container-sm  p-4">
            <h1 className ="h1 pb-3">Edit Product</h1>
            <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input name= "name" value ={name} type="text" className="form-control" onChange = {e => onChange(e)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input name = "description" value ={description }type="text" className="form-control" onChange = {e => onChange(e)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input name = "price" value ={price} type="text" className="form-control" onChange = {e => onChange(e)}/>
                </div>
                <button className="btn btn-secondary me-3" onClick = {() => cancel()}>Cancel</button>
                <button className="btn btn-primary mr-3" onClick = {() => update()}>Save</button>
                
                
        </div>
    )
}

export default EditProduct;
