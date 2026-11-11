import { useNavigate } from "react-router";
import { useEffect } from "react";
import type { GameResult } from "./gameResults";

type PlayProps = {
  addNewGameResult: (result: GameResult) => void;
  setTitle: (title: string) => void;
};

export const Play: React.FC<PlayProps> = ({ addNewGameResult, setTitle }) => {
  const nav = useNavigate();

  useEffect(() => {
    setTitle("Play");
  }, [setTitle]);

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
      <button className="btn btn-soft btn-lg mt-3" onClick={handleGameOver}>
        Game Over
      </button>
    </div>
  );
};
