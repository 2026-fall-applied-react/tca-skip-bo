import { useNavigate } from "react-router";
import type { GameResult } from "./gameResults";

type PlayProps = {
  addNewGameResult: (result: GameResult) => void;
};

export const Play: React.FC<PlayProps> = ({ addNewGameResult }) => {
  const nav = useNavigate();

  const handleGameOver = () => {
    const newGame: GameResult = {
      winner: "Charlie",
      players: ["Alice", "Bob", "Charlie"],
    };

    addNewGameResult(newGame);
    nav("/");
  };

  return (
    <div>
      <h1>Play</h1>
      <button
        className="btn btn-soft btn-lg mt-3"
        onClick={handleGameOver}
      >
        Game Over
      </button>
    </div>
  );
};