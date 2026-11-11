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
  return (
    <div className="p-3">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Home leaderboard={getLeaderboard(gameResults)} />}
          />
          <Route path="/Setup" element={<Setup />} />
          <Route path="/Play" element={<Play />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
