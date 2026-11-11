import { useNavigate } from "react-router";
import { useEffect } from "react";

type SetupProps = {
  setTitle: (title: string) => void;
  previousPlayers: string[];
};

export const Setup: React.FC<SetupProps> = ({ setTitle, previousPlayers }) => {
  const nav = useNavigate();
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

        <ul className="list-disc list-inside mt-2">
          {previousPlayers.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
