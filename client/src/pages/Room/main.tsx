import { FC,useState } from "react";
import Whiteboard from "../../components/WhiteBoard/main";
import "./index.css";
import { Socket } from "socket.io-client";
import Model from '../../components/WhiteBoard/model'

interface Props{
user:any,
socket:Socket
}
const RoomPage:FC<Props> = ({user,socket}) => {
  const [image,setImage]=useState(null)
  return (
    <>
      <h1 className="text-center py-5">Welcome</h1>
      
      <div className="col-md-12  mx-auto mb-5 whiteboard">
        <Whiteboard user={user} socket={socket} image={image} setImage={setImage}
        />
        <Model image={image} setImage={setImage} />
        </div>
    </>
  );
};

export default RoomPage;
