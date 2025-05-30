import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './authContext.jsx'
import ProjectRouter from './components/Routes.jsx'
import { BrowserRouter, } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  < AuthProvider>

    < BrowserRouter >
      < ProjectRouter />
    </BrowserRouter>

  </AuthProvider>
);
