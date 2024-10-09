import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import About from './About.jsx'
import Index from './Index.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index />
  </StrictMode>,
)
