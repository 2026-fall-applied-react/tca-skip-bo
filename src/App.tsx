import "./App.css";
import { HashRouter, Routes, Route } from "react-router";
import { Home } from "./Home";
import { Setup } from "./Setup";
import { Play } from "./Play";
import type { GameResult } from "./gameResults";
import { useState } from "react";
import {
  getLeaderboard,
  getPreviousPlayers,
  getGeneralFacts,
} from "./gameResults";

const dummyGameResults: GameResult[] = [
  {
    winner: "Alice",
    players: ["Alice", "Bob", "Charlie"],
    start: "2026-10-01T14:00:00Z",
    end: "2026-10-01T14:30:00Z",
  },
  {
    winner: "Bob",
    players: ["Alice", "Bob", "Charlie"],
    start: "2026-10-02T15:00:00Z",
    end: "2026-10-02T15:45:00Z",
  },
  {
    winner: "Alice",
    players: ["Alice", "Bob"],
    start: "2026-10-03T16:00:00Z",
    end: "2026-10-03T16:20:00Z",
  },
];

const App = () => {
  const [gameResults, setGameResults] =
    useState<GameResult[]>(dummyGameResults);
  const [title, setTitle] = useState("Home");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
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
                generalFacts={getGeneralFacts(gameResults)}
                setTitle={setTitle}
              />
            }
          />
          <Route
            path="/Setup"
            element={
              <Setup
                setTitle={setTitle}
                previousPlayers={getPreviousPlayers(gameResults)}
                selectedPlayers={selectedPlayers}
                setSelectedPlayers={setSelectedPlayers}
              />
            }
          />
          <Route
            path="/Play"
            element={
              <Play
                addNewGameResult={addNewGameResult}
                setTitle={setTitle}
                selectedPlayers={selectedPlayers}
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
