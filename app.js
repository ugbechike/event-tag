var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
// importing the detailsupload to handle routing
var detailsUpload = require('./Api/Controller/detailsUpload')


var app = express();

// CONNETING TO MONGODB
mongoose.connect('mongodb://localhost/imageuploader', {
    useNewUrlParser: true
})
// mongoose.connection


// TO PROCESS ANY STATIC FILE OR FOLDER
app.use('/uploads', express.static('uploads'));


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// HANDLING CORS ERROR
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
        return res.status(200).json({})
    }
    next();

})

// ROUTES WHICH SHOULD HANDLE REQUESTS
app.use('/uploadFile', detailsUpload);

// HANDLING ERRORS
app.use((req, res, next) => {
    const error = new Error('NOT FOUND');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app