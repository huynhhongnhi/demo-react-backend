import mongoose, { Schema, model } from 'mongoose';

export interface IPost extends Document {
    title: string;
    description: string;
  }

// Create post schema
const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true, versionKey: false }
);

// Create post model
const Post = mongoose.model<IPost>  ("Course", PostSchema, "courses");

export default Post;