import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ChangeEvent } from 'react';

import { CanvasDimensions, ImageAttributes, TileDimensions } from '../App';
import ImageInput from './ImageInput';

const controlStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: (theme: Theme) => theme.spacing(0.5),
    marginBottom: (theme: Theme) => theme.spacing(1)
}

interface ControlsProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    canvasState: CanvasDimensions;
    setCanvasState: React.Dispatch<React.SetStateAction<CanvasDimensions>>;
    tileState: TileDimensions;
    setTileState: React.Dispatch<React.SetStateAction<TileDimensions>>;
    imageState: ImageAttributes;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Controls: React.FC<ControlsProps> = ({
    canvasRef,
    canvasState,
    setCanvasState,
    tileState,
    setTileState,
    imageState,
    handleFileChange
}) => {
    const tile = () => {
        if (imageState.url && canvasRef.current) {
            const img = new Image();
            img.width = tileState.width;
            img.height = tileState.height;

            img.onload = () => {
                const numTimesImgFitsHorizontally = Math.ceil(canvasState.width / tileState.width);
                const numTimesImgFitsVertically = Math.ceil(canvasState.height / tileState.height);
                const tempCanvas = document.createElement('canvas');

                if (tempCanvas) {
                    tempCanvas.width = tileState.width * numTimesImgFitsHorizontally;
                    tempCanvas.height = tileState.height * numTimesImgFitsVertically;
                    const tempCtx = tempCanvas.getContext('2d');

                    if (tempCtx) {
                        for (let x = 0; x < numTimesImgFitsHorizontally; x++) {
                            for (let y = 0; y < numTimesImgFitsVertically; y++) {
                                tempCtx.drawImage(img, x * img.width, y * img.height, img.width, img.height);
                            }
                        }
                    }
                }

                // crop tempCanvas according to final needed dimensionss
                if (canvasRef && canvasRef.current) {
                    const ctx = canvasRef.current.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(tempCanvas, 0, 0, canvasState.width, canvasState.height, 0, 0, canvasState.width, canvasState.height);
                    }
                }

            }

            img.src = imageState.url;
        }
    }

    const download = () => {
        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current;
            const imageDataURL = canvas.toDataURL('image/png'); // Or 'image/jpeg'

            // Create a temporary download link
            const downloadLink = document.createElement('a');
            if (downloadLink) {
                downloadLink.href = imageDataURL;
                downloadLink.download = `${imageState.fileName}-tiled-${canvasState.width}x${canvasState.height}.png`; // Name of the file to be downloaded
            }


            // Append the link to the document and trigger a click
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Clean up by removing the link
            document.body.removeChild(downloadLink);
        }
    }

    return (
        <Box
            sx={
                theme => (
                    {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: '50%',
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                        }
                    }
                )
            }
        >

            <Box>
                <Box sx={{
                    marginBottom: theme => theme.spacing(1)
                }}>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}

                    >
                        Upload tile
                        <ImageInput type="file" onChange={handleFileChange} />
                    </Button>
                </Box>

                <Box sx={{ margin: theme => theme.spacing(6, 0) }}>
                    <Box sx={controlStyles}>
                        <TextField
                            value={canvasState.width}
                            variant="standard"
                            size="small"
                            sx={{ paddingRight: theme => theme.spacing(1), width: '160px' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">px (width)</InputAdornment>,
                            }}
                            type='number'
                            onChange={(e) => {
                                if (canvasRef?.current) {
                                    const canvasWidth = parseInt(e.target.value)
                                    canvasRef.current.width = canvasWidth;
                                    setCanvasState((prev: CanvasDimensions) => ({ ...prev, width: canvasWidth }))
                                }

                            }}
                        />
                        <Box sx={{ fontWeight: 'bold' }}>X</Box>
                        <TextField
                            value={canvasState.height}
                            variant="standard"
                            size="small"
                            sx={{ padding: theme => theme.spacing(0, 1), width: '160px' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">px (height)</InputAdornment>,
                            }}
                            type='number'
                            onChange={(e) => {
                                if (canvasRef?.current) {
                                    const canvasHeight = parseInt(e.target.value);
                                    canvasRef.current.height = canvasHeight;
                                    setCanvasState((prev: CanvasDimensions) => ({ ...prev, height: canvasHeight }));
                                }
                            }}
                        />
                        <Box sx={{ fontWeight: 'bold' }}>Canvas Size</Box>
                    </Box>
                    <Box sx={controlStyles}>
                        <TextField
                            value={tileState.width}
                            variant="standard"
                            size="small"
                            sx={{ paddingRight: theme => theme.spacing(1), width: '160px' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">px (width)</InputAdornment>,
                            }}
                            type='number'
                            onChange={(e) => {
                                if (canvasRef.current) {
                                    const tileWidth = parseInt(e.target.value)
                                    setTileState(prev => ({ ...prev, width: tileWidth }))
                                }

                            }}
                        />
                        <Box sx={{ fontWeight: 'bold' }}>X</Box>
                        <TextField
                            value={tileState.height}
                            variant="standard"
                            size="small"
                            sx={{ padding: theme => theme.spacing(0, 1), width: '160px' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">px (height)</InputAdornment>,
                            }}
                            type='number'
                            onChange={(e) => {
                                if (canvasRef.current) {
                                    const tileHeight = parseInt(e.target.value);
                                    setTileState(prev => ({ ...prev, height: tileHeight }));
                                }
                            }}
                        />
                        <Box sx={{ fontWeight: 'bold' }}>Tile Size</Box>
                        <IconButton
                            onClick={
                                () => {
                                    setTileState(prev => ({ ...prev, width: tileState.originalWidth, height: tileState.originalHeight }));
                                }
                            }
                            disabled={!tileState.originalHeight || !tileState.originalWidth}
                        >
                            <ReplayIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={controlStyles}>
                    <Box sx={{
                        marginRight: theme => theme.spacing(1)
                    }}>
                        <Button variant="outlined" onClick={tile}>Tile</Button>
                    </Box>
                    <Box>
                        <Button variant="contained" onClick={download} disableElevation>Download</Button>
                    </Box>
                </Box>

            </Box>
        </Box >

    );
}

export default Controls;
