import Box from '@mui/material/Box';
import { useEffect } from 'react';

interface CanvasProps {
    canvasHeight: number;
    canvasWidth: number;
    tileHeight: number;
    tileWidth: number;
    image: HTMLImageElement | null;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas = ({ canvasRef, tileHeight, tileWidth, image, canvasWidth, canvasHeight }: CanvasProps) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvasRef.current.width = canvasWidth;
            canvasRef.current.height = canvasHeight;
        }

    }, [canvasHeight, canvasWidth, canvasRef]);

    useEffect(() => {
        if (image && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(image, 0, 0, tileWidth, tileHeight);
            }
        }

    }, [image, canvasRef, tileHeight, tileWidth, canvasWidth, canvasHeight])

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
