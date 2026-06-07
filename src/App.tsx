"use client";
import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Cell from "./cell";
import calciferImg from "./assets/calcifer.png";
import jijiImg from "./assets/jiji.png";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { isTauri } from "@tauri-apps/api/core";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const getAppWindow = () => {
    if (!isTauri()) return;
    return getCurrentWindow();
  };

  const [cells, setCells] = useState<string[]>(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState<string>("calcifer");
  const [winner, setWinner] = useState<"calcifer" | "jiji" | "draw" | "">("");


  // Check for win/draw
  useEffect(() => {
    let calciferWins = false;
    let jijiWins = false;

    for (const combo of winningCombos) {
      if (combo.every((i) => cells[i] === "jiji")) {
        jijiWins = true;
      }
      if (combo.every((i) => cells[i] === "calcifer")) {
        calciferWins = true;
      }
    }

    if (calciferWins) {
      setWinner("calcifer");
    } else if (jijiWins) {
      setWinner("jiji");
    } else if (cells.every((cell) => cell !== "")) {
      setWinner("draw");
    }
  }, [cells]);

  const resetGame = useCallback(() => {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setGo("calcifer");
    setWinner("");
  }, []);

  const closeGame = async () => {
    const appWindow = getAppWindow();
    if (appWindow) {
      try {
        await appWindow.close();
      } catch (e) {
        console.error("Failed to close:", e);
      }
    }
  };

  const minimizeGame = async () => {
    const appWindow = getAppWindow();
    if (appWindow) {
      try {
        await appWindow.minimize();
      } catch (e) {
        console.error("Failed to minimize:", e);
      }
    }
  };

  const handleDrag = async () => {
    const appWindow = getAppWindow();
    if (appWindow) {
      try {
        await appWindow.startDragging();
      } catch (e) {
        console.error("Unable to start window drag", e);
      }
    }
  };

  return (
    <div className="app-wrapper">
      <div className="game-container">
        {/* Top bar integrated into the board */}
        <div className="top-bar" onMouseDown={handleDrag}>
          <p className="title">✦ Ghibli Tic-Tac-Toe ✦</p>
          <span className="window-controls" onMouseDown={(e) => e.stopPropagation()}>
            <button className="app-btn restart-btn" onClick={resetGame} title="New Game">
              ↻
            </button>
            <button className="app-btn minimize-btn" onClick={minimizeGame} title="Minimize">
              ─
            </button>
            <button className="app-btn close-btn" onClick={closeGame} title="Close">
              ✕
            </button>
          </span>
        </div>

        {/* Turn indicator */}
        <div className="turn-indicator">
          {winner ? (
            <span className="winning-text">
              {winner === "draw" ? (
                <span className="winning-content">
                  <span>It's a Draw!</span>
                </span>
              ) : (
                <span className="winning-content">
                  <img
                    src={winner === "calcifer" ? calciferImg : jijiImg}
                    alt={winner}
                    className="winning-icon"
                  />
                  <span>
                    <span className={`winning-name ${winner}`}>
                      {winner === "calcifer" ? "Calcifer" : "Jiji"}
                    </span>{" "}
                    Wins!
                  </span>
                </span>
              )}
            </span>
          ) : (
            <span className="turn-text">
              <img
                src={go === "calcifer" ? calciferImg : jijiImg}
                alt={go}
                className="turn-icon"
              />
              <span>
                <span className={`turn-name ${go}`}>
                  {go === "calcifer" ? "Calcifer" : "Jiji"}
                </span>
                's turn
              </span>
            </span>
          )}
        </div>

        {/* Game board */}
        <div className="board">
          {cells.map((_, index) => (
            <Cell
              id={index}
              go={go}
              setGo={setGo}
              key={index}
              cells={cells}
              setCells={setCells}
              winningMessage={winner}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
