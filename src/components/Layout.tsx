import Box from '@mui/material/Box';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            className="container"
            sx={
                theme => (
                    {
                        display: 'flex',
                        height: '100vh',
                        flexDirection: 'column',
                        padding: theme.spacing(2),
                        overflow: 'hidden',
                        boxSizing: 'border-box'
                    }
                )
            }
        >
            <Header />
            {children}
            <Footer />

        </Box>

    );
}

export default Layout;
