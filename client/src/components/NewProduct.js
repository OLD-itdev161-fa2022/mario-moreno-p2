import React,{useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';


function NewProduct({onCreatedProduct}) {
    const history = useHistory();
    const [productData, setProductData]= useState({
        name: "",
        description: "",
        price: ""
    });

    const[errorData, setErrorData] = useState({errors: null});
    const {name, description, price} = productData;
    const {errors} = errorData;

    function onChange(e){
        const {name, value} = e.target;

        setProductData({
            ...productData,
            [name]: value
        });
    }

    const create = async () => {
        
        if(errors){
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
                const res = await axios.post("http://localhost:5000/create-product/", body , config);

                onCreatedProduct(res.data);
                history.push("/");
                
            } catch(error) {
                console.error(`Error creating post: ${error.response.data}`);
                setErrorData({
                        ...errors,
                        errors: error.response.data.errors
                    })
            }
        }

    }
    return (
        <div className ="container-sm  p-4">
            <h1 className ="h1 pb-3">Create New Product</h1>
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
                <button className="btn btn-primary mb-3" onClick = {() => create()}>Submit</button>
                <div>
                    {errors && errors.map(error => <div className = "alert alert-warning" role="alert" key = {error.param}> {error.msg} </div>)}
                </div>
        </div>
    )
}

export default NewProduct;
