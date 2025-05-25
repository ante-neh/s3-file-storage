import { Router } from 'express' 
const usersRouter = Router() 

usersRouter.get("/users", (req, res)=>{
    console.log("Fetching all users")
    res.send("All users fetched")
})

usersRouter.get("/users/:id", (req, res)=>{
    console.log("Fetching user with Id:", req.params.id)
})


export { usersRouter }
