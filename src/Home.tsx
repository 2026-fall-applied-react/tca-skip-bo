import { useNavigate } from "react-router";
import type { LeaderboardEntry, GeneralFacts } from "./gameResults";
import { useEffect } from "react";

type HomeProps = {
  leaderboard: LeaderboardEntry[];
  generalFacts: GeneralFacts;
  setTitle: (title: string) => void;
};

export const Home: React.FC<HomeProps> = ({
  leaderboard,
  generalFacts,
  setTitle,
}) => {
  const nav = useNavigate();

  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);

  console.log(leaderboard);

  return (
    <div>
      <button
        className="btn btn-soft btn-lg mt-3"
        onClick={() => nav("/Setup")}
      >
        Setup a Game
      </button>

      {/* Leaderboard */}
      <div className="card bg-base-200 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title">Skip-Bo Leaderboard</h2>

          {leaderboard.length === 0 ? (
            <p>Set up and play a game to see the leaderboard.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Win %</th>
                  </tr>
                </thead>

                <tbody>
                  {leaderboard.map((entry) => (
                    <tr key={entry.player}>
                      <td>{entry.player}</td>
                      <td>{entry.wins}</td>
                      <td>{entry.losses}</td>
                      <td>{entry.avg.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* General Facts */}
      <div className="card bg-base-200 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title">Skip-Bo General Facts</h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <tbody>
                <tr>
                  <td>Last Played</td>
                  <td>
                    {generalFacts.totalGames === 0
                      ? "Never"
                      : `${generalFacts.lastPlayed} ago`}
                  </td>
                </tr>
                <tr>
                  <td>Total Games</td>
                  <td>{generalFacts.totalGames}</td>
                </tr>
                <tr>
                  <td>Shortest Game</td>
                  <td>{generalFacts.shortestGame}</td>
                </tr>
                <tr>
                  <td>Longest Game</td>
                  <td>{generalFacts.longestGame}</td>
                </tr>
                {generalFacts.averageDurations.length === 0 ? (
                  <tr>
                    <td>Average Game Duration</td>
                    <td>N/A</td>
                  </tr>
                ) : (
                  generalFacts.averageDurations.map((duration, index) => (
                    <tr key={index}>
                      <td>Average Game Duration</td>
                      <td>{duration}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
