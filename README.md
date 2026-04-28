# Wumpus World Agent

A full-stack web application that simulates the classic AI **Wumpus World** problem. The project consists of a React-based frontend for visualizing the grid and interacting with the agent, and an Express/Node.js backend for managing the game state, logic, and generating percepts.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [API Endpoints](#api-endpoints)
- [How to Play](#how-to-play)
- [Future Improvements](#future-improvements)

## Features
- **Dynamic Grid Setup**: Start the game with customizable grid dimensions (rows and columns).
- **Backend-Driven Logic**: The game state, including the locations of the Wumpus, pits, and the agent, is securely managed on the server.
- **Percepts Simulation**: Generates environmental percepts dynamically based on adjacent hazards (e.g., *Stench* for the Wumpus, *Breeze* for Pits).
- **Basic Inference Engine**: Performs safety checks on the backend before allowing the agent to move, keeping track of the logical inference steps.
- **Interactive UI**: A clean, responsive React interface that visualizes the grid, the agent's current position, active percepts, and the number of inference steps taken.

## Technologies Used
- **Frontend**: React.js, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Middleware**: CORS

## Project Structure
```text
wumpus-agent/
│
├── backend/
│   ├── package.json
│   └── server.js         # Express server, game logic, state management
│
└── frontend/
    ├── package.json
    ├── public/
    └── src/
        ├── App.js        # Main React component, state & API calls
        ├── Grid.js       # UI component for rendering the Wumpus grid
        ├── index.js      # React entry point
        └── styles.css    # Application styling
```

## Installation and Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository
If you haven't already, clone this repository to your local machine and navigate into the project directory.

```bash
git clone <your-repository-url>
cd "wumpus agent"
```

### 2. Setup the Backend
Open a terminal, navigate to the backend directory, install the dependencies, and start the server.

```bash
cd backend
npm install
node server.js
```
The backend server will start running on `http://localhost:3000`.

### 3. Setup the Frontend
Open a new terminal, navigate to the frontend directory, install the dependencies, and start the React application.

```bash
cd frontend
npm install
npm start
```
*Note: Since the backend is running on port `3000`, React may prompt you to run the frontend on a different port (typically `http://localhost:3001`). Type `Y` to accept.*

## API Endpoints

The backend exposes the following RESTful endpoints:

- **`POST /init`**: Initializes a new game grid with randomized hazards.
  - **Body**: `{ "rows": 4, "cols": 4 }`
  - **Response**: `{ "ok": true }`

- **`GET /state`**: Retrieves the current state of the agent.
  - **Response**: `{ "agent": { "x": 0, "y": 0 }, "percepts": ["Breeze"], "inferenceSteps": 1 }`

- **`POST /move`**: Attempts to move the agent to a specified coordinate. The move is only executed if the target tile is deemed safe by the backend inference logic.
  - **Body**: `{ "x": 1, "y": 0 }`
  - **Response**: Returns the updated state (agent position, percepts, inference steps).

## How to Play
1. Launch both the backend and frontend servers as described in the setup instructions.
2. In the web interface, specify your desired grid dimensions (Rows and Columns).
3. Click **Start** to initialize the game.
4. Click on an adjacent cell in the grid to move the agent (represented by `A`).
5. Observe the **Percepts** (Breeze, Stench) at the bottom to deduce the locations of pits or the Wumpus. The backend logic will prevent you from moving into dangerous cells.

## Future Improvements
- **Advanced AI Agent**: Implement automated AI algorithms (like Propositional Logic or First-Order Logic solvers) to allow the agent to navigate and solve the grid autonomously.
- **Visual Enhancements**: Add rich graphics, icons, or images for the Wumpus, Pits, Gold, and the Agent.
- **Gold and Scoring**: Introduce the Gold element, scoring mechanisms, and arrows to shoot the Wumpus.
- **Fog of War**: Hide unvisited cells to make the exploration experience more authentic.
