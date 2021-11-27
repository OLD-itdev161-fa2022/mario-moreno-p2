import React from 'react';

function NewProduct() {
    return (
        <div className ="container-sm p-3">
            <h1 className ="h1 pb-3">Create New Product</h1>
            <form>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="text" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        </div>
    )
}

export default NewProduct;
