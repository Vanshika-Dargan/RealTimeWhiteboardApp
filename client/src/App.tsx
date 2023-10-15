import Forms from "./components/Forms/main";
import {Route, Routes} from "react-router-dom";
import RoomPage from "./pages/Room/main";
import { v4 as uuidv4 } from 'uuid';
import  io from "socket.io-client";
import { useState,useEffect } from "react";


const App = () => {
  const server='http://localhost:5000';
const connectionOptions={
  "force new connection":true,
  reConnectionAttempts:"Infinity",
  timeout:10000,
  transports:["websocket"]
}
const socket=io(server,connectionOptions)
  const [user,setUser]=useState(null);

socket.on('connect',()=>{
  console.log("Connected successfully")
})
useEffect(()=>{
socket.on("userJoin",(data)=>{
  console.log(data)
  if(data.success){
    console.log("User joined successfully")
  }
  else{
    console.log("Not able to join user")
  }
})
},[socket])
  const uuid=()=>{
    return uuidv4();
  }
  return (
    <>
    <div className="container">
    <Routes>
      <Route path='/' element={<Forms uuid={uuid} socket={socket} setUser={setUser}/> } />
      <Route path="/:roomId" element={<RoomPage user={user} socket={socket} />}/>
    </Routes>
    </div>
    </>
  )
}

export default App
