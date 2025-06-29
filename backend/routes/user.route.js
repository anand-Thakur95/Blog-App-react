import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser} from '../controllers/user.controller.js'
import upload from '../controllers/config/multer.js'
import { authenticate } from '../middlewares/authenticate.js'



const UserRoute = express.Router()

UserRoute.use(authenticate)

UserRoute.get('/get-user/:userid', getUser)
UserRoute.put('/update-user/:userid', upload.single('file'), updateUser)
UserRoute.get('/get-all-user', getAllUser)
UserRoute.delete('/delete/:id', deleteUser)


export default UserRoute