import { FC } from "react"
import CreateRoom from "./CreateRoomForm/main"
import JoinRoom from "./JoinRoomForm/main"
import "./index.css"
import { Socket } from "socket.io-client";

interface Props{
  uuid:()=>string;
  socket:Socket;
  setUser:any;
}
const Forms:FC<Props> = ({uuid,socket,setUser}) => {
  return (
   <>
   <div className="row h-100 pt-5">
    <div className="box col-md-4 mt-5  p-5  border  border-secondary rounded-2 mx-auto d-flex flex-column align-items-center">
        <h1 className="text-secondary fw-bold ">Create Room</h1>
        <CreateRoom uuid={uuid} socket={socket} setUser={setUser}/>
    </div>
    <div className="box col-md-4 mt-5  p-5 border border-secondary rounded-2 mx-auto d-flex flex-column align-items-center">
        <h1 className="text-secondary fw-bold">Join Room</h1>
        <JoinRoom uuid={uuid} socket={socket} setUser={setUser}/>
    </div>

   </div>
   </>
  )
}

export default Forms