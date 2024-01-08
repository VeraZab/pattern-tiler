import { ThemeProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import { ChangeEvent, useRef, useState } from 'react';

import Canvas from './components/Canvas';
import Controls from './components/Controls';
import Layout from './components/Layout';
import { theme } from './theme';

export interface CanvasDimensions {
  width: number,
  height: number,
}

export interface TileDimensions {
  originalWidth: number,
  originalHeight: number,
  width: number,
  height: number,
}


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
    height: 0
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type.match('image.*')) {
      const imageUrl = URL.createObjectURL(file);

      setImageUrl(imageUrl);
      setFileName(file.name.replace('.png', ''))

      const img = new Image();

      img.onload = () => {
        setTileState({
          originalHeight: img.naturalHeight,
          originalWidth: img.naturalWidth,
          height: img.naturalHeight,
          width: img.naturalWidth
        })

        setImage(img);
      }

      img.src = imageUrl;
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Box
          sx={
            theme => (
              {
                display: 'flex',
                flex: 1,
                overflowY: 'auto',
                backgroundColor: '#e3e1e1',
                margin: `${theme.spacing(2)} 0`,
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column-reverse',

                }
              }
            )
          }
        >
          <Canvas
            canvasRef={canvasRef}
            canvasState={canvasState}
            tileState={tileState}
            image={image}
          />
          <Controls
            canvasRef={canvasRef}
            canvasState={canvasState}
            setCanvasState={setCanvasState}
            tileState={tileState}
            setTileState={setTileState}
            fileName={fileName}
            handleFileChange={handleFileChange}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </Box>
      </Layout>
    </ThemeProvider >
  );
}

export default App;
