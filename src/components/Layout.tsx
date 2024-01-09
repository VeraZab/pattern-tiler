import { Box, Theme } from "@mui/material";
import React from "react";

import { LayoutProps } from "../types/layout";
import Footer from "./Footer";
import Header from "./Header";

const layoutContainerStyles = (theme: Theme) => ({
  display: "flex",
  height: "100vh",
  flexDirection: "column",
  padding: theme.spacing(2),
  overflow: "hidden",
  boxSizing: "border-box",
})

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      className="container"
      sx={layoutContainerStyles}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
