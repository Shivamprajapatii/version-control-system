const { Type } = require("@aws-sdk/client-s3");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : { Type : String, required : true},
    email : { type: String, required : true, unique: true},
    password : { type : String },
    CreateAT: { type: Date, default: Date.now }
});

const User = mongoose.Model("user", userSchema);

module.exports = { User };