import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { ChangeEvent } from "react";

import { CanvasDimensions } from "../types/appState";
import { ControlsProps } from "../types/controls";
import ImageInput from "./ImageInput";

const controlsContainerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

const controlStyles = {
  display: "flex",
  alignItems: "center",
  padding: (theme: Theme) => theme.spacing(0.5),
  marginBottom: (theme: Theme) => theme.spacing(1),
};

const uploadContainerStyles = {
  marginBottom: (theme: Theme) => theme.spacing(1),
}

const canvasWidthStyles = {
  paddingRight: (theme: Theme) => theme.spacing(1),
  width: "160px",
}

const canvasHeightStyles = {
  padding: (theme: Theme) => theme.spacing(0, 1),
  width: "160px",
}

const tileContainerStyles = {
  marginRight: (theme: Theme) => theme.spacing(1),
}

const controlsTextStyles = {
  fontWeight: 'bold'
}

const mainControlsContainer = {
  margin: (theme: Theme) => theme.spacing(6, 0)
}

const Controls: React.FC<ControlsProps> = ({
  canvasRef,
  canvasState,
  setCanvasState,
  tileState,
  setTileState,
  imageState,
  setImageState
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type.match("image.*")) {
      const imageUrl = URL.createObjectURL(file);
      setImageState((prev) => ({
        ...prev,
        url: imageUrl,
        fileName: file.name.replace(".png", ""),
      }));

      const img = new Image();

      img.onload = () => {
        setTileState({
          originalHeight: img.naturalHeight,
          originalWidth: img.naturalWidth,
          height: img.naturalHeight,
          width: img.naturalWidth,
        });

        setImageState((prev) => ({ ...prev, image: img }));
      };

      img.src = imageUrl;
    }
  };

  const tile = () => {
    if (imageState.url && canvasRef.current) {
      const img = new Image();
      img.width = tileState.width;
      img.height = tileState.height;

      img.onload = () => {
        const numTimesImgFitsHorizontally = Math.ceil(canvasState.width / tileState.width);
        const numTimesImgFitsVertically = Math.ceil(canvasState.height / tileState.height);
        const tempCanvas = document.createElement("canvas");

        if (tempCanvas) {
          tempCanvas.width = tileState.width * numTimesImgFitsHorizontally;
          tempCanvas.height = tileState.height * numTimesImgFitsVertically;
          const tempCtx = tempCanvas.getContext("2d");

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
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            ctx.drawImage(
              tempCanvas,
              0,
              0,
              canvasState.width,
              canvasState.height,
              0,
              0,
              canvasState.width,
              canvasState.height,
            );
          }
        }
      };

      img.src = imageState.url;
    }
  };

  const download = () => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const imageDataURL = canvas.toDataURL("image/png"); // Or 'image/jpeg'

      // Create a temporary download link
      const downloadLink = document.createElement("a");
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
  };

  return (
    <Box
      sx={controlsContainerStyles}
    >
      <Box>
        <Box
          sx={uploadContainerStyles}
        >
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload tile
            <ImageInput onChange={handleFileChange} />
          </Button>
        </Box>

        <Box sx={mainControlsContainer}>
          <Box sx={controlStyles}>
            <TextField
              value={canvasState.width}
              variant="standard"
              size="small"
              sx={canvasWidthStyles}
              InputProps={{
                endAdornment: <InputAdornment position="end">px (width)</InputAdornment>,
              }}
              type="number"
              onChange={(e) => {
                if (canvasRef?.current) {
                  const canvasWidth = parseInt(e.target.value);
                  canvasRef.current.width = canvasWidth;
                  setCanvasState((prev: CanvasDimensions) => ({
                    ...prev,
                    width: canvasWidth,
                  }));
                }
              }}
            />

            <Box sx={controlsTextStyles}>X</Box>

            <TextField
              value={canvasState.height}
              variant="standard"
              size="small"
              sx={canvasHeightStyles}
              InputProps={{
                endAdornment: <InputAdornment position="end">px (height)</InputAdornment>,
              }}
              type="number"
              onChange={(e) => {
                if (canvasRef?.current) {
                  const canvasHeight = parseInt(e.target.value);
                  canvasRef.current.height = canvasHeight;
                  setCanvasState((prev: CanvasDimensions) => ({
                    ...prev,
                    height: canvasHeight,
                  }));
                }
              }}
            />

            <Box sx={controlsTextStyles}>Canvas Size</Box>
          </Box>

          <Box sx={controlStyles}>
            <TextField
              value={tileState.width}
              variant="standard"
              size="small"
              sx={canvasWidthStyles}
              InputProps={{
                endAdornment: <InputAdornment position="end">px (width)</InputAdornment>,
              }}
              type="number"
              onChange={(e) => {
                if (canvasRef.current) {
                  const tileWidth = parseInt(e.target.value);
                  setTileState((prev) => ({
                    ...prev,
                    width: tileWidth,
                  }));
                }
              }}
            />

            <Box sx={controlsTextStyles}>X</Box>

            <TextField
              value={tileState.height}
              variant="standard"
              size="small"
              sx={canvasHeightStyles}
              InputProps={{
                endAdornment: <InputAdornment position="end">px (height)</InputAdornment>,
              }}
              type="number"
              onChange={(e) => {
                if (canvasRef.current) {
                  const tileHeight = parseInt(e.target.value);
                  setTileState((prev) => ({
                    ...prev,
                    height: tileHeight,
                  }));
                }
              }}
            />

            <Box sx={controlsTextStyles}>Tile Size</Box>

            <IconButton
              onClick={() => {
                setTileState((prev) => ({
                  ...prev,
                  width: tileState.originalWidth,
                  height: tileState.originalHeight,
                }));
              }}
              disabled={!tileState.originalHeight || !tileState.originalWidth}
            >
              <ReplayIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={controlStyles}>
          <Box
            sx={tileContainerStyles}
          >
            <Button variant="outlined" onClick={tile}>
              Tile
            </Button>
          </Box>

          <Box>
            <Button variant="contained" onClick={download} disableElevation>
              Download
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Controls;
