import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Patch: Make PUBLIC_URL globally defined for scripts that reference it (workaround for build ReferenceError)
if (typeof window.PUBLIC_URL === "undefined") {
  window.PUBLIC_URL = process.env.PUBLIC_URL || "/";
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
