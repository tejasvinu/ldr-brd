import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const PlayerTable = () => {
  const [players, setPlayers] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('https://coral-app-rgl66.ondigitalocean.app/player');
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
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('noOfMatches')}>No Of Matches</th>
          <th onClick={() => handleSort('elo')}>ELO</th>
        </tr>
      </thead>
      <tbody>
        {sortedPlayers.map((player) => (
          <tr key={player._id}>
            <td>{player.name}</td>
            <td>{player.noOfMatches}</td>
            <td>{player.elo}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PlayerTable;
