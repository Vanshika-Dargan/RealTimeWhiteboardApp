import { FC,useState,MouseEvent } from "react";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
interface Props{
  uuid:()=>string;
  socket:Socket;
  setUser:any;
}
const CreateRoom:FC<Props> = ({uuid,socket,setUser}) => {
  const navigate=useNavigate()
  const [roomId,setRoomId]=useState<string>();
  const [room,setRoom]=useState('');
  const handleCreateRoom=(e:MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault();
  const roomData={
    room,
    roomId,
    userId:uuid(),
    host:true,
    presenter:true
  }
  setUser(roomData);
  socket.emit("userJoin",roomData)
  navigate(`/${roomId}`)
  }
  return (
    <>
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          value={room}
          onChange={(e)=>setRoom(e.target.value)}
          className="form-control my-2 "
          placeholder="Enter Room Name"
        />
      </div>
      <div className="form-group border rounded-2">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0"
            placeholder="Generate Room Code"
            disabled
          />
          <div className="input-group-append ">
            <button className="btn btn-primary btn-sm me-1" onClick={()=>setRoomId(uuid())} type="button">
              Generate
            </button>
            <button className="btn btn-outline-danger btn-sm me-1">Copy</button>
          </div>
        </div>
      </div>
      <button type="submit" onClick={handleCreateRoom} className="btn btn-primary mt-4 btn-block form-control">
        Generate Room
      </button>
    </form>
    </>
  );
};

export default CreateRoom;
