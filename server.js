import express from "express";
import {check, validationResult} from "express-validator";
import cors from "cors";
import mongoose from "mongoose";
import Product from "./models/Product.js";

const app = express();
app.use(express.json({extended: false}));

app.use(
    cors({
        origin: "http://localhost:3000"
    })
);


const db = "mongodb+srv://morenm14:itdev-161@cluster0.ppfld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDatabase = async () => {
    try{
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
        console.log("Connected to mongoDB");
    }catch(error){
        console.log(error.message);
        //exit with failure
        process.exit(1);
    }
};

connectDatabase();


//get all products
app.get("/", async (req, res) => {
    const products = await Product.find();
    if(!products){
        return res.status(404).json({msg: "There are no products"});
    }
    res.json(products);
});

//create new product
app.post("/create-product", 
[
    check("name", "Please enter a product name").not().isEmpty(),
    check("description", "Please enter product description").not().isEmpty(),
    check("price", "Please enter product price").isNumeric(),
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }else{
        const {name, description, price} = req.body;
        try {
            
            const product = new Product({
            name: name,
            description: description,
            price: price
            });

            await product.save();
            res.json(product);
            
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
});

//get product by id
app.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if(!product){
        return res.status(404).json({msg: "There are no products"});
    }
    res.json(product);
});

//delete by id
app.delete("/product/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if(!product){
        return res.status(404).json({msg: "There are no products"});
    }

    await product.remove();
    res.json({msg: "Product removed"});
});

app.put("/edit-product/:id", async (req, res) => {

    const {name, description, price} = req.body;
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({msg: "There are no products"});
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    await product.save();
    res.json(product);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`express server running on port ${PORT}`));
