const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
console.log("server starting at port ",port);

const server = http.createServer(app);

server.listen(port);