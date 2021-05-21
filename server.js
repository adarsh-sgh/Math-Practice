
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// const rooms={}
let roomAcceptingEntry = false;
const playerLimit = 5;
app.use(express.static(__dirname));
io.on('connection', socket => {
    console.log('a user connected with id = ' + socket.id)
    addToRandomRoom()
    async function addToRandomRoom() {

        usersInRoom(roomAcceptingEntry).then(numberOfUsers => {
            console.log("users in this room: ", numberOfUsers)
            if (numberOfUsers < playerLimit) {
                socket.join(roomAcceptingEntry);
            } else {
                socket.join(socket.id);
                roomAcceptingEntry = socket.id;
            }
            socket.broadcast.to(roomOf(socket)).emit('userJoined', socket.id)
        }).catch(e => console.log(e))
    }
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })


function roomOf(socket) {
    let roomArray = Array.from(socket.rooms);
    //we assume array has joined 2 rooms only ;one it's default room (id) and other in which game gonna happen
    return roomArray[0] = socket.id ? roomArray[1] : roomArray[0];
}
async function usersInRoom(room) {
    let setOfIdsInRoom = await io.in(room).allSockets();
    return setOfIdsInRoom.size;
}