import http from 'http';
import express from 'express';
import fs from 'fs';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { error } from 'console';
import dayjs from 'dayjs'

const hostname = '127.0.0.1';
const port = 3000;

const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let chatroom_data = null;

app.get('/', (req, res) => {
    res.sendFile(__dirName + '/index.html');
})

io.on("connection", (socket) => {
    console.log('An user connected')
    socket.on("disconnect", () => {
        console.log('An user disconnected')
    })
    socket.on("submit message", (msg) => {
        fs.readFile('./chatroom.json', 'utf-8', (err, data) => {
            chatroom_data = Array.from(JSON.parse(data));
            let chat_msg = JSON.parse(msg)

            chat_msg['date'] = dayjs().format('YYYY-MM-DD HH:mm:ss');
            chatroom_data.push(chat_msg);

            fs.writeFile('./chatroom.json', JSON.stringify(chatroom_data), (err) => {
                console.log('An error occured while saving the chatroom data')
            })

            socket.emit("update chatroom", JSON.stringify(chatroom_data))
        })
    })
})

server.listen(port, hostname, () => {
    console.log(`Server is listening on http://${hostname}:${port} now`);
})