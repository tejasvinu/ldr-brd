import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const AddMatchDialog = ({ onAddMatch }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [winner, setWinner] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const updatePlayerStats = async (player1, player2, winner) => {
    try {
      const response = await axios.put('http://localhost:3003/api/playerStats', {
        player1,
        player2,
        winner,
      });
  
      console.log('Player stats updated successfully!', response.data);
    } catch (error) {
      console.error('Error updating player stats:', error);
    }
  };
  

  const handleAddMatch = () => {
    const newMatch = {
      date,
      player1,
      player2,
      winner
    };

    onAddMatch(newMatch);
    updatePlayerStats(newMatch);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Match
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Match</DialogTitle>
        <DialogContent>
          <DatePicker selected={date} onChange={newDate => setDate(newDate)} />
          <TextField
            label="Player 1"
            value={player1}
            onChange={e => setPlayer1(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Player 2"
            value={player2}
            onChange={e => setPlayer2(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Winner"
            value={winner}
            onChange={e => setWinner(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddMatch} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMatchDialog;
