import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

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
  const [newPlayerName, setNewPlayerName] = useState("");
  const addPlayer = () => {
    const name = newPlayerName.trim();
    if (!name) return;

    const existingPlayer = previousPlayers.find(
      (player) => player.toLowerCase() === name.toLowerCase(),
    );

    const playerToAdd = existingPlayer || name;

    setSelectedPlayers((current) =>
      current.some(
        (player) => player.toLowerCase() === playerToAdd.toLowerCase(),
      )
        ? current
        : [...current, playerToAdd],
    );

    setNewPlayerName("");
  };
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
      <button
        className="btn btn-soft btn-lg mt-3"
        disabled={selectedPlayers.length < 2}
        onClick={() => nav("/Play")}
      >
        {selectedPlayers.length === 0
          ? "Select players for Skip-Bo"
          : selectedPlayers.length === 1
            ? "Select at least 2 players"
            : `Start Skip-Bo with ${selectedPlayers.length} players`}
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Add New Player</h2>

        <div className="join">
          <input
            type="text"
            className="input input-bordered join-item"
            placeholder="Enter player name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary join-item"
            onClick={addPlayer}
          >
            Add Player
          </button>
        </div>
      </div>

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
