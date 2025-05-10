import mongoose, { Schema, Document } from 'mongoose' 

export interface IRefreshToken extends Document {
    token: String,
    expiresAt: Date,
    revokedAt: Date,
    createdAt: Date,
    updatedAt: Date,
    user_id: mongoose.Types.ObjectId,
}

const RefreshTokenSchema: Schema = new Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    timestamps: true,
})

export const RefreshToken = mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema)