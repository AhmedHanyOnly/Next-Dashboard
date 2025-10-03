import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: { translation: { login: "Login", dashboard: "Dashboard", logout: "Logout" } },
  ar: { translation: { login: "تسجيل الدخول", dashboard: "لوحة التحكم", logout: "تسجيل الخروج" } }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  })

export default i18n
