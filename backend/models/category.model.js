import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        trim: true
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            unique: true
            },
           
},
{timestamps: true}
)

const Category = mongoose.model('Category', categorySchema, 'categories')

export default Category;