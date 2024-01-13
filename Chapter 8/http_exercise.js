import http from 'http';
import fs from 'fs';

const hostname = '127.18.14.93';
const port = 3000

const handler = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    fs.readFile('./events.json', (err, data) => {
        res.write(data);
        res.end();
    })
}

const server = http.createServer(handler)

const onServerReady = () => {
    console.log(`Server running at http://${hostname}:${port}`);
}

server.listen(port, hostname, onServerReady)