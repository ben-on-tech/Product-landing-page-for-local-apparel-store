import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18+
import './index.css'; // Assuming you have a basic index.css for global styles
import App from './App'; // Import your main App component
import reportWebVitals from './reportWebVitals'; // Used for performance reporting

// Get the root DOM element where your React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
