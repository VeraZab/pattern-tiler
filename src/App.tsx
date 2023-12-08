import Box from '@mui/material/Box';
import Layout from './components/Layout';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Box
          sx={
            theme => (
              {
                display: 'flex',
                flex: 1,
                overflowY: 'auto',
                padding: `${theme.spacing(2)} 0`,
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column-reverse',

                }
              }
            )
          }
        >
          <Canvas />
          <Controls />
        </Box>
      </Layout>
    </ThemeProvider >
  );
}

export default App;
