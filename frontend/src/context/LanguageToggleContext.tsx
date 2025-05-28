import { createContext, useState, useEffect, ReactNode, useContext } from "react";

type Language = 'en' | 'de';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({children}) => {
    const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('app-language');
    return (savedLanguage === 'en' || savedLanguage === 'de') ? savedLanguage : 'en';
    })

    useEffect(() => {
        localStorage.setItem('app-language', language);
    })

    const toggleLanguage = () => {
        setLanguage((curr: Language) => (curr === 'en' ? 'de' : 'en'))
    }

    return (
        <LanguageContext.Provider value={{language, toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () : LanguageContextType => {
    const context = useContext(LanguageContext);
    if(!context) {
        throw new Error('useLanguage must b eused within a Language Provider')
    }
    return context;
}