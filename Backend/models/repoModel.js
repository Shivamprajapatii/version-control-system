const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RepositorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    contant: [
        {
            type : String,
        },
    ],
    visiblity : {
        type : Boolean
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    issues : [
        {
            type : Schema.Types.ObjectId,
            ref : "Issue"
        }
    ],

})


const Repository = mongoose.model("Repository", RepositorySchema);
module.exports = Repository ;