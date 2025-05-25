import mongoose, { Schema } from 'mongoose';
import { IVideo } from '../types';

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: false
    },
    videoUrl: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ 
    timestamps: true
})

export const Video = mongoose.model('Video', videoSchema);