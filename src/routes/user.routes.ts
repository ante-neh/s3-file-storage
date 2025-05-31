import { Router } from 'express' 
import { getUser } from '../controllers/user.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'

const userRouter = Router() 

userRouter.get("/:id",authMiddleware, getUser)


export { userRouter }
