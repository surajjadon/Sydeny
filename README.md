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
![Screenshot 2025-05-11 191527](https://github.com/user-attachments/assets/b6abf01a-6f3f-451c-a411-4f315eb06c23)
![Screenshot 2025-05-11 191543](https://github.com/user-attachments/assets/bfe52c12-0267-4a2d-b358-cd731a98ec73)
![Screenshot 2025-05-11 191556](https://github.com/user-attachments/assets/6d4aa66d-54da-4f00-81f0-feca666aa4dc)






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
