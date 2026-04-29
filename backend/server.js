const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let rows = 4, cols = 4;
let agent = { x: 0, y: 0 };
let pits = [];
let wumpus = {};
let gold = {};
let inferenceSteps = 0;

// Initialize grid
function initGrid(r, c) {
    rows = r;
    cols = c;
    agent = { x: 0, y: 0 };
    inferenceSteps = 0;

    // Wumpus
    wumpus = {
        x: Math.floor(Math.random() * r),
        y: Math.floor(Math.random() * c)
    };

    // Gold
    gold = {
        x: Math.floor(Math.random() * r),
        y: Math.floor(Math.random() * c)
    };

    // Pits
    pits = [];
    for (let i = 0; i < 2; i++) {
        pits.push({
            x: Math.floor(Math.random() * r),
            y: Math.floor(Math.random() * c)
        });
    }
}

// Percepts
function getPercepts(x, y) {
    let percepts = [];
    const adj = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];

    adj.forEach(([i, j]) => {
        if (pits.some(p => p.x === i && p.y === j)) percepts.push("Breeze");
        if (wumpus.x === i && wumpus.y === j) percepts.push("Stench");
    });

    return percepts;
}

// Basic safety check
function isSafe(x, y) {
    inferenceSteps++;
    if (pits.some(p => p.x === x && p.y === y)) return false;
    if (wumpus.x === x && wumpus.y === y) return false;
    return true;
}

// APIs
app.post("/init", (req, res) => {
    initGrid(req.body.rows, req.body.cols);
    res.json({ ok: true });
});

app.get("/state", (req, res) => {
    res.json({
        agent,
        percepts: getPercepts(agent.x, agent.y),
        inferenceSteps,
        gold
    });
});

app.post("/move", (req, res) => {
    const { x, y } = req.body;
    let message = "";

    if (x >= 0 && x < rows && y >= 0 && y < cols) {
        if (isSafe(x, y)) {
            agent = { x, y };

            if (agent.x === gold.x && agent.y === gold.y) {
                message = "Gold Found! Goal Achieved!";
            }
        }
    }

    res.json({
        agent,
        percepts: getPercepts(agent.x, agent.y),
        inferenceSteps,
        gold,
        message
    });
});

app.listen(3000, () =>
    console.log("Backend running on http://localhost:3000")
);