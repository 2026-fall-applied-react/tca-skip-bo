import "./App.css";
import { HashRouter, Routes, Route } from "react-router";
import { Home } from "./Home";
import { Setup } from "./Setup";
import { Play } from "./Play";
import type { GameResult } from "./gameResults";
import { useState } from "react";
import { getLeaderboard } from "./gameResults";

const dummyGameResults: GameResult[] = [
  { winner: "Alice", players: ["Alice", "Bob", "Charlie"] },
  { winner: "Bob", players: ["Alice", "Bob", "Charlie"] },
  { winner: "Alice", players: ["Alice", "Bob"] },
];

const App = () => {
  const [gameResults, setGameResults] =
    useState<GameResult[]>(dummyGameResults);
  const [title, setTitle] = useState("Home");
  const addNewGameResult = (result: GameResult) => {
    setGameResults((previousResults) => [...previousResults, result]);
  };
  return (
    <div className="p-3">
      <HashRouter>
        <div className="navbar bg-base-200 rounded-box mb-4">
          <div className="flex-1">
            <span className="text-xl font-bold">{title}</span>
          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                leaderboard={getLeaderboard(gameResults)}
                setTitle={setTitle}
              />
            }
          />
          <Route path="/Setup" element={<Setup setTitle={setTitle} />} />
          <Route
            path="/Play"
            element={
              <Play addNewGameResult={addNewGameResult} setTitle={setTitle} />
            }
          />
          <Route
            path="/Play"
            element={<Play addNewGameResult={addNewGameResult} />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
