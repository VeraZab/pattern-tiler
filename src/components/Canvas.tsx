import Box from '@mui/material/Box';
import { useEffect } from 'react';

import { CanvasDimensions, TileDimensions } from '../App';

interface CanvasProps {
    canvasState: CanvasDimensions;
    tileState: TileDimensions;
    image: HTMLImageElement | null;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas: React.FC<CanvasProps> = ({ canvasRef, tileState, image, canvasState }) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvasRef.current.width = canvasState.width;
            canvasRef.current.height = canvasState.height;
        }

    }, [canvasState, canvasRef]);

    useEffect(() => {
        if (image && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvasState.width, canvasState.height);
                ctx.drawImage(image, 0, 0, tileState.width, tileState.height);
            }
        }

    }, [image, canvasRef, tileState, canvasState])

    return (
        <Box
            sx={
                theme => (
                    {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50%',
                        padding: theme.spacing(3.5),
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                        }
                    }
                )
            }
        >

            <canvas
                ref={canvasRef}
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
