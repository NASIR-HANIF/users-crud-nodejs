const express = require("express");
const server = new express();
const fs = require("fs");
server.listen(8080);

// home page request without function keyword
server.get("/", (req, res)=> {
    var html = fs.readFileSync('./html/home.html')
    res.status(200);
    res.type("text/html");
     res.send(html)
  
})


// contect  page request function keyword
server.get('/contect', function(req, res) {        // function keyword
    var contect = fs.readFileSync('./html/contect.html');
    res.status(200);
    res.type("text/html");
     res.send(contect)
    
})


// notfound route use utf8   res type notdefine

server.get('/*', function(req, res) {
    var notfound = fs.readFileSync('./html/not_found.html', 'utf8'); // utf8
    res.status(404);
     res.send(notfound)
     
})