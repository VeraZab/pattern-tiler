
import Box from '@mui/material/Box';
import { ChangeEvent, useEffect, useState } from 'react';

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
        if (image && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                canvasRef.current.width = canvasWidth;
                canvasRef.current.height = canvasHeight;
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
