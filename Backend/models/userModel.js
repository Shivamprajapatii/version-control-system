const { Type } = require("@aws-sdk/client-s3");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        Type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    Repository: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository"
        }
    ],
    FollowedUsers : [
        {
            default : [],
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    starRepository : [
        {
            default : [],
            type : Schema.Types.ObjectId,
            ref : "Repository"
        }
    ] 
});

const User = mongoose.Model("User", UserSchema);
module.exports = { User };