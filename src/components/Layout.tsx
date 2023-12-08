import Box from '@mui/material/Box';
import React from 'react';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            className="container"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100vh',
            }}>

            <Header />

            <Box sx={{ display: 'flex', height: '500px', width: '90%' }}>
                {children}
            </Box>
        </Box>

    );
}

export default Layout;
