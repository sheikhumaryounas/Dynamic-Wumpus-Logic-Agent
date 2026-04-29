import React, { useState } from "react";
import Grid from "./Grid";
import "./styles.css";

function App() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [agent, setAgent] = useState({ x: 0, y: 0 });
  const [percepts, setPercepts] = useState([]);
  const [steps, setSteps] = useState(0);
  const [gold, setGold] = useState({});
  const [message, setMessage] = useState("");

  const init = async () => {
    await fetch("http://localhost:3000/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rows: Number(rows),
        cols: Number(cols)
      })
    });

    updateState();
    setMessage("");
  };

  const updateState = async () => {
    const res = await fetch("http://localhost:3000/state");
    const data = await res.json();

    setAgent(data.agent);
    setPercepts(data.percepts);
    setSteps(data.inferenceSteps);
    setGold(data.gold);
  };

  const move = async (x, y) => {
    const res = await fetch("http://localhost:3000/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y })
    });

    const data = await res.json();

    setAgent(data.agent);
    setPercepts(data.percepts);
    setSteps(data.inferenceSteps);
    setGold(data.gold);
    setMessage(data.message || "");
  };

  return (
    <div className="container">
      <h2>Wumpus World Agent</h2>

      <div>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
        />
        <button onClick={init}>Start</button>
      </div>

      <Grid
        rows={Number(rows)}
        cols={Number(cols)}
        agent={agent}
        move={move}
        gold={gold}
        percepts={percepts}
      />

      <div className="panel">
        <p>Percepts: {percepts.join(", ") || "None"}</p>
        <p>Inference Steps: {steps}</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;