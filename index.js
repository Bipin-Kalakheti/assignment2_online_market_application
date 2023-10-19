const express = require('express');
const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Product = require('./model/productmodel')


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = "mongodb+srv://admin:admin@cluster0.ijpylks.mongodb.net/Marketplace?retryWrites=true&w=majority";  
// let db;



app.get('/', (req, res) => {
    res.send('Marketplace App is Running!');
});

app.get('/products', async (req, res, next) => {
    if (req.query.name) {
        try {
            const regex = new RegExp(req.query.name, 'i');  // i flag for case-insensitive match
            const products = await Product.find({name: regex});
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    } else {
        next();  // Continue to the next middleware if name query parameter is not present
    }
});

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//Update the Products
app.put('/products/:id', async( req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //If product is not found by ID
        if(!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findByIdAndUpdate(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )


//delete a product

app.delete('/products/:id', async( req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        //If product is not found by ID
        if(!product){
            return res.status(404).json({message: `Cannot find any product with ID ${id}`})
        }
        // const updatedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.delete('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )




// Start the Express server
mongoose.connect(uri)
  .then(() => {
    console.log('Connected! to mongodb')
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
        console.log(error)
    });

