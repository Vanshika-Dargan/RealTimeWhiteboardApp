import { useState, useEffect,useRef } from "react";
import { fabric } from "fabric";

function WhiteBoard() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [pencilSize, setPencilSize] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current);
    newCanvas.setHeight(window.innerHeight);
    newCanvas.setWidth(window.innerWidth);
    newCanvas.isDrawingMode = true;
    newCanvas.freeDrawingBrush.width = pencilSize;
    newCanvas.freeDrawingBrush.color = selectedColor;
    setCanvas(newCanvas);
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.width = pencilSize;
      canvas.freeDrawingBrush.color = selectedColor;
    }
  }, [canvas, pencilSize, selectedColor]);




  const handleToolSelection = () => {
        if (canvas) {
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush.width = pencilSize;
          canvas.freeDrawingBrush.color = selectedColor;
          canvas.selection = false;
          canvas.defaultCursor = "default";
    }

  };

  return (
    <div>
      
         
            
              

              <button
                onClick={() => handleToolSelection()}
              >
               Pencil
              </button>
           
          
          <input
            type="range"
            min="1"
            max="10"
            value={pencilSize}
            onChange={(e) => setPencilSize(Number(e.target.value))}
          />
        
          
        
      <canvas ref={canvasRef} id="canvas" />
    </div>
  );
}

export default WhiteBoard;
