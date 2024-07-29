const mongoose=require('mongoose');

const  UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A User should have a name"],
        unique:true,
    },
    location:{
        type:String,
        required:[true,"Location field is empty"]
    },
    email:{
        type:String,
        required:[true,"Email field is empty"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        unique:true
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const User = mongoose.model('User',UserSchema);

module.exports = User;