import React from "react";

function Grid({ rows, cols, agent, move }) {
    const cells = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let className = "cell";

            if (agent.x === i && agent.y === j) {
                className += " agent";
            }

            cells.push(
                <div
                    key={`${i}-${j}`}
                    className={className}
                    onClick={() => move(i, j)}
                >
                    {agent.x === i && agent.y === j ? "A" : ""}
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