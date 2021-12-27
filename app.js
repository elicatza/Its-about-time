const http = require("http");
const fs = require("fs");
const port = 3000;
const serverUrl = "127.0.0.1";


const server = http.createServer(function(req, res) {
    console.log("Request: " + req.url);

    if (req.url.indexOf(".html") != -1) {
        fs.readFile(__dirname + "/static" + req.url, function(err, text) {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(text);
            res.end();
        });
    } else if (req.url.indexOf(".css") != -1) {
        fs.readFile(__dirname + "/static" + req.url, function(err, text) {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(text);
            res.end();
        });
    } else if (req.url.indexOf(".js") != -1) {
        fs.readFile(__dirname + "/static" + req.url, function(err, text) {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(text);
            res.end();
        });
    } else if (req.url.indexOf(".ico") != -1) {
        res.end();
    }else {
        fs.readFile(__dirname + "/static" + req.url + ".js", function(err, text) {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(text);
            res.end();
        });
    }

});

console.log("Starting a web server at " + serverUrl + ":" + port);
server.listen(port, serverUrl);
