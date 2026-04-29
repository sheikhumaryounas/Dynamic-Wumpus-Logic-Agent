# Wumpus Agent Backend

This directory contains the Express.js server that acts as the backend for the Wumpus Agent application. It manages the game state, validates moves, and provides percepts to the frontend.

## Features
- **Game State Management**: Keeps track of the agent's position, pits, Wumpus, and gold.
- **Percept Generation**: Returns percepts (Breeze, Stench) based on the agent's surroundings.
- **Safety Checks**: Basic inference logic validates whether a cell is safe before allowing the agent to move.

## API Endpoints

- `POST /init`: Initializes a new grid with specified rows and columns.
  - Body: `{ "rows": <number>, "cols": <number> }`
- `GET /state`: Retrieves the current state of the game.
  - Returns: `{ "agent": {"x": 0, "y": 0}, "percepts": [], "inferenceSteps": 0, "gold": {"x": 0, "y": 0} }`
- `POST /move`: Attempts to move the agent to a target coordinate. The move is executed only if it is safe.
  - Body: `{ "x": <number>, "y": <number> }`
  - Returns the updated game state and an optional message (e.g., if gold is found).

## Available Scripts

In the project directory, you can run:

### `node server.js`

Starts the backend server. The server runs on `http://localhost:3000` by default.

## Dependencies
- `express`: Web framework for handling HTTP requests.
- `cors`: Middleware to enable Cross-Origin Resource Sharing.
