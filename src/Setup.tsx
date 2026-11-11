import { useNavigate } from "react-router";
import { useEffect } from "react";

type SetupProps = {
  setTitle: (title: string) => void;
  previousPlayers: string[];
  selectedPlayers: string[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Setup: React.FC<SetupProps> = ({
  setTitle,
  previousPlayers,
  selectedPlayers,
  setSelectedPlayers,
}) => {
  const nav = useNavigate();

  const togglePlayer = (player: string) => {
    setSelectedPlayers((current) =>
      current.includes(player)
        ? current.filter((name) => name !== player)
        : [...current, player],
    );
  };
  useEffect(() => {
    setTitle("Setup");
  }, [setTitle]);

  return (
    <div>
      <button className="btn btn-soft btn-lg mt-3" onClick={() => nav("/Play")}>
        Play the Game
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Previous Players</h2>

        <div className="mt-3 flex flex-col gap-3">
          {previousPlayers.map((player) => (
            <label key={player} className="flex items-center gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={selectedPlayers.includes(player)}
                onChange={() => togglePlayer(player)}
              />
              <span>{player}</span>
            </label>
          ))}
        </div>
        <p className="mt-4">
          Selected players: {selectedPlayers.join(", ") || "None"}
        </p>
      </div>
    </div>
  );
};
