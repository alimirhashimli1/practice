import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {Theme } from '../components/ThemeToggle/types'

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('app-theme');
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light';
    })

    useEffect(() => {
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((curr: Theme) => (curr === 'light' ? 'dark' : 'light'))
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () : ThemeContextType => {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error('useTheme must be used within a Theme Provider')
    }
    return context;
}