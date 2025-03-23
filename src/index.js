import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Profile from "./pages/Profile";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
