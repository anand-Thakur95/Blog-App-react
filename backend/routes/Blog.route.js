import express from 'express'
import { addBlog, deleteBlog, editBlog, updateBlog, showallBlog, getblog, getBlogByCategory, search, getAllBlogs } from '../controllers/Blog.controller.js'
import upload from '../controllers/config/multer.js'
import { getRelatedBlog } from '../controllers/Blog.controller.js'
import { authenticate } from '../middlewares/authenticate.js'



const BlogRoute = express.Router()


BlogRoute.post('/add', authenticate, upload.single('file'), addBlog)
BlogRoute.get('/edit/:blogid',authenticate, editBlog)
BlogRoute.put('/update/:blogid',authenticate, upload.single('file'), updateBlog)
BlogRoute.delete('/delete/:blogid',authenticate, deleteBlog)
BlogRoute.get('/get-all',authenticate, showallBlog)

BlogRoute.get('/get-blog/:slug', getblog)
BlogRoute.get('/get-related-blog/:category/:blog', getRelatedBlog)
BlogRoute.get('/get-blog-by-category/:category', getBlogByCategory)
BlogRoute.get('/search', search)

BlogRoute.get('/blogs', getAllBlogs)

export default BlogRoute