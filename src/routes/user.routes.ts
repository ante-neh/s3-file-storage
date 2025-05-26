import { Router } from 'express' 
const userRouter = Router() 

userRouter.get("/users", (req, res)=>{
    console.log("Fetching all users")
    res.send("All users fetched")
})

userRouter.get("/users/:id", (req, res)=>{
    console.log("Fetching user with Id:", req.params.id)
})


export { userRouter }
