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

export const controlStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
});

export const uploadContainerStyles = (theme: Theme) => ({
  marginBottom: theme.spacing(1),
});

export const canvasWidthStyles = (theme: Theme) => ({
  paddingRight: theme.spacing(1),
  width: "160px",
});

export const canvasHeightStyles = (theme: Theme) => ({
  padding: theme.spacing(0, 1),
  width: "160px",
});

export const tileContainerStyles = (theme: Theme) => ({
  marginRight: theme.spacing(1),
});

export const controlsTextStyles = {
  fontWeight: "bold",
};

export const mainControlsContainer = (theme: Theme) => ({
  margin: theme.spacing(6, 0),
});
