import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        gameid: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.model('users', userSchema);