import mongoose from 'mongoose';
import { DBURL } from './env' 

export const connectToDatabase = async () => {
    try{
        if (!DBURL) {
            throw new Error('Database URL is not defined');
        } 
        await mongoose.connect(DBURL)
        console.log('Connected to the database successfully');
    }catch(error){
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}