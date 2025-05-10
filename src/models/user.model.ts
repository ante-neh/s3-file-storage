import mongoose, { Schema, Document} from 'mongoose' 

export interface IUser extends Document {
    id: string,
    name: string,
    email: string,
    password: string,
} 

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, requied: true}
    }, 
    {
        timestamps: true,
        toJSON: { virtuals: true},
        toObject: { virtuals: true}
    }
)

UserSchema.virtual('id').get(function(this: { _id: mongoose.Types.ObjectId}){
    return this._id.toHexString()
})

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_doc, ret){
        delete ret._id;
    }
})

export const User = mongoose.model<IUser>('User', UserSchema)