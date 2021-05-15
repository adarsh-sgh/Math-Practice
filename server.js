
const http=require('http');
const express=require('express');
const socketio=require('socket.io')

const app=express();
const server=http.createServer(app);
const io =socketio(server);

app.use(express.static(__dirname));
io.on('connection',socket=>{
    console.log('a user connected with id = '+socket.id)
})
const PORT= process.env.PORT||3000
server.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})