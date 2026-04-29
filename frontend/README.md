# Wumpus Agent Frontend

This directory contains the React-based frontend for the Wumpus Agent application. It provides an interactive visual representation of the game grid and communicates with the backend to update the game state.

## Features
- **Interactive Grid**: A dynamically generated grid based on user input for rows and columns.
- **Visual Cues**: The grid highlights the agent's location (`A`), the presence of gold (`G`), and cells with percepts like Breeze or Stench.
- **Move Controls**: Click on adjacent cells to attempt a move. The backend validates if the move is safe.
- **Game Info Panel**: Displays active percepts, the number of inference steps taken, and game messages (e.g., "🎉 Gold Found! Goal Achieved!").

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3001](http://localhost:3001) (or `http://localhost:3000` depending on the port assigned) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

## Dependencies
- `react`: A JavaScript library for building user interfaces.
- `react-dom`: Serves as the entry point to the DOM and server renderers for React.
- `react-scripts`: Scripts and configuration used by Create React App.
