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
  stockpileRemaining?: Record<string, number>;
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
  averageDurations: string[];
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

export const getLeaderboard = (games: GameResult[]): LeaderboardEntry[] => {
  return getPreviousPlayers(games)
    .map((player) => getLeaderboardEntry(games, player))
    .sort((a, b) => b.avg - a.avg);
};
const getAverageDurations = (games: GameResult[]): string[] => {
  const playerCounts = [...new Set(games.map((game) => game.players.length))];

  return playerCounts
    .sort((a, b) => a - b)
    .map((count) => {
      const matchingGames = games.filter(
        (game) => game.players.length === count,
      );

      const totalDuration = matchingGames.reduce(
        (total, game) =>
          total + (Date.parse(game.end) - Date.parse(game.start)),
        0,
      );

      const average = totalDuration / matchingGames.length;

      return `${count} players: ${formatDuration(average)}`;
    });
};
export const getGeneralFacts = (games: GameResult[]): GeneralFacts => {
  if (games.length === 0) {
    return {
      lastPlayed: "Never",
      totalGames: 0,
      shortestGame: "N/A",
      longestGame: "N/A",
      averageDurations: [],
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
    averageDurations: getAverageDurations(games),
  };
};
