import { Theme } from "@mui/material";

export const layoutContainerStyles = (theme: Theme) => ({
  display: "flex",
  height: "100vh",
  flexDirection: "column",
  padding: theme.spacing(2),
  overflow: "hidden",
  boxSizing: "border-box",
});
