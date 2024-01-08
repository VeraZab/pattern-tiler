import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Theme } from '@mui/material/styles';
import { ChangeEvent } from 'react';
import ImageInput from './ImageInput';

const controlStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: (theme: Theme) => theme.spacing(0.5),
    marginBottom: (theme: Theme) => theme.spacing(1)
}

interface ControlsProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    canvasWidth: number;
    canvasHeight: number;
    setCanvasHeight: (height: number) => void;
    setCanvasWidth: (width: number) => void;
    tileHeight: number;
    tileWidth: number;
    setTileHeight: (height: number) => void;
    setTileWidth: (width: number) => void;
    originalTileHeight: number;
    originalTileWidth: number;

    imageUrl: string | null;
    setImageUrl: (imageUrl: string) => void;
    fileName: string;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Controls = ({
    canvasRef,
    canvasWidth,
    canvasHeight,
    setCanvasHeight,
    setCanvasWidth,
    tileHeight,
    tileWidth,
    setTileHeight,
    setTileWidth,
    originalTileHeight,
    originalTileWidth,
    imageUrl,
    fileName,
    handleFileChange
}: ControlsProps) => {
    const tile = () => {
        if (imageUrl && canvasRef.current) {
            const img = new Image();
            img.width = tileWidth;
            img.height = tileHeight;

            img.onload = () => {
                const numTimesImgFitsHorizontally = Math.ceil(canvasWidth / tileWidth);
                const numTimesImgFitsVertically = Math.ceil(canvasHeight / tileHeight);
                const tempCanvas = document.createElement('canvas');
                // @ts-ignore
                tempCanvas.width = tileWidth * numTimesImgFitsHorizontally;
                // @ts-ignore
                tempCanvas.height = tileHeight * numTimesImgFitsVertically;
                // @ts-ignore
                const tempCtx = tempCanvas.getContext('2d');

                if (tempCtx) {
                    for (let x = 0; x < numTimesImgFitsHorizontally; x++) {
                        for (let y = 0; y < numTimesImgFitsVertically; y++) {
                            // @ts-ignore
                            tempCtx.drawImage(img, x * img.width, y * img.height, img.width, img.height);
                        }
                    }
                }

                // crop tempCanvas according to final needed dimensionss
                // @ts-ignore
                const ctx = canvasRef.current?.getContext('2d');
                if (ctx) {
                    ctx.drawImage(tempCanvas, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
                }

            }

            img.src = imageUrl;
        }
    }

    const download = () => {
        if (canvasRef?.current?.getContext('2d')) {
            // @ts-ignore
            const canvas = canvasRef.current;
            const imageDataURL = canvas.toDataURL('image/png'); // Or 'image/jpeg'

            // Create a temporary download link
            const downloadLink = document.createElement('a');
            // @ts-ignore
            downloadLink.href = imageDataURL;
            downloadLink.download = `${fileName}-tiled-${canvasWidth}x${canvasHeight}.png`; // Name of the file to be downloaded

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
                            value={canvasWidth}
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
                                    setCanvasWidth(canvasWidth)
                                }

                            }}
                        />
                        <Box sx={{ fontWeight: 'bold' }}>X</Box>
                        <TextField
                            value={canvasHeight}
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
                                    setCanvasHeight(canvasHeight);
                                }
                            }}
                        />
                        <Box sx={{ fontWeight: 'bold' }}>Canvas Size</Box>
                    </Box>
                    <Box sx={controlStyles}>
                        <TextField
                            value={tileWidth}
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
                                    setTileWidth(tileWidth)
                                }

                            }}
                        />
                        <Box sx={{ fontWeight: 'bold' }}>X</Box>
                        <TextField
                            value={tileHeight}
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
                                    setTileHeight(tileHeight);
                                }
                            }}
                        />
                        <Box sx={{ fontWeight: 'bold' }}>Tile Size</Box>
                        <IconButton
                            onClick={
                                () => {
                                    setTileHeight(originalTileHeight);
                                    setTileWidth(originalTileWidth)
                                }
                            }
                            disabled={!originalTileHeight || !originalTileWidth}
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
