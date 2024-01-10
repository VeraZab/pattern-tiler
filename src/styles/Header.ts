import { Theme } from "@mui/material";

export const headerContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const leftHandSideContainerStyles = { display: "flex", alignItems: "center" };

export const logoStyles = { width: "50px", paddingRight: "15px" };

export const appTitleStyles = (theme: Theme) => ({
  fontSize: "30px",
  fontWeight: "bold",
  fontFamily: "monospace",
});
