import express from 'express';
import { addcomment, commentCount, getComment, getAllComments, deleteComment } from '../controllers/Comment.controller.js';
import { authenticate } from '../middlewares/authenticate.js';


const CommentRoute = express.Router()

CommentRoute.post('/add',authenticate, addcomment)
CommentRoute.get('/get/:blogid', getComment)
CommentRoute.get('/get-count/:blogid', commentCount)

CommentRoute.get('/get-all-comment',authenticate, getAllComments)

CommentRoute.delete('/delete/:commentid',authenticate, deleteComment)

export default CommentRoute;