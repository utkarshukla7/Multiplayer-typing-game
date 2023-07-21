import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
    {
        mode: {
            type: Number,
            required: true,
        },
        roomid: {
            type: String,
            required: true
        },
        players:{
            type: [
                {
                    playerid: {
                        type: String,
                        required: true
                    },
                    wpm:{
                        type: Number,
                        default: 0,
                        // required: true
                    },
                    accuracy:{
                        type: Number,
                        default: 0,
                        // required: true
                    }
                }
            ],
            required: true
        },
        text:{
            type: String,
            required: true
        },
        time:{
            type: Date,
            required: true
        },
        gameLevel:{
            type: Number,
        }
    },
    { timestamps: true }
);

export default mongoose.model('games', gameSchema);