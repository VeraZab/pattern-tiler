import Box from '@mui/material/Box';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            className="container"
            sx={{
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
                padding: '20px',
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}>


            <Header />


            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    overflow: 'auto'
                }}
            >
                {children}
            </Box>


            <Footer />

        </Box>

    );
}

export default Layout;
