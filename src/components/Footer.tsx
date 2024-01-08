import { Box, Link } from "@mui/material";

const footerContainerStyles = {
  display: "flex",
  justifyContent: "end",
}

const imageStyles = { width: "25px", height: "25px" }

const Footer: React.FC = () => {
  return (
    <Box
      className="container"
      sx={footerContainerStyles}
    >
      <Link href="https://github.com/VeraZab/pattern-tiler" target="_blank">
        <img alt="github logo" src="github.png" style={imageStyles} />
      </Link>
    </Box>
  );
};

export default Footer;
