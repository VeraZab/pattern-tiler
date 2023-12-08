import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ChangeEvent, useEffect, useState } from 'react';
import ImageInput from './components/ImageInput';
import Layout from './components/Layout';
import Canvas from './components/Canvas';
import Controls from './components/Controls';


const App = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          overflowY: 'auto',
          padding: '20px 0 ',

        }}
      >
        <Canvas />
        <Controls />
      </Box>
    </Layout>
  );
}

export default App;
