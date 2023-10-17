import {fabric} from 'fabric'
import { FC, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client';
interface Props{
  user:any,
  socket:Socket,
  image:any,
  setImage:any,
}
const Whiteboard:FC<Props>= ({user,socket,image,setImage}) => {
  const [img,setImg]=useState<string>('');
  

const canvasRef=useRef<HTMLCanvasElement>(null);
const [canvas,setCanvas]=useState<fabric.Canvas>();
const [pencilWidth,setPencilWidth]=useState<number>(3);
const [canvasHistoryIndex,setCanvasHistoryIndex]=useState(-1);
const canvasHistory=useRef<any>([])
const canvasBg=useRef('#FFFFFF')
const [isDrawing,setIsDrawing]=useState(true);
const [penColor,setPenColor]=useState('#000000');

useEffect(() => {
  
  socket.on('whiteboardDataResponse', (data) => {
    setImg(data.imgURL);
  })
},[]);
if(!user?.presenter){
  return (
    <div>
      <img src={img} alt="real time whiteboard image" className='h-100 w-100'/>
    </div>
  )
}

useEffect(()=>{

  const fabricCanvas=new fabric.Canvas(canvasRef.current,{
    height:window.innerWidth-60,
    width:window.innerWidth-10,
    backgroundColor:canvasBg.current,
    isDrawingMode:user?.presenter?true:false,
  })
  setCanvas(fabricCanvas);
  return ()=>{
    fabricCanvas.dispose();
  }
},[canvasRef])


useEffect(()=>{
if(!canvas) return;
enableEventListeners();
return ()=>disableEventListeners();
},[canvas,canvasHistory.current,canvasHistoryIndex])




useEffect(()=>{
  if(!canvas) return;
  const canvasImage=canvas.toDataURL();
  console.log(canvasImage);
  setImage(canvasImage);
  socket.emit('whiteboardData',canvasImage);
  canvas.renderAll();
},[canvasHistory.current])





const changePencilWidth=(width:number)=>{
if(!canvas) return;
canvas.freeDrawingBrush.width=width;
setPencilWidth(width);
canvas.renderAll.bind(canvas);
}

const handleUndo=()=>{
  if(!canvas) return;
  if(canvasHistoryIndex>0){
    const state=canvasHistory.current[canvasHistoryIndex-1];
    setCanvasHistoryIndex(canvasHistoryIndex-1);
    disableEventListeners();
    canvas.loadFromJSON(state,()=>{
      canvas.renderAll();
    })
    enableEventListeners();
    
  }
  else{
    disableEventListeners();
    clearBoard();
    enableEventListeners();
    setCanvasHistoryIndex(-1);
  }
}
const handleRedo=()=>{
  if(!canvas) return;
  console.log(canvasHistory.current);
  if(canvasHistoryIndex<canvasHistory.current.length-1)
  {
    const state=canvasHistory.current[canvasHistoryIndex+1];
    setCanvasHistoryIndex(canvasHistoryIndex+1);
    disableEventListeners();
    canvas.loadFromJSON(state,()=>{
      canvas.renderAll();
    })
    enableEventListeners();
  }
}
const clearBoard=()=>{
  if(!canvas) return;
  canvas.clear();
  canvas.backgroundColor=canvasBg.current;
}
const saveCanvasState=()=>{
  if(!canvas) return;
  const state=canvas.toDatalessObject();
  const newStates=canvasHistory.current.slice(0,canvasHistoryIndex+1);
  newStates.push(state);
  canvasHistory.current=newStates;
  setCanvasHistoryIndex(canvasHistoryIndex+1);

}
const enableEventListeners=()=>{
  if(!canvas) return;
  canvas.on('object:added',saveCanvasState);
  canvas.on('object:modified',saveCanvasState);
  canvas.on('object:removed',saveCanvasState);
}
const disableEventListeners=()=>{
  if(!canvas) return;
  canvas.off('object:added',saveCanvasState);
  canvas.off('object:modified',saveCanvasState);
  canvas.off('object:removed',saveCanvasState);
}
const changePenColor=(color:string)=>{
  if(!canvas) return;
  canvas.freeDrawingBrush.color=color;
  setPenColor(color);
  canvas.renderAll.bind(canvas);
}
const exportBoard=()=>{
  if(!canvas) return;
  const json=JSON.stringify(canvas.toDatalessJSON());
  const link=document.createElement('a');
  link.download=`fabric-board-${new Date().getTime()}.json`;
  link.href=`data:text/json;charset=utf-8,${encodeURIComponent(json)}`;
  link.click();
}
let loadedImageData:any=null;
const loadBoard=()=>{
  if(!canvas) return;
  const input=document.createElement('input');
  input.type="file";
  input.accept=".json";
  input.onchange=(e)=>{
    if(!e.target) return;
    const file=(e.target as any).files?.[0];
    if(!file) return;
    const reader=new FileReader();
    reader.onload=(event)=>{
      if(!event.target) return;
      const contents=event.target.result;
      canvas.loadFromJSON(contents,()=>{
        canvas.renderAll();
      });
    };
    reader.readAsText(file);
  };
  
  input.click();
}
const downloadBoard=()=>{
  if(!canvas) return;
  const pngData=canvas.toDataURL({
    format:'png',
    quality:0.8,
    multiplier:4,
  });
  const link=document.createElement('a');
  link.download=`fabric-board-${new Date().getTime()}.png`;
  link.href=pngData;
  link.click();
}
const drawCircle=()=>{
  if(!canvas) return;
  const circle=new fabric.Circle({
    radius:50,
    stroke:penColor,
    strokeWidth:1,
    left:100,
    top:100,
    fill:'transparent',
  })
  canvas.add(circle)
}
const drawRect=()=>{
  if(!canvas) return;
  const rect=new fabric.Rect({
    width:90,
    height:80,
    stroke:penColor,
    strokeWidth:2,
    fill:'transparent',
    left:50,
    top:50,
  })
  canvas.add(rect)
}
const addText=()=>{
  if(!canvas) return;
  const text=new fabric.IText("Enter text",{
    fill:penColor,
    left:50,
    top:50,
  })
  canvas.add(text);
}
const deleteSelected=()=>{
  if(!canvas) return;
  const activeObjects=canvas.getActiveObjects();
  if(activeObjects){
    canvas.remove(...activeObjects);
  }
}
const toggleDrawingMode=()=>{
  if(!canvas) return;
  canvas.isDrawingMode=!canvas.isDrawingMode;
  setIsDrawing(canvas.isDrawingMode);
}


  return (
    <>
    
    {user?.presenter && 
    <div>
    <input 
    type='range'
    min={1}
    max={30}
    value={pencilWidth}
    onChange={e=>changePencilWidth(parseInt(e.target.value))}
    />
    <button className='btn btn-primary mt-1' onClick={handleUndo} disabled={canvasHistoryIndex<0}>
      Undo
    </button>
    <button className='btn btn-outline-primary mt-1' onClick={handleRedo} disabled={canvasHistoryIndex===canvasHistory.current.length-1}>
      Redo
    </button>
    <input
    type='color'
    value={penColor}
    onChange={(e)=>changePenColor(e.target.value)}
    />
    <button onClick={exportBoard}>
     Export Board
    </button>
    <button onClick={loadBoard}>
      Load Board
    </button>
    <button onClick={downloadBoard}>
      Download Board
    </button>
    <button onClick={drawCircle}>
      Circle
    </button>
    <button onClick={drawRect}>
      Rectangle
    </button>
    <button onClick={addText}>
      Add Text
    </button>
    <button onClick={toggleDrawingMode}>
     Select
    </button>
    <button onClick={deleteSelected}>
    Delete Selected
    </button>
    </div>
}
<canvas id='canvas' ref={canvasRef} />
    </>
  )
}

export default Whiteboard
