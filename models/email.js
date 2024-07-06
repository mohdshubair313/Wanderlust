const mongoose = require("mongoose");
const schema = mongoose.Schema;

const emailSchema = new schema({
    email: {
        type:String,
        required:true,
        unique:true
    }
});

const SubEmail = mongoose.model("SubEmail",emailSchema);
module.exports = SubEmail;