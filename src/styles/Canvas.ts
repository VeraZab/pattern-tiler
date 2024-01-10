import { Theme } from "@mui/material";
import { CSSProperties } from "react";

export const canvasContainerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  padding: theme.spacing(3.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

export const canvasStyles: CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  border: "1px solid grey",
};
