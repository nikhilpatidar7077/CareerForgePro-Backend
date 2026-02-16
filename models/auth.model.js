const {Schema,model} = require("mongoose");

const authSchema = new Schema({
    fullName : {
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const authModel = model("Users",authSchema)

module.exports = authModel