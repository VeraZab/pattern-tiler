import { Theme } from "@mui/material";

export const layoutStyles = (theme: Theme) => ({
  display: "flex",
  flex: 1,
  overflowY: "auto",
  backgroundColor: "#e3e1e1",
  margin: `${theme.spacing(2)} 0`,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
});
