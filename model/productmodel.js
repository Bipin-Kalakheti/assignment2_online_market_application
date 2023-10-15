const { string } = require('joi')
const mongoose = require('mongoogse')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Product Name"]
        },
        description: {
            type: String,
            required: [true, "Please Enter Product Descriptin"]
        },
        price: {
            type: Number,
            required: [true, "Please Enter Product Price"]
        },
        quantity: {
            type: Number,
            required: [true, "Please Enter Product Quantity"],
            default: 1
        },
        category: {
            type: String,
            required: [true, "Please Enter Product Category"]
        }

    },
    {
        timestamps: true
    }
)