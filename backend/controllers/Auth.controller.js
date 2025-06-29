import jwt from "jsonwebtoken"
import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const Register = async(req, res, next) => {
    try {
        const {name, email, password} = req.body
        const checkuser = await User.findOne( {email} )

        if(checkuser){
            // user already exists
            return next(handleError(409, "User already exists"))
        }

        const hashedPassword = bcryptjs.hashSync(password)

        // Check if this is the first user (admin)
        const userCount = await User.countDocuments()
        const role = userCount === 0 ? 'admin' : 'user'

        // register user
        const user = new User(
            { name, email, password: hashedPassword, role } 
        )

        await user.save();

        res.status(200).json({
            success: true,
            message: "User created successfully",
            role: role // Optional: return the assigned role
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const Login = async(req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return next(handleError(409, "User not found"))
        }
        const hashedPassword = user.password

        const comparePassword = await bcryptjs.compare(password, hashedPassword)
        if(!comparePassword){
            return next(handleError(401, "Invalid login credentials"))
        }

     
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role || 'user'
        }, process.env.JWT_SECRET)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        })
        
        const newUser = user.toObject({ getters: true })
        delete newUser.password

        res.status(200).json({
            success: true,
            user: newUser,
            message: "Logged in successfully",
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

        // Google login
export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body
        let user
        user = await User.findOne({ email })
        if (!user) {
            //  create new user 
            const password = Math.random().toString()
            const hashedPassword = bcryptjs.hashSync(password)
            
            // Check if this is the first user (admin)
            const userCount = await User.countDocuments()
            const role = userCount === 0 ? 'admin' : 'user'
            
            const newUser = new User({
                name, 
                email, 
                password: hashedPassword, 
                avatar,
                role: role // Assign role based on user count
            })

            user = await newUser.save()
        }

        // FIXED: Include role in JWT token
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role || 'user' // Include role field
        }, process.env.JWT_SECRET)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        const newUser = user.toObject({ getters: true })
        delete newUser.password

        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Login successful.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const Logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        res.status(200).json({
            success: true,
            message: 'Logout successful.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}