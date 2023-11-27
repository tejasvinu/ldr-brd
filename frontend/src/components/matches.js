import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const MatchesTable = () => {
  const [matches, setMatches] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedField, setSortedField] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get('https://coral-app-rgl66.ondigitalocean.app/match');
      setMatches(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (field) => {
    if (sortedField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDirection('asc');
      setSortedField(field);
    }
  };

  const sortedMatches = matches.sort((a, b) => {
    const aValue = sortedField === 'date' ? new Date(a[sortedField]) : a[sortedField];
    const bValue = sortedField === 'date' ? new Date(b[sortedField]) : b[sortedField];

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th
            onClick={() => handleSort('date')}
            style={{ cursor: 'pointer' }}
          >
            Date
          </th>
          <th
            onClick={() => handleSort('player1')}
            style={{ cursor: 'pointer' }}
          >
            Player 1
          </th>
          <th
            onClick={() => handleSort('player2')}
            style={{ cursor: 'pointer' }}
          >
            Player 2
          </th>
          <th
            onClick={() => handleSort('winner')}
            style={{ cursor: 'pointer' }}
          >
            Winner
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedMatches.map((match) => (
          <tr key={match._id}>
            <td>{match.date}</td>
            <td>{match.player1}</td>
            <td>{match.player2}</td>
            <td>{match.winner}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MatchesTable;
