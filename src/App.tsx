import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Container, 
  CssBaseline, 
  Grid, 
  Tabs, 
  Tab, 
  Toolbar, 
  Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TabPanel from './components/TabPanel/TabPanel';
import Launches from './components/Launches/Launches';
import FavouriteLaunches from './components/FavouriteLaunches/FavouriteLaunches';
import { a11yProps } from './utils';
import './App.css'

const theme = createTheme();
function App() {
  const [panelView, setPanelVview] = useState<number>(0);

  const handlePanelView = (event: React.SyntheticEvent, newValue: number) => {
    setPanelVview(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            SpaceX Launches
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={panelView} onChange={handlePanelView} aria-label="basic tabs example">
                <Tab label="Launches" {...a11yProps(0)} />
                <Tab label="Favourites" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={panelView} index={0}>
              <Launches />
            </TabPanel>
            <TabPanel value={panelView} index={1}>
              <FavouriteLaunches />
            </TabPanel>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}

export default App
