import axios from 'axios';

const updatePlayerStats = async (match) => {
  try {
    await axios.post('/api/player-stats', { match });
    console.log('Player stats updated successfully!');
  } catch (error) {
    console.error('Error updating player stats:', error);
  }
};

// Usage: Call the updatePlayerStats function with the relevant match object
updatePlayerStats(match);