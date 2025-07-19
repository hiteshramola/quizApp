import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/Main.scss'
import AppRoutes from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
