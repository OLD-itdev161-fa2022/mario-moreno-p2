import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";

const app = express();
app.use(express.json({extended: false}));


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
app.post("/create-product", async (req, res) => {
    const {name, description, price} = req.body;
    const product = new Product({
        name: name,
        description: description,
        price: price
    });

    await product.save();
    res.send(product);
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

app.delete("/product/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if(!product){
        return res.status(404).json({msg: "There are no products"});
    }

    await product.remove();
    res.json({msg: "Product removed"});

});


const PORT = 5000;
app.listen(PORT, () => console.log(`express server running on port ${PORT}`));
