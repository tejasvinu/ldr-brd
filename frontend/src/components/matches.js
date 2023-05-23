import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel} from '@material-ui/core';
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
      const response = await axios.get('http://localhost:3004/api/matches'); // Make a GET request to the backend endpoint
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={sortedField === 'date'}
              direction={sortDirection}
              onClick={() => handleSort('date')}
            >
              Date
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortedField === 'player1'}
              direction={sortDirection}
              onClick={() => handleSort('player1')}
            >
              Player 1
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortedField === 'player2'}
              direction={sortDirection}
              onClick={() => handleSort('player2')}
            >
              Player 2
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortedField === 'winner'}
              direction={sortDirection}
              onClick={() => handleSort('winner')}
            >
              Winner
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedMatches.map((match) => (
          <TableRow key={match._id}>
            <TableCell>{match.date}</TableCell>
            <TableCell>{match.player1}</TableCell>
            <TableCell>{match.player2}</TableCell>
            <TableCell>{match.winner}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MatchesTable;
