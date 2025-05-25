import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, 
    }
},{
    timestamps: true
})

userSchema.pre("save", async function(next: any){
    const user = this as IUser;
    if(!user.isModified("password")){
        return next;
    }
    try{
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        next()
    }catch(err){
        next(err)
    }
})

export const User = mongoose.model("User", userSchema);