import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    steamId: {
        type: String,
        required: false,
        sparse: true,
    },
    isQualified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userUid: {
        type: String,
        required: true,
        unique: true
    }

}, {
    timestamps: true
});

export const User = mongoose.model('User', userSchema);
