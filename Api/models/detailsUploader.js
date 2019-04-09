const mongoose = require('mongoose');

// CREATING THE MONGOOSE SCHEMA
var detailSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: true
    },
    imageID:{
        type: String
    },
    imageUpload:{
        type: String,
        required: true
    },
    post_data:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Detail', detailSchema)