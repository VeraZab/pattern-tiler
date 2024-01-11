import { Theme } from "@mui/material";
import { CSSProperties } from "react";

export const canvasContainerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  padding: theme.spacing(3.5),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3.5),
    width: "100%",
    boxSizing: "border-box",
  },
});

export const canvasStyles: CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  border: "1px solid grey",
};
