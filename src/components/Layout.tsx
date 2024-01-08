import { Box } from "@mui/material";
import React from "react";

import Footer from "./Footer";
import Header from "./Header";

// Define the props for the Layout component
interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      className="container"
      sx={(theme) => ({
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        padding: theme.spacing(2),
        overflow: "hidden",
        boxSizing: "border-box",
      })}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
