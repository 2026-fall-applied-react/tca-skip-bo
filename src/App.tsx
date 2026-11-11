import "./App.css";
import { HashRouter, Routes, Route } from "react-router";
import { Home } from "./Home";
import { Setup } from "./Setup";
import { Play } from "./Play";
import type { GameResult } from "./gameResults";
import { useState, useEffect } from "react";
import localforage from "localforage";
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
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    let ignore = false;

    const loadTheme = async () => {
      const savedTheme = await localforage.getItem<string>("theme");

      if (!ignore && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme);
      }
    };

    void loadTheme();

    return () => {
      ignore = true;
    };
  }, []);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const addNewGameResult = (result: GameResult) => {
    setGameResults((previousResults) => [...previousResults, result]);
  };

  return (
    <div data-theme={theme} className="min-h-screen p-3">
      <HashRouter>
        <div className="navbar bg-skipbo-purple text-white rounded-box mb-4">
          <div className="flex-1">
            <span className="text-xl font-bold">{title}</span>
          </div>

          <label className="swap swap-rotate ml-auto">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={async () => {
                const nextTheme = theme === "light" ? "dark" : "light";
                await localforage.setItem("theme", nextTheme);
                setTheme(nextTheme);
              }}
            />

            {/* Sun icon */}
            <svg
              className="swap-on h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon */}
            <svg
              className="swap-off h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
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
