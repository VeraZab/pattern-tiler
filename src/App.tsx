import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageInput from './components/ImageInput'

import { useState, ChangeEvent } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState<string | null>(null);;
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

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
          {image && <img src={image} alt="Uploaded" style={{
            objectFit: 'cover', maxWidth: '100%', maxHeight: '100%'
          }} />}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <ImageInput type="file" onChange={handleFileChange} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
