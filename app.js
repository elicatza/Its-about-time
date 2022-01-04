const http = require("http");
const fs = require("fs");
const port = 3000;
const serverUrl = "127.0.0.1";
const baseDir = __dirname + "/static";
let contentType;


const server = http.createServer(function(req, res) {

    function readFileCallback(err, data) {
        if (err) { 
            console.log(err);
            return 1;
        }

        res.writeHead(200, contentType);
        res.write(data);
        res.end();
    }

    console.log("Request: " + req.url);
    console.log(req.url.slice(-1));

    if (req.url.slice(-1) === '/') {
        err404();
        return;
    } else if (req.url.indexOf(".html") != -1) {
        contentType = {"Content-Type": "text/html"};
        fs.readFile(baseDir + req.url, readFileCallback);
    } else if (req.url.indexOf(".css") != -1) {
        contentType = {"Content-Type": "text/css"};
        fs.readFile(baseDir + req.url, readFileCallback);
    } else if (req.url.indexOf(".js") != -1) {
        contentType = {"Content-Type": "text/javascript"};
        fs.readFile(baseDir + req.url, readFileCallback);
    } else if (req.url.indexOf(".ico") != -1) {
        res.end();
    } else {
        console.log("No extention");
        contentType = {"Content-Type": "text/javascript"};
        fs.readFile(baseDir + req.url + ".js", readFileCallback);
    }

});

console.log("Starting a web server at " + serverUrl + ":" + port);
server.listen(port, serverUrl);
