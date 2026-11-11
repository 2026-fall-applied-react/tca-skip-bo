
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { GameResult } from "./gameResults";

type PlayProps = {
  addNewGameResult: (result: GameResult) => void;
  setTitle: (title: string) => void;
  selectedPlayers: string[];
};

export const Play: React.FC<PlayProps> = ({
  addNewGameResult,
  setTitle,
  selectedPlayers,
}) => {
  const nav = useNavigate();

  const [startTimestamp] = useState(() => new Date().toISOString());

  useEffect(() => {
    setTitle("Play");
  }, [setTitle]);

  const handleGameOver = (winner: string) => {
    const newGame: GameResult = {
      winner: winner,
      players: selectedPlayers,
      start: startTimestamp,
      end: new Date().toISOString(),
    };

    addNewGameResult(newGame);
    nav("/");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Who won the game?</h2>

      {selectedPlayers.length === 0 ? (
        <p>No players selected. Go back to Setup to choose players.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {selectedPlayers.map((player) => (
            <button
              key={player}
              className="btn btn-primary"
              onClick={() => handleGameOver(player)}
            >
              {player} Won!
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
