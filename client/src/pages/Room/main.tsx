import WhiteBoard from "../../components/WhiteBoard/main";
import "./index.css";
import { useState,useRef} from "react";
const RoomPage = () => {
  const canvasRef: React.RefObject<HTMLCanvasElement>=useRef(null);
  const ctxRef:React.MutableRefObject<CanvasRenderingContext2D | null>=useRef(null);
  const [select, setSelect] = useState("pencil");
  const [color, setColor] = useState("black");
  return (
    <>
      <h1 className="text-center py-5">Welcome</h1>
      <div className="row">
        <div className="col-md-12 mt-2 mb-5 mx-auto d-flex align-items-center justify-content-around">
          <div className="d-flex col-md-2 gap-3">
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="pencil">Pencil</label>
              <input
                id="pencil"
                type="radio"
                name="select"
                value="pencil"
                onChange={(e) => setSelect(e.target.value)}
              />
            </div>
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="line">Line</label>
              <input
                id="line"
                type="radio"
                name="select"
                value="line"
                onChange={(e) => setSelect(e.target.value)}
              />
            </div>
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="rect">Rectangle</label>
              <input
                id="rect"
                type="radio"
                name="select"
                value="rect"
                onChange={(e) => setSelect(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex flex-column align-items-center">
              <label htmlFor="color">Select Color</label>
              <input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
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
      
      <div className="col-md-12  mx-auto mb-5 border whiteboard">
        <WhiteBoard />
        </div>
        </div>
    </>
  );
};

export default RoomPage;
