import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const Footer = () => {
    return (
        <Box
            className="container"
            sx={{
                display: 'flex',
                justifyContent: 'end',
            }}
        >
            <Link href="https://github.com/VeraZab/pattern-tiler" target="_blank">
                <img alt="github logo" src="github.png" style={{ width: '25px', height: '25px' }} />
            </Link>
        </Box>

    );
}

export default Footer;
