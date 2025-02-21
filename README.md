# How to run this project

After cloning the repository, create a `.env` file in the project root.

- You can copy `.env.example`
- Note: No authentication is needed for any of the current feature, so any clientId and secret will work

Install **[this browser extension](https://eff.org)**. This prevents CORS errors when connecting to the Uphold API.

Run the following commands:

- `npm install`
- `npm run dev`

The project will be running on <http://localhost:5173/>

# Running unit tests

This project uses vitest + React Testing Library for unit testing

- `npm test`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
