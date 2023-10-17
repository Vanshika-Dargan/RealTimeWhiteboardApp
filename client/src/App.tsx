import Forms from "./components/Forms/main";
import {Route, Routes} from "react-router-dom";
import RoomPage from "./pages/Room/main";
import { v4 as uuidv4 } from 'uuid';
import  io from "socket.io-client";
import { useState,useEffect } from "react";

const server='http://localhost:8080';
const connectionOptions={
  "force new connection" : true,
  "reconnectionAttempts": 10000,
  "timeout" : 10000,
  "transports" : ["websocket"]
}
const socket=io(server,connectionOptions)

const App = () => {
  
  const [user,setUser]=useState(null);



useEffect(()=>{
socket.on("userIsJoined",(data)=>{
  if(data.success){
    console.log('User is Joined successfully')
  }
  else{
    console.log('Something went wrong')
  }
})
},[])
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
