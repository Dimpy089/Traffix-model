# Traffix-model

Traffic accident risk prediction app with an Express backend and a Vite React frontend dashboard.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Dev URL:

```text
http://127.0.0.1:5173
```

## Production Build

```bash
cd frontend
npm run build
cd ../backend
npm start
```

The Express backend serves `frontend/dist` after the frontend is built. Auth forms use `/api/auth/login` and `/api/auth/signup`; predictions post to `/predict` first and fall back to the existing `/predictioninput` endpoint when needed.
