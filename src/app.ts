import express from 'express'
import cors from 'cors'
import helmet from 'helmet' 
import { errorHandlingMiddleware } from './middleware/error'


const app = express() 
app.use(express.json())
app.use(cors())
app.use(helmet())
app.post("/", (req, res)=>console.log(""))
app.use(errorHandlingMiddleware)



export { app }