import { FC } from "react";
import Whiteboard from "../../components/WhiteBoard/main";
import "./index.css";
import { Socket } from "socket.io-client";

interface Props{
user:any,
socket:Socket
}
const RoomPage:FC<Props> = ({user,socket}) => {
  return (
    <>
      <h1 className="text-center py-5">Welcome</h1>
      <div className="row">
        <div className="col-md-12 mt-2 mb-5 mx-auto d-flex align-items-center justify-content-around">
          <div className="d-flex col-md-2 gap-3">
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="pencil">Pencil</label>
              
            </div>
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="line">Line</label>
              
            </div>
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="rect">Rectangle</label>
              
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex flex-column align-items-center">
              <label htmlFor="color">Select Color</label>
              
            </div>
          </div>
          <div className='col-md-2 d-flex gap-2'>
            <button className='btn btn-primary mt-1'>Undo</button> 
            <button className='btn btn-outline-primary mt-1'>Redo</button> 
          </div>
          <div className="col-md-2">
           <button className="btn btn-danger">Clear Canvas</button>
          </div>
        </div>
      
      <div className="col-md-12  mx-auto mb-5 whiteboard">
        <Whiteboard user={user} socket={socket}
        />
        </div>
        </div>
    </>
  );
};

export default RoomPage;
