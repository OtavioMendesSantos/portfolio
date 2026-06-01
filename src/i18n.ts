import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "pt";

  const storedLanguage = window.localStorage.getItem("language");
  if (storedLanguage === "pt" || storedLanguage === "en") return storedLanguage;

  return window.navigator.language.startsWith("en") ? "en" : "pt";
};

i18n
  .use(initReactI18next)
  .init({
    lng: getInitialLanguage(),
    fallbackLng: "pt",
    debug: import.meta.env.DEV,
    resources: {
      en: {
        translation: en,
      },
      pt: {
        translation: pt,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
