import mongoose, { Schema } from 'mongoose';
import { IRefreshToken } from '../types'; 

const refreshTokenSchema = new Schema<IRefreshToken>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true 
    },
    expiresAt:{
        type: Date,
        required: true
    },
    revoked: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true,
})

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);