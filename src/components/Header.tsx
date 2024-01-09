import HelpIcon from "@mui/icons-material/Help";
import { Box, Theme, Tooltip } from "@mui/material";

const headerContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const leftHandSideContainerStyles = { display: "flex", alignItems: "center" }

const logoStyles = { width: "50px", paddingRight: "15px" }

const appTitleStyles = (theme: Theme) => ({
  fontSize: "30px",
  fontWeight: "bold",
  fontFamily: "monospace",
})

const Header: React.FC = () => {
  const aboutTilemaker =
    "This is a simple patternmaking tool that allows you to use a tileable image " +
    "and repeat it any number of times to create a pattern of desired scale and dimensions. " +
    "Ready for printing!";

  return (
    <Box
      sx={headerContainerStyles}
    >
      <Box sx={leftHandSideContainerStyles}>
        <img
          alt="pattern-tiler logo"
          src="pattern-tiler-logo.png"
          style={logoStyles}
        />

        <Box
          sx={appTitleStyles}
        >
          Pattern Tiler
        </Box>
      </Box>

      <Box>
        <Tooltip title={aboutTilemaker}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={(theme) => ({
                paddingRight: "15px",
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              })}
            >
              About this tool
            </Box>

            <HelpIcon />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
