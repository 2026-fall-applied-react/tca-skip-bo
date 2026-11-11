// Type definitions

export type GameResult = {
  winner: string;
  players: string[];
};

export type LeaderboardEntry = {
  wins: number;
  losses: number;
  avg: number;
  player: string;
};

// Helper functions

const getLeaderboardEntry = (
  games: GameResult[],
  player: string,
): LeaderboardEntry => {
  const gamesPlayed = games.filter((game) =>
    game.players.includes(player),
  ).length;

  const wins = games.filter((game) => game.winner === player).length;

  const losses = gamesPlayed - wins;
  const avg = gamesPlayed === 0 ? 0 : (wins / gamesPlayed) * 100;

  return { wins, losses, avg, player };
};

export const getPreviousPlayers = (games: GameResult[]): string[] => {
  return games
    .flatMap((game) => game.players)
    .filter((player, index, all) => all.indexOf(player) === index)
    .sort((a, b) => a.localeCompare(b));
};

// Public functions

export const getLeaderboard = (games: GameResult[]): LeaderboardEntry[] => {
  return getPreviousPlayers(games)
    .map((player) => getLeaderboardEntry(games, player))
    .sort((a, b) => b.avg - a.avg);
};
