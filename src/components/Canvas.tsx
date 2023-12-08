
import Box from '@mui/material/Box';

const Canvas = () => {
    return (
        <Box
            sx={
                theme => (
                    {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50%',
                        backgroundColor: '#bababa',
                        padding: theme.spacing(1),
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                        }
                    }
                )
            }
        >

            <canvas
                id="canvas"
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    border: '1px solid grey'
                }}
            />

        </Box >
    );
}

export default Canvas;
