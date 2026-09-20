# 🕵️ Crime Investigation Game

A multiplayer crime investigation game built with **React Native and Expo**, where players work together to investigate a case, collect evidence, discuss suspects, and vote to identify the culprit.

The game combines investigation, communication, deduction, and multiplayer gameplay into an interactive mobile experience.

---

## 🎮 Overview

Players join an investigation room and work through a crime case together.

Each case provides players with:

- 📋 Case information
- 🧩 Evidence
- 👤 Suspects
- 💬 Multiplayer chat
- 🗳️ Voting
- 🏆 Results

Players must examine the available evidence, discuss their theories, and make their final decision before the investigation ends.

---

## ✨ Features

### 🔐 Authentication
- User registration
- User login
- Firebase Authentication
- User session management

### 🏠 Multiplayer Rooms
- Create an investigation room
- Join an existing room
- Room codes
- Multiplayer lobby
- Player list

### 🔎 Investigation
- Case briefing
- Evidence investigation
- Suspect profiles
- Case-specific information
- Structured investigation flow

### 💬 Multiplayer Chat
- Real-time room communication
- Player discussions
- Investigation theories and clues

### 🗳️ Voting System
- Players vote for the suspect they believe is responsible
- Vote tracking
- Investigation results
- Final outcome screen

### 🛠️ Case Management
- Case data structure
- Case creation functionality
- Evidence management
- Suspect management

---

## 🧱 Tech Stack

### Frontend
- React Native
- Expo
- JavaScript

### Backend / Services
- Firebase Authentication
- Cloud Firestore

### Development Tools
- Git
- GitHub
- VS Code

---

## 📁 Project Structure

```text
CrimeInvestigationGame/
│
├── assets/
│
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── EvidenceCard.js
│   │   ├── Input.js
│   │   ├── PlayerRow.js
│   │   ├── ScreenWrapper.js
│   │   └── SuspectCard.js
│   │
│   ├── config/
│   │   └── firebase.js
│   │
│   ├── constants/
│   │   ├── cases.js
│   │   ├── colors.js
│   │   └── routes.js
│   │
│   ├── navigation/
│   │   ├── AppNavigator.js
│   │   └── AuthNavigator.js
│   │
│   ├── screens/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── game/
│   │   └── main/
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── caseService.js
│   │   ├── chatService.js
│   │   ├── roomService.js
│   │   └── voteService.js
│   │
│   └── utils/
│       ├── formatDate.js
│       └── generateRoomCode.js
│
├── App.js
├── app.json

Prerequisites

Make sure you have the following installed:

Node.js
npm
Expo CLI
Expo Go on your mobile device (optional)
Installation

Clone the repository:

git clone https://github.com/Hossam-M-Abdelalim/CrimeInvestigationGame.git

Navigate to the project:

cd CrimeInvestigationGame

Install dependencies:

npm install

Start the Expo development server:

npx expo start
========================================================================================
The application uses Firebase for authentication and cloud data storage.

Firebase configuration is located at:

src/config/firebase.js

For production deployments, Firebase Authentication and Firestore Security Rules should be configured appropriately.
========================================================================================
Login / Register
       │
       ▼
     Home
       │
   ┌───┴────┐
   ▼        ▼
Create     Join
 Room      Room
   │        │
   └───┬────┘
       ▼
   Room Lobby
       │
       ▼
 Case Briefing
       │
       ▼
 Investigation
   │    │    │
   ▼    ▼    ▼
Evidence Chat Suspects
       │
       ▼
      Vote
       │
       ▼
     Results

=======================================================================================


📌 Project Status

🚧 In Development

The project is actively being developed and new gameplay systems and improvements may be added over time.

👨‍💻 Author:

Hossam Mohamed Abdel Alim
├── index.js
├── package.json
└── README.md
