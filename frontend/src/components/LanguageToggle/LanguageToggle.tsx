import { useTranslation } from 'react-i18next';




const LanguageToggle = () => {
    const {t, i18n} = useTranslation()

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'de' : 'en';
        i18n.changeLanguage(newLang);
    }

  return (
     <div className="text-center p-6">
      <h1 className="text-2xl font-bold mb-2">{t('greeting')}</h1>
      <p className="mb-4 text-gray-700">{t('description')}</p>
      <button
        onClick={toggleLanguage}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        {t('buttonLabel')}
      </button>
    </div>
  )
}

export default LanguageToggle