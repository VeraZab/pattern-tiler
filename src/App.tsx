import { ThemeProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import { ChangeEvent, useRef, useState } from 'react';

import Canvas from './components/Canvas';
import Controls from './components/Controls';
import Layout from './components/Layout';
import { theme } from './theme';


const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(6000);
  const [canvasHeight, setCanvasHeight] = useState(6000);
  const [originalTileHeight, setOriginalTileHeight] = useState(0);
  const [originalTileWidth, setOriginalTileWidth] = useState(0);
  const [tileHeight, setTileHeight] = useState(0);
  const [tileWidth, setTileWidth] = useState(0);
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
        setOriginalTileHeight(img.naturalHeight);
        setOriginalTileWidth(img.naturalWidth);
        setTileHeight(img.naturalHeight);
        setTileWidth(img.naturalWidth);
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
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
            tileHeight={tileHeight}
            tileWidth={tileWidth}
            image={image}
          />
          <Controls
            canvasRef={canvasRef}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            setCanvasHeight={setCanvasHeight}
            setCanvasWidth={setCanvasWidth}
            fileName={fileName}
            setTileHeight={setTileHeight}
            setTileWidth={setTileWidth}
            tileHeight={tileHeight}
            tileWidth={tileWidth}
            handleFileChange={handleFileChange}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            originalTileHeight={originalTileHeight}
            originalTileWidth={originalTileWidth}
          />
        </Box>
      </Layout>
    </ThemeProvider >
  );
}

export default App;
