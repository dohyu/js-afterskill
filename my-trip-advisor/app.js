var http = require('http');
var fs = require('fs');
var app = http.createServer(function (request, response) {
    var url = request.url;

    if (url === '/') {
        url = '/index.html';
    }

    var file = __dirname + url;
    if (! fs.existsSync(file)) {
        return response.writeHead(404);
    }

    response.writeHead(200);
    response.end(fs.readFileSync(file));
});
app.listen(3000);
console.log('Server running!');