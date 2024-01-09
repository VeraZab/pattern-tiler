import { ThemeProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import { useRef, useState } from "react";

import { Theme } from "@mui/material";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";
import Layout from "./components/Layout";
import { theme } from "./theme";
import { CanvasDimensions, ImageAttributes, TileDimensions } from "./types/appState";

export const layoutStyles = (theme: Theme) => ({
  display: "flex",
  flex: 1,
  overflowY: "auto",
  backgroundColor: "#e3e1e1",
  margin: `${theme.spacing(2)} 0`,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
});

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasDimensions>({
    width: 6000,
    height: 6000,
  });

  const [tileState, setTileState] = useState<TileDimensions>({
    originalHeight: 0,
    originalWidth: 0,
    width: 0,
    height: 0,
  });

  const [imageState, setImageState] = useState<ImageAttributes>({
    image: null,
    fileName: null,
    url: null,
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Box
          sx={layoutStyles}
        >
          <Canvas
            canvasRef={canvasRef}
            canvasState={canvasState}
            tileState={tileState}
            imageState={imageState}
          />
          <Controls
            canvasRef={canvasRef}
            canvasState={canvasState}
            setCanvasState={setCanvasState}
            tileState={tileState}
            setTileState={setTileState}
            imageState={imageState}
            setImageState={setImageState}
          />
        </Box>
      </Layout>
    </ThemeProvider>
  );
};

export default App;