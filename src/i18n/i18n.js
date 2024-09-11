import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'
import uzTrans from './locales/uz.json'
import ruTrans from './locales/ru.json'

const resources = {
    uz: {
        translation: uzTrans
    },
    ru: {
        translation: ruTrans
    },
}

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    detection: {
        order: ['queryString', 'cookie'],
        cache: ['cookie']
    },
    interpolation: {
        escapeValue: false
    },
})

export default i18n