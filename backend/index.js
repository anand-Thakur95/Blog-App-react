import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRoute from './routes/Auth.route.js'
import UserRoute from './routes/user.route.js'
import CategoryRoute from './routes/Category.route.js'
import BlogRoute from './routes/Blog.route.js'
import CommentRoute from './routes/comment.route.js'
import BlogLikeRoute from './routes/Bloglike.route.js'

dotenv.config({ path: './.env' })

const PORT = process.env.PORT

const app = express();
app.use(cookieParser())
app.use(express.json())

// Replace with your actual frontend URL
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));



app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/category', CategoryRoute)

app.use('/api/blog', BlogRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/blog-like', BlogLikeRoute)



const mongoURI = process.env.MONGODB_CONN;

mongoose.connect(mongoURI, {dbName: 'mern-blog'})
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection failed:', err));

app.listen(PORT, ()=> {
    console.log('Server running on port:', PORT);
    
})


app.use((err, req, res, next)=>{
   const statusCode = err.status || 500;
   const message = err.message || 'Internal Server Error';
   res.status(statusCode).json({
    success: false,
    statusCode,
    message
   })
})