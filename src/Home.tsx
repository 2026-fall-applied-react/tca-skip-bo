import { useNavigate } from "react-router";
import type { LeaderboardEntry } from "./gameResults";

type HomeProps = {
  leaderboard: LeaderboardEntry[];
};
export const Home: React.FC<HomeProps> = ({ leaderboard }) => {
  const nav = useNavigate();
  console.log(leaderboard);
  return (
    <div>
      <h1>Home</h1>
      <button
        className="btn btn-soft btn-lg mt-3"
        onClick={() => nav("/Setup")}
      >
        Setup a Game
      </button>
      <div className="card bg-base-200 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title">Skip-Bo Leaderboard</h2>

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
        </div>
      </div>
    </div>
  );
};
