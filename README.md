# racing-analytics
End‑to‑end racing analytics playground for telemetry exploration, stint simulation, and pit‑stop strategy decision support. Built with TypeScript and modern web tech, designed to experiment with F1‑style data, race models, and AI‑assisted strategy tools.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Install all dependencies (backend, frontend, and root):
```bash
npm run install:all
```

Or install them separately:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Running the Project

Start both backend and frontend servers simultaneously:
```bash
npm run dev
```

This will start:
- **Backend API** on http://localhost:3000
- **Frontend** on http://localhost:5173

Open your browser and navigate to http://localhost:5173 to see the application.

### Demo Telemetry

The project includes a demo telemetry endpoint that returns simulated racing data:

- **Backend endpoint**: `GET /telemetry/demo` - Returns 150 telemetry points with distance, speed, throttle, and brake data
- **Frontend**: Click "Load demo telemetry" on the Telemetry page to fetch and visualize the data in a speed vs distance chart

### Development

- **Backend only**: `npm run dev:backend`
- **Frontend only**: `npm run dev:frontend`
- **Build both**: `npm run build`
- **Lint both**: `npm run lint`
