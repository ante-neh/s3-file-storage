import http from 'http'
import { app } from './app' 
import { connectDb } from './config/database'
import dotenv from 'dotenv'

dotenv.config()
connectDb()

const PORT = process.env.PORT
const server = http.createServer(app)
server.listen(PORT, ()=>console.log("Server is running on port", PORT))