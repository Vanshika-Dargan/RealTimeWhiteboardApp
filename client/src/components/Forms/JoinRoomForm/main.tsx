import { Socket } from "socket.io-client";
import { FC, useState,MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
interface Props{
  uuid:()=>string;
  socket:Socket;
  setUser:any;
}
const JoinRoom:FC<Props> = ({uuid,socket,setUser}) => {
  const navigate=useNavigate();
  const [roomId,setRoomId]=useState('');
  const [room,setRoom]=useState('');
  const handleJoinRoom=(e:MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault();
  const roomData={
    room,
    roomId,
    userId:uuid(),
    host:false,
    presenter:false
  }
  setUser(roomData);
  socket.emit('userJoin',roomData)
  navigate('/${roomId}')
  }
  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2 "
          placeholder="Enter Room Name"
          value={room}
          onChange={e=>setRoom(e.target.value)}
        />
      </div>
      <div className="form-group">
          <input
            type="text"
            className="form-control my-2 "
            placeholder="Enter Room Code"
            value={roomId}
            onChange={e=>setRoomId(e.target.value)}
          />
      </div>
      <button type="submit" onClick={handleJoinRoom} className="btn btn-info mt-4 btn-block form-control">
        Join Room
      </button>
    </form>
  );
};

export default JoinRoom