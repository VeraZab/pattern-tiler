import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

const Header = () => {
    const aboutTilemaker = 'This is a simple patternmaking tool that allows you to use a tileable image ' +
        'and repeat it any number of times to create a pattern of desired scale and dimensions. ' +
        'Ready for printing!';

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src="pattern-tiler-logo.png" style={{ width: '50px', paddingRight: '15px' }} />
                <Box sx={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'monospace', }}>Pattern Tiler</Box>
            </Box>

            <Box>
                <Tooltip title={aboutTilemaker}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ paddingRight: '15px' }}>About this tool</Box>
                        <HelpIcon />
                    </Box>
                </Tooltip>
            </Box>
        </Box>
    );
}

export default Header;
