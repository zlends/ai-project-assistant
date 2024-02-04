import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './components/Home';

function App() {

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Project Assistant
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
<Route path="/" element={<Home />} />
          <Route path="/about" element={<Typography variant="body1">This is the about page.</Typography>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;