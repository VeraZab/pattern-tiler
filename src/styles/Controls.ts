import { Theme } from "@mui/material";

export const controlsContainerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "50%",
  [theme.breakpoints.down("md")]: {
    justifyContent: "start ",
    width: "100%",
    padding: theme.spacing(4),
    boxSizing: "border-box"
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
  width: "100%"
});

export const mainControlsContainer = (theme: Theme) => ({
  margin: theme.spacing(3, 0),
  width: "100%",
});

export const mainActionsContainerStyles = (theme: Theme) => ({
  display: "flex",
  justifyContent: "start",
  width: "100%",
})

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



