import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskProvider } from './components/context/TaskContext.tsx'
import { UserProvider } from './components/context/UserContext.tsx'
import { ShopProvider } from './components/context/ShopContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShopProvider>
    <UserProvider>
    <TaskProvider>
    <App />
    </TaskProvider>
    </UserProvider>
    </ShopProvider>
  </StrictMode>,
)
