import React from 'react';

const Leaderboard = ({ matches }) => {
  // Calculate player statistics from match data
  const playerStats = matches.reduce((stats, match) => {
    const { player1, player2, winner } = match;

    // Increment match count for player 1
    if (stats[player1]) {
      stats[player1].matches++;
    } else {
      stats[player1] = { matches: 1, wins: 0 };
    }

    // Increment match count for player 2
    if (stats[player2]) {
      stats[player2].matches++;
    } else {
      stats[player2] = { matches: 1, wins: 0 };
    }

    // Increment win count for the winner
    if (stats[winner]) {
      stats[winner].wins++;
    } else {
      stats[winner] = { matches: 1, wins: 1 };
    }

    return stats;
  }, {});

  // Convert player statistics into an array
  const leaderboardData = Object.entries(playerStats).map(([player, stats]) => ({
    player,
    matches: stats.matches,
    wins: stats.wins,
    winRatio: stats.wins / stats.matches,
  }));

  // Sort leaderboard data based on win ratio (descending order)
  leaderboardData.sort((a, b) => b.winRatio - a.winRatio);

  return (
    <div>
      <h2>Player Leaderboard</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Player</th>
            <th>Matches</th>
            <th>Wins</th>
            <th>Win Ratio</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map(({ player, matches, wins, winRatio }, index) => (
            <tr key={index}>
              <td>{player}</td>
              <td>{matches}</td>
              <td>{wins}</td>
              <td>{(winRatio * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
