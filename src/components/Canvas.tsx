import Box from "@mui/material/Box";
import { useEffect } from "react";

import { canvasContainerStyles, canvasStyles } from "../styles/Canvas";
import { CanvasProps } from "../types/canvas";

const Canvas: React.FC<CanvasProps> = ({ canvasRef, tileState, imageState, canvasState }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvasRef.current.width = canvasState.width;
      canvasRef.current.height = canvasState.height;
    }
  }, [canvasState.height, canvasState.width, canvasRef]);

  useEffect(() => {
    if (imageState.image && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasState.width, canvasState.height);
        ctx.drawImage(imageState.image, 0, 0, tileState.width, tileState.height);
      }
    }
  }, [imageState.image, canvasRef, tileState, canvasState.width, canvasState.height]);

  return (
    <Box sx={canvasContainerStyles}>
      <canvas ref={canvasRef} id="canvas" style={canvasStyles} />
    </Box>
  );
};

export default Canvas;
