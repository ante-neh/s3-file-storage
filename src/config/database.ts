import mongoose from 'mongoose' 

export const connectDb = async()=>{
    try {
        const conn =  await mongoose.connect(process.env.MONGO_CONN || '')
        console.log("Database connected on", conn.connection.host)
    } catch (error) {
        console.log("Faild to connect to the databse")
        process.exit(1)
    }
}