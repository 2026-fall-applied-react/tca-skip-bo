import { durationFormatter } from "human-readable";

const formatDuration = durationFormatter<string>({
  allowMultiples: ["d", "h", "m", "s"],
});
// Type definitions

export type GameResult = {
  winner: string;
  players: string[];
  start: string;
  end: string;
};

export type LeaderboardEntry = {
  wins: number;
  losses: number;
  avg: number;
  player: string;
};
export type GeneralFacts = {
  lastPlayed: string;
  totalGames: number;
  shortestGame: string;
  longestGame: string;
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
export const getGeneralFacts = (games: GameResult[]): GeneralFacts => {
  if (games.length === 0) {
    return {
      lastPlayed: "Never",
      totalGames: 0,
      shortestGame: "N/A",
      longestGame: "N/A",
    };
  }
  const durations = games.map(
    (game) => Date.parse(game.end) - Date.parse(game.start),
  );

  return {
    lastPlayed: formatDuration(
      Date.now() - Math.max(...games.map((game) => Date.parse(game.end))),
    ),
    totalGames: games.length,
    shortestGame: formatDuration(Math.min(...durations)),
    longestGame: formatDuration(Math.max(...durations)),
  };
};
