
import Box from '@mui/material/Box';

const Canvas = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                backgroundColor: '#bababa'
            }}
        >
            <canvas id="canvas" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
        </Box >
    );
}

export default Canvas;
