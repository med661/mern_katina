const mongoose = require('mongoose');
const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    typeActivity: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
       
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Activity", ActivitySchema)