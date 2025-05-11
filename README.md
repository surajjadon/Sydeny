Sydeny
======

Sydeny is a web application that integrates with the TrackMaster API to fetch and display data. It uses a React + Vite frontend and a Node.js backend that runs locally.

Features
--------
- TrackMaster API integration
- React + Vite frontend
- Node.js local backend server

Prerequisites
-------------
- Node.js
- Git
![Screenshot 2025-05-11 191458](https://github.com/user-attachments/assets/26b93e02-0402-4a79-a33c-47ef5d321ebf)
![Screenshot 2025-05-11 191516](https://github.com/user-attachments/assets/6208cf5b-d888-4790-ae7f-48fd533cd718)
![Screenshot 2025-05-11 191516](https://github.com/user-attachments/assets/65e635c2-7e3e-4360-8657-b8b047243c9e)



Installation
------------
1. Clone the repository:
   git clone https://github.com/surajjadon/Sydeny.git
   cd Sydeny

2. Install frontend dependencies:
   npm install

3. Install backend dependencies:
   cd backend
   npm install

Running the App
---------------
Start Backend:
   cd backend
   npm start
   (Runs at http://localhost:5000)

Start Frontend (in new terminal):
   npm run dev
   (Runs at http://localhost:3000)

Build for Production:
   npm run build
   (Output in the dist/ folder)

Project Structure
-----------------
Sydeny/
├── backend/       - Node.js backend
├── src/           - React code
├── public/        - Static assets
├── package.json
├── vite.config.js
└── README.md

API
---
Uses the TrackMaster API. Configure API keys in environment or config files.

License
-------
MIT
