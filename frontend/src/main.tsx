import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskProvider } from './components/context/TaskContext.tsx'
import { UserProvider } from './components/context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
    <TaskProvider>
    <App />
    </TaskProvider>
    </UserProvider>
  </StrictMode>,
)
