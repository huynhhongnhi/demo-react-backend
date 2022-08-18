
const bcrypt = require('bcrypt');
import mongoose, { Schema } from "mongoose";
const saltWorkFactor = 12;

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    toResources: () => {};
    comparePassword: (password: string) => boolean;
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);

UserSchema.methods.toResources = function() {   
    return {
        _id      : this._id,
        username : this.username,
        email    : this.email,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

UserSchema.methods.comparePassword = function(_password: string) {
    return bcrypt.compareSync(_password, this.password);
}

UserSchema.pre('save', async function(next) {
    if ( !this.isModified('password') ) return next();
    try {
        const salt    = await bcrypt.genSalt(saltWorkFactor);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next((error as Error));
    }
})

const User = mongoose.model<IUser>  ("User", UserSchema, "users");

export default User;