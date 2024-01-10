import { Box } from "@mui/material";

import { layoutContainerStyles } from "../styles/Layout";
import { LayoutProps } from "../types/layout";
import Footer from "./Footer";
import Header from "./Header";


const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box className="container" sx={layoutContainerStyles}>
      <Header />

      {children}

      <Footer />
    </Box>
  );
};

export default Layout;
