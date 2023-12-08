import Box from '@mui/material/Box';

const Header = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100vw',
            height: '45px',
            padding: '20px'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src="pattern-tiler-logo.png" style={{ width: '80px' }} />
                <Box sx={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'monospace' }}>Pattern Tiler</Box>
            </Box>
            <Box>About</Box>
        </Box>
    );
}

export default Header;
