const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    adress: {
        type: String,
        required: [true, "Please enter your adress!"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
   
    mobile:{
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)