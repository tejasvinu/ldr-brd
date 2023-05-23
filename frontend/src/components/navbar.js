import React from 'react';
import { AppBar, Button, Toolbar, Typography, Link } from '@material-ui/core';
import AddMatchDialog from './addmatch';
import axios from 'axios';

const Navbar = () => {
  const handleAddMatch = async (newMatch) => {
    try {
      const response = await axios.post('http://localhost:3004/api/matches', newMatch);
      console.log(response.data); // Optional: Log the response or handle it as needed
    } catch (error) {
      console.error(error);
      // Handle error case: display an error message, show a notification, etc.
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Badt</Typography>
        <Link href="/" color="inherit" style={{ marginLeft: 'auto' }}>
          Home
        </Link>
        <Link href="/players" color="inherit" style={{ marginLeft: '1rem' }}>
          Players
        </Link>
        <Link href="/matches" color="inherit" style={{ marginLeft: '1rem' }}>
          Matches
        </Link>
        <AddMatchDialog onAddMatch={handleAddMatch} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
