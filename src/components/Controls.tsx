import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useEffect, useState } from 'react';
import ImageInput from './ImageInput';

const Controls = () => {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [desiredImgWidth, setDesiredImgWidth] = useState(3);
    const [desiredDPI, setDesiredDPI] = useState(300);
    const [targetWidth, settargetWidth] = useState(6075);
    const [targetHeight, settargetHeight] = useState(8775);

    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
        if (canvas) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            setCtx(canvas.getContext('2d'));
        }
    }, []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && ctx) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);

            const img = new Image();
            const targetPixelWidth = targetWidth;
            img.width = targetPixelWidth;
            img.height = targetPixelWidth;

            img.onload = () => {
                // @ts-ignore
                ctx.drawImage(img, 0, 0);
            }

            img.src = imageUrl;
        }
    };

    const tile = () => {
        if (imageUrl && ctx) {
            const img = new Image();
            const targetPixelWidth = desiredImgWidth * desiredDPI;
            img.width = targetPixelWidth;
            img.height = targetPixelWidth;

            img.onload = () => {
                const numTimesImgFitsHorizontally = Math.ceil(targetWidth / targetPixelWidth);
                const numTimesImgFitsVertically = Math.ceil(targetHeight / targetPixelWidth);
                const tempCanvas = document.createElement('canvas');
                // @ts-ignore
                tempCanvas.width = targetPixelWidth * numTimesImgFitsHorizontally;
                // @ts-ignore
                tempCanvas.height = targetPixelWidth * numTimesImgFitsVertically;
                // @ts-ignore
                const tempCtx = tempCanvas.getContext('2d');

                if (tempCtx) {
                    for (let x = 0; x < numTimesImgFitsHorizontally; x++) {
                        for (let y = 0; y < numTimesImgFitsVertically; y++) {
                            // @ts-ignore
                            tempCtx.drawImage(img, x * img.width, y * img.width, img.width, img.height);
                        }
                    }
                }

                // crop tempCanvas according to final needed dimensionss
                // @ts-ignore
                ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
            }

            img.src = imageUrl;
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
            downloadLink.download = `tiled-${targetWidth}x${targetHeight}.png`; // Name of the file to be downloaded

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
                        flexDirection: 'column',
                        width: '50%',
                        backgroundColor: '#bababa',
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                        }
                    }
                )
            }
        >
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload image tile
                <ImageInput type="file" onChange={handleFileChange} />
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: theme => theme.spacing(0.5), }}>
                <TextField
                    value={targetHeight}
                    variant="standard"
                    size="small"
                    sx={{ paddingRight: theme => theme.spacing(1), width: '90px' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">px</InputAdornment>,
                    }}
                />
                <Box sx={{ fontWeight: 'bold' }}>X</Box>
                <TextField
                    value={targetWidth}
                    variant="standard"
                    size="small"
                    sx={{ padding: theme => theme.spacing(0, 1), width: '90px' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">px</InputAdornment>,
                    }}
                />
                <Box sx={{ fontWeight: 'bold' }}>Target Canvas Size (W x H)</Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: theme => theme.spacing(0.5), }}>
                <TextField
                    value={desiredDPI}
                    variant="standard"
                    size="small"
                    sx={{ paddingRight: theme => theme.spacing(1), width: '90px' }}
                />
                <Box sx={{ fontWeight: 'bold' }}>Desired DPI</Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: theme => theme.spacing(0.5), }}>
                <TextField
                    value={desiredImgWidth}
                    variant="standard"
                    size="small"
                    sx={{ paddingRight: theme => theme.spacing(1), width: '90px' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">inch</InputAdornment>,
                    }}
                />
                <Box sx={{ fontWeight: 'bold' }}>Uploaded image desired side measurement</Box>
            </Box>

            <Button onClick={tile}>Tile</Button>
            <Button onClick={download}>Download</Button>

        </Box >

    );
}

export default Controls;
