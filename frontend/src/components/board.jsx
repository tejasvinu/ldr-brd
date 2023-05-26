import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel } from '@material-ui/core';

const PlayerTable = () => {
  const [players, setPlayers] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedPlayers = players.sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={sortColumn === 'name'}
              direction={sortColumn === 'name' ? sortOrder : 'asc'}
              onClick={() => handleSort('name')}
            >
              Name
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortColumn === 'no of matches'}
              direction={sortColumn === 'no of matches' ? sortOrder : 'asc'}
              onClick={() => handleSort('no of matches')}
            >
                No Of Matches
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortColumn === 'elo'}
              direction={sortColumn === 'elo' ? sortOrder : 'asc'}
              onClick={() => handleSort('elo')}
            >
              ELO
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedPlayers.map((player) => (
          <TableRow key={player._id}>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.noOfMatches}</TableCell>
            <TableCell>{player.elo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerTable;
