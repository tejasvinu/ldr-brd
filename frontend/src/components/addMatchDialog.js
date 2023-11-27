import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const AddMatchDialog = ({ onAddMatch }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [winner, setWinner] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const updatePlayerStats = async (player1, player2, winner) => {
    console.log('running');
    try {
      const response = await axios.put(
        'https://coral-app-rgl66.ondigitalocean.app/player/api/playerstats',
        {
          player1,
          player2,
          winner,
        }
      );

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
      winner,
    };

    onAddMatch(newMatch);
    updatePlayerStats(newMatch.player1, newMatch.player2, newMatch.winner);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Match
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Match</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} className="form-control" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Player 1</Form.Label>
            <Form.Control
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Player 2</Form.Label>
            <Form.Control
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Winner</Form.Label>
            <Form.Control
              type="text"
              value={winner}
              onChange={(e) => setWinner(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddMatch}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMatchDialog;
