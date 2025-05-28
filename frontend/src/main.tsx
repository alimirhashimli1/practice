import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { LanguageProvider } from './context/LanguageToggleContext.tsx'
import './i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
    <ThemeProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>
    </LanguageProvider>
   </StrictMode>,
)
