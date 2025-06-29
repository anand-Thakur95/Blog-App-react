import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
            },
            bio: {
                type: String,
                trim: true
                },
                avatar: {
                    type: String,
                    trim: true
                },
                password: {
                    type: String,
                    required: true,
                    trim: true
                    },
})

const User = mongoose.model('User', userSchema, 'users')

export default User;