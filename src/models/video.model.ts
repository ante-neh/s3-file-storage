import mongoose, { Schema, Document } from 'mongoose' 

export interface IVideo extends Document {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    thumbnail_url?: string;
    video_url?: string;
    user_id: mongoose.Types.ObjectId;
}

const VideoSchema: Schema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref:'User', required: true },
        description: { type: String, required: true },
        title: { type: String, required: true },
        thumbnail_url: String,
        video_url: String,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true},
        toObject: { virtuals: true}
    }
)

VideoSchema.virtual('id').get(function (this: { _id: mongoose.Types.ObjectId }) {
    return this._id.toHexString();
});

VideoSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (_doc, ret){
        delete ret._id
    }
})

export const Video = mongoose.model<IVideo>('Video', VideoSchema)