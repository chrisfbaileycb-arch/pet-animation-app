# 🐾 Pet Animation Studio (`pet-animation-app`)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Repository](https://img.shields.io/badge/GitHub-chrisfbaileycb--arch%2Fpet--animation--app-green)](https://github.com/chrisfbaileycb-arch/pet-animation-app)

An interactive, full-stack pet avatar customizer and skeletal animation studio app built with **React**, **TypeScript**, **HTML5 Canvas**, **Redux Toolkit**, **Node.js / Express**, and **Socket.io**.

---

## ✨ Features

- 🐶 **Custom Pet Builder**: Tailor pet breeds (Dog, Cat, Rabbit, Dragon), body colors, ears, facial expressions, and accessory items.
- 🎨 **HTML5 Interactive Canvas**: Real-time 60 FPS Canvas renderer supporting skeletal animation nodes (tail wagging, eye blinking, ear bouncing, breathing loop).
- 🎬 **Timeline & Keyframe Studio**: Create, edit, play, pause, and step through animation keyframe sequences with speed controls.
- 🖼️ **Preset Gallery**: Quick-load preset motion sequences like *Happy Tail Wag*, *Energetic Bounce*, *Sleepy Breathe*, and *Backflip*.
- 🔑 **User Authentication & Auth Middleware**: Full JWT sign up and sign in API integration.
- ⚡ **Real-Time WebSockets**: Live multi-user animation updates broadcast over Socket.io.
- 📦 **Monorepo Architecture**: Clean separation between modular frontend and RESTful backend micro-services.
- 🎭 **Carnival Caricature Generator**: NEW! Convert pet photos into static carnival-style caricature sketches using free Qwen AI.
- 💌 **Scheduled Email Cards**: NEW! Assemble Hallmark-style cards with handwritten messages and schedule automatic email delivery to family.

---

## 🏗️ Repository Layout

```
pet-animation-app/
├── backend/                 # Node.js/Express TypeScript backend server
│   ├── src/
│   │   ├── models/         # 6 Core data schemas (User, Pet, Animation, Canvas, Preset, RenderJob)
│   │   ├── routes/         # 7 REST API route modules
│   │   ├── services/       # Service layer business logic
│   │   ├── middleware/     # JWT authentication middleware
│   │   ├── utils/          # Logger & helper utilities
│   │   ├── sockets/        # Socket.io real-time handlers
│   │   ├── db.ts           # Storage & database connector
│   │   └── index.ts        # Express server entry point
│   └── package.json
│
├── frontend/               # Vite React 18 & TypeScript frontend app
│   ├── src/
│   │   ├── components/    # Navigation, Canvas player, Timeline, Pet Library, Preset Gallery
│   │   ├── store/         # Redux slices (auth, pet, animation)
│   │   ├── services/      # API client & HTTP services
│   │   ├── types/         # TypeScript type contracts
│   │   ├── styles/        # CSS Theme variables & responsive layouts
│   │   ├── App.tsx        # Main routing root
│   │   └── main.tsx       # Vite entry point
│   └── package.json
│
├── .gitignore
├── LICENSE
├── README.md
└── package.json           # Monorepo workspaces manifest
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/chrisfbaileycb-arch/pet-animation-app.git
cd pet-animation-app

# Install dependencies across all workspaces
npm install
```

### Running Locally

```bash
# Start both backend and frontend concurrently
npm run dev

# Or start services individually:
npm run dev:backend   # Express API server running at http://localhost:5000
npm run dev:frontend  # React Vite app running at http://localhost:3000
```

---

## 🔌 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user account |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token |
| `GET` | `/api/pets` | List user pets |
| `POST` | `/api/pets` | Save customized pet avatar configuration |
| `GET` | `/api/animations` | Fetch saved animation timeline sequences |
| `POST` | `/api/animations` | Save new animation keyframe data |
| `GET` | `/api/presets` | Get pre-made animation movement templates |
| `POST` | `/api/render` | Trigger background rendering job |

---

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
