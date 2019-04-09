var express = require('express');
var Details = require('../models/detailsUploader');
var mongoose = require('mongoose');
var path = require('path');
var cloud = require('../services/cloudinary');
var multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage })

// DECLARE THE ROUTES FOR THE HTTP METHODS
var route = express.Router()

// ROUTE FOR GETTING ALL THE IMAGES FROM CLOUDINARY
route.get('/', (req, res, next)=>{
    Details.find().select('name imageUpload').exec().then(doc => {
        const response = {
            counts: doc.length,
            details: doc.map(doc => {
                return {
                    name: doc.name,
                    imageUpload: doc.imageUpload
                }
            })
        }
        res.status(200).json(response)
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

// ROUTE TO POST IMAGES TO CLOUDINARY
route.post('/', upload.single('imageUpload'), (req, res, next) => {
    // console.log(req.file)
    const details = new Details({
        name: req.body.name,
        imageID: '',
        imageUpload: req.file.path
    })
    cloud.upload(details.imageUpload).then(result => {
        console.log(result)
        console.log(details)
        details.imageID = result.Id;
        details.imageUpload = result.url;
        res.status(200).json({
            create_upload: details,
            message: 'card created successfully',
            created_details:{
                name: result.name,
                imageUpload: result.imageUpload
            }
        })
        details.save().then(result => {
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
})

module.exports = route