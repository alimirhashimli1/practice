import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      greeting: 'Welcome to our application!',
      description: 'Use the button below to switch the language.',
      buttonLabel: 'Switch to German',
    },
  },
  de: {
    translation: {
      greeting: 'Willkommen in unserer Anwendung!',
      description: 'Verwenden Sie die Schaltfläche unten, um die Sprache zu wechseln.',
      buttonLabel: 'Wechsle zu Englisch',
    },
  },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
})

export default i18n;