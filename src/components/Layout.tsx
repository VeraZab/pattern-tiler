import Box from '@mui/material/Box';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const FOOTER_HEIGHT = '30px';
const HEADER_HEIGHT = '45px';
const CONTENT_PADDING = '20px';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            className="container"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                padding: CONTENT_PADDING,
                overflow: 'hidden'
            }}>

            <Box sx={{ height: HEADER_HEIGHT }}>
                <Header />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    overflow: 'auto'
                }}
            >
                {children}
            </Box>

            <Box sx={{ height: FOOTER_HEIGHT }}>
                <Footer />
            </Box>
        </Box>

    );
}

export default Layout;
