import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ChangeEvent, useEffect, useState } from 'react';
import ImageInput from './ImageInput';



const Controls = () => {
    const [ctx, setCtx] = useState(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const desiredImgWidth = 3;
    const desiredDPI = 300;
    const printWidth = 6075;
    const printHeight = 8775;

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        if (canvas) {
            // @ts-ignore
            canvas.width = printWidth;
            // @ts-ignore
            canvas.height = printHeight;
            // @ts-ignore
            setCtx(canvas.getContext('2d'));
        }
    }, []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };

    const tile = () => {
        if (imageUrl && ctx) {
            const img = new Image();
            const targetPixelWidth = desiredImgWidth * desiredDPI;
            img.width = targetPixelWidth;
            img.height = targetPixelWidth;

            img.onload = () => {
                const numTimesImgFitsHorizontally = Math.ceil(printWidth / targetPixelWidth);
                const numTimesImgFitsVertically = Math.ceil(printHeight / targetPixelWidth);
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
                ctx.drawImage(tempCanvas, 0, 0, printWidth, printHeight, 0, 0, printWidth, printHeight);
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
            downloadLink.download = `tiled-${printWidth}x${printHeight}.png`; // Name of the file to be downloaded

            // Append the link to the document and trigger a click
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Clean up by removing the link
            document.body.removeChild(downloadLink);
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Uploaded"
                    style={{
                        objectFit: 'cover', maxWidth: '100%', maxHeight: '100%'
                    }} />
            )}
            <Box>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload file
                    <ImageInput type="file" onChange={handleFileChange} />
                </Button>
                <Button onClick={tile}>Compute</Button>
                <Button onClick={download}>Download</Button>
            </Box>
        </Box>

    );
}

export default Controls;
