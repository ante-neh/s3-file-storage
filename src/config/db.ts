import mongoose from 'mongoose';
import { MONGO_CONN } from './env' 

export const connectToDatabase = async () => {
    try{
        if (!MONGO_CONN) {
            throw new Error('Database URL is not defined');
        } 
        await mongoose.connect(MONGO_CONN)
        console.log('Connected to the database successfully');
    }catch(error){
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}