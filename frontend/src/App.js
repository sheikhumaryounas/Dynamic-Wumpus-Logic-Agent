import React, { useState } from "react";
import Grid from "./Grid";
import "./styles.css";

function App() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [agent, setAgent] = useState({ x: 0, y: 0 });
  const [percepts, setPercepts] = useState([]);
  const [steps, setSteps] = useState(0);

  const init = async () => {
    await fetch("http://localhost:3000/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows: Number(rows), cols: Number(cols) })
    });
    updateState();
  };

  const updateState = async () => {
    const res = await fetch("http://localhost:3000/state");
    const data = await res.json();
    setAgent(data.agent);
    setPercepts(data.percepts);
    setSteps(data.inferenceSteps);
  };

  const move = async (x, y) => {
    await fetch("http://localhost:3000/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y })
    });
    updateState();
  };

  return (
    <div className="container">
      <h2>Wumpus World Agent</h2>

      <input value={rows} onChange={e => setRows(e.target.value)} />
      <input value={cols} onChange={e => setCols(e.target.value)} />
      <button onClick={init}>Start</button>

      <Grid rows={rows} cols={cols} agent={agent} move={move} />

      <div className="panel">
        <p>Percepts: {percepts.join(", ")}</p>
        <p>Inference Steps: {steps}</p>
      </div>
    </div>
  );
}

export default App;