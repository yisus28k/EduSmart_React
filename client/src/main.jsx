import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider } from "./context/AuthProvider.jsx";

//theme
import "primereact/resources/themes/soho-light/theme.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
