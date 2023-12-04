import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import ImageInput from './components/ImageInput';

const App = () => {
  const [ctx, setCtx] = useState(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalImgSize, setOriginalImgSize] = useState({ width: 0, height: 0 });
  const desiredImgWidth = 4;
  const desiredDPI = 300;
  const printWidth = 6075;
  const printHeight = 8775;
  const printDPI = 300;

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      // @ts-ignore
      setCtx(canvas.getContext('2d'));
    }
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const tile = () => {
    if (imageUrl && ctx) {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      const targetPixelWidth = desiredImgWidth * desiredDPI;

      const img = new Image();
      img.src = imageUrl;
      img.width = desiredImgWidth;
      img.height = desiredImgWidth;

      const numTimesImgFitsHorizontally = Math.ceil(printWidth / targetPixelWidth);
      const numTimesImgFitsVertically = Math.ceil(printHeight / targetPixelWidth);

      if (tempCtx) {
        // @ts-ignore
        tempCtx.width = targetPixelWidth * numTimesImgFitsHorizontally;
        // @ts-ignore
        tempCtx.height = targetPixelWidth * numTimesImgFitsVertically;

        for (let x = 0; x < numTimesImgFitsHorizontally; x++) {
          for (let y = 0; y < numTimesImgFitsVertically; y++) {
            // @ts-ignore
            tempCtx.drawImage(img, x * img.width, y * img.width, img.width, img.height);
          }
        }
      }

      // crop tempCanvas according to final needed dimensionss
      // @ts-ignore
      ctx.drawImage(tempCanvas, 0, 0, printWidth, printHeight, 0, 0, printWidth, printHeight);

    }
  }

  const download = () => {
    if (ctx) {
      // @ts-ignore
      const canvas = ctx.canvas;
      const imageDataURL = canvas.toDataURL('image/png'); // Or 'image/jpeg'

      // Create a temporary download link
      const downloadLink = document.createElement('a');
      // @ts-ignore
      downloadLink.href = imageDataURL;
      downloadLink.download = `tiled-${printWidth}x${printHeight}.png`; // Name of the file to be downloaded

      // Append the link to the document and trigger a click
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up by removing the link
      document.body.removeChild(downloadLink);
    }
  }

  return (
    <Box
      className="App"
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Box sx={{ display: 'flex', height: '500px', width: '90%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
          <canvas id="canvas" ></canvas>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
          {imageUrl && <img src={imageUrl} alt="Uploaded" style={{
            objectFit: 'cover', maxWidth: '100%', maxHeight: '100%'
          }} onLoad={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            setOriginalImgSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalWidth });
          }} />}
          <Box>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload file
              <ImageInput type="file" onChange={handleFileChange} />
            </Button>
            <Button onClick={tile}>Compute</Button>
            <Button onClick={download}>Download</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
