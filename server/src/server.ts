import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const app=express();
const server=http.createServer(app);
const io=new Server(server)


app.get('/',(req,res)=>{
    res.send("This is realtime sharing app server")
})

let roomIdGlobal,imgURLGlobal;
io.on("connection",(socket)=>{
    socket.on("userJoin",(data)=>{
    const {room,roomId,userId,host,presenter}=data;
    roomIdGlobal=roomId;
    socket.join(roomId);
    socket.emit("userJoin",{success:true})
    socket.broadcast.to(roomId).emit("whiteboardDataResponse",{imgURL:imgURLGlobal})
    })
    socket.on('whiteboardData',(data)=>{
    imgURLGlobal=data;
    socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse",{imgURL:data})
    })
})
const port: number = Number(process.env.PORT) || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));



