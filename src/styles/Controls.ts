import { Theme } from "@mui/material";

export const controlsContainerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

export const controlStyles = {
  display: "flex",
  alignItems: "center",
  padding: (theme: Theme) => theme.spacing(0.5),
  marginBottom: (theme: Theme) => theme.spacing(1),
};

export const uploadContainerStyles = {
  marginBottom: (theme: Theme) => theme.spacing(1),
};

export const canvasWidthStyles = {
  paddingRight: (theme: Theme) => theme.spacing(1),
  width: "160px",
};

export const canvasHeightStyles = {
  padding: (theme: Theme) => theme.spacing(0, 1),
  width: "160px",
};

export const tileContainerStyles = {
  marginRight: (theme: Theme) => theme.spacing(1),
};

export const controlsTextStyles = {
  fontWeight: "bold",
};

export const mainControlsContainer = {
  margin: (theme: Theme) => theme.spacing(6, 0),
};
