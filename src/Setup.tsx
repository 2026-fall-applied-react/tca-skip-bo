import { useNavigate } from "react-router";
import { useEffect } from "react";

type SetupProps = {
  setTitle: (title: string) => void;
};

export const Setup: React.FC<SetupProps> = ({ setTitle }) => {
  const nav = useNavigate();
  useEffect(() => {
    setTitle("Setup");
  }, [setTitle]);
  return (
    <div>
      <button className="btn btn-soft btn-lg mt-3" onClick={() => nav("/Play")}>
        Play the Game
      </button>
    </div>
  );
};
