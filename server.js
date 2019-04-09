
// CREATE A SIMPLE SERVER
var http = require('http');
var app = require('./app')

var port = process.env.PORT || 3030;

var server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`running on port ${port}`)
})