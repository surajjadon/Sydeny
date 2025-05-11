# Sydeny

Sydeny is a web application that integrates with the TrackMaster API to fetch and display data. It features a React frontend built with Vite and a Node.js backend server that can run locally.

## Features

- TrackMaster API integration
- React + Vite frontend
- Local Node.js backend server

## Prerequisites

- Node.js
- Git

## Installation

Clone the repository and install dependencies:

git clone https://github.com/surajjadon/Sydeny.git
cd Sydeny
npm install
cd backend
npm install

## Running the App

Start Backend:

cd backend
npm start

Backend runs at: http://localhost:5000

Start Frontend (new terminal):

npm run dev

Frontend runs at: http://localhost:3000

## Build Frontend for Production

npm run build

Build output will be in the dist/ folder.

## Project Structure

Sydeny/
├── backend/       - Node.js backend
├── src/           - React source code
├── public/        - Static files
├── package.json
├── vite.config.js
└── README.md

## API

Uses the TrackMaster API. Add API keys or tokens via env or config files.

## License

MIT
