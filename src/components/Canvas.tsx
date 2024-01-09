import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import { CSSProperties, useEffect } from "react";

import { CanvasProps } from "../types/canvas";

const canvasContainerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  padding: theme.spacing(3.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

const canvasStyles: CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  border: "1px solid grey",
}

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
    <Box
      sx={canvasContainerStyles}
    >
      <canvas
        ref={canvasRef}
        id="canvas"
        style={canvasStyles}
      />
    </Box>
  );
};

export default Canvas;
