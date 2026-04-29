import React from "react";

function Grid({ rows, cols, agent, move, gold, percepts }) {
    const cells = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let className = "cell";
            let label = "";

            if (agent.x === i && agent.y === j) {
                label = "A";

                if (percepts.includes("Breeze") && percepts.includes("Stench")) {
                    className += " both";
                } else if (percepts.includes("Breeze")) {
                    className += " breeze";
                } else if (percepts.includes("Stench")) {
                    className += " stench";
                } else {
                    className += " agent";
                }
            }
            else if (gold.x === i && gold.y === j) {
                className += " gold";
                label = "G";
            }

            cells.push(
                <div
                    key={`${i}-${j}`}
                    className={className}
                    onClick={() => move(i, j)}
                >
                    {label}
                </div>
            );
        }
    }

    return (
        <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${cols}, 60px)` }}
        >
            {cells}
        </div>
    );
}

export default Grid;