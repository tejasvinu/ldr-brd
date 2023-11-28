import React from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AddMatchDialog from './addMatchDialog'; // Ensure the correct filename

const NavigationBar = () => {
  const handleAddMatch = async (newMatch) => {
    try {
      const response = await axios.post('https://coral-app-rgl66.ondigitalocean.app/match/api/matches', newMatch);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Badt</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/ldr-brd">Home</Nav.Link>
        <Nav.Link as={Link} to="/players">Players</Nav.Link>
        <Nav.Link as={Link} to="/matches">Matches</Nav.Link>
      </Nav>
      <AddMatchDialog onAddMatch={handleAddMatch} />
    </Navbar>
  );
};

export default NavigationBar;
