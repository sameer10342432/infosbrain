import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  country: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', country: 'United States / UK' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', country: 'Germany' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', country: 'Pakistan' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', country: 'UAE / Saudi Arabia' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', country: 'Spain / Latin America' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', country: 'France' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', country: 'Italy' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', country: 'Portugal / Brazil' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', country: 'Russia' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', country: 'Turkey' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', country: 'China' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', country: 'Japan' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', country: 'South Korea' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', country: 'India' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', country: 'Netherlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', country: 'Poland' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', country: 'Sweden' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', country: 'Indonesia' },
];

export const COUNTRY_TO_LANG: Record<string, string> = {
  // German speaking
  DE: 'de', AT: 'de', CH: 'de',
  // Pakistan
  PK: 'ur',
  // Arabic speaking
  SA: 'ar', AE: 'ar', QA: 'ar', KW: 'ar', OM: 'ar', BH: 'ar', EG: 'ar', JO: 'ar', LB: 'ar', IQ: 'ar', DZ: 'ar', MA: 'ar',
  // Spanish speaking
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es', GT: 'es',
  // French speaking
  FR: 'fr', BE: 'fr',
  // Italian
  IT: 'it',
  // Portuguese
  PT: 'pt', BR: 'pt',
  // Russian
  RU: 'ru', BY: 'ru', KZ: 'ru',
  // Turkish
  TR: 'tr',
  // Chinese
  CN: 'zh-CN', TW: 'zh-CN', HK: 'zh-CN',
  // Japanese
  JP: 'ja',
  // Korean
  KR: 'ko',
  // Hindi
  IN: 'hi',
  // Dutch
  NL: 'nl',
  // Polish
  PL: 'pl',
  // Swedish
  SE: 'sv',
  // Indonesian
  ID: 'id',
  // English default
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en',
};

interface TranslationContextType {
  currentLang: string;
  detectedCountry: { code: string; name: string } | null;
  detectedLang: string | null;
  isAutoTranslated: boolean;
  showToast: boolean;
  dismissToast: () => void;
  changeLanguage: (code: string, isManual?: boolean) => void;
  revertToEnglish: () => void;
  supportedLanguages: Language[];
  currentLanguageObj: Language;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const setGoogTransCookie = (targetLang: string) => {
  const domain = window.location.hostname;
  const cookieValue = `/en/${targetLang}`;
  const days = 30;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = '; expires=' + date.toUTCString();

  // Set cookies for root and subdomains
  document.cookie = `googtrans=${cookieValue}${expires}; path=/;`;
  document.cookie = `googtrans=${cookieValue}${expires}; path=/; domain=${domain};`;
  if (domain.includes('.')) {
    const parts = domain.split('.');
    if (parts.length > 1) {
      const rootDomain = parts.slice(-2).join('.');
      document.cookie = `googtrans=${cookieValue}${expires}; path=/; domain=.${rootDomain};`;
    }
  }
};

const triggerGoogleTranslateWidget = (targetLang: string): boolean => {
  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (select) {
    select.value = targetLang;
    select.dispatchEvent(new Event('change'));
    return true;
  }
  return false;
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [detectedCountry, setDetectedCountry] = useState<{ code: string; name: string } | null>(null);
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  const [isAutoTranslated, setIsAutoTranslated] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Apply language update
  const applyLanguage = useCallback((langCode: string, isManualAction = false) => {
    setCurrentLang(langCode);
    setGoogTransCookie(langCode);

    // Apply RTL for Arabic / Urdu
    if (langCode === 'ar' || langCode === 'ur') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    if (isManualAction) {
      localStorage.setItem('infosbrain_user_lang', langCode);
      localStorage.setItem('infosbrain_lang_manual', 'true');
      setIsAutoTranslated(false);
      setShowToast(false);
    }

    // Try triggering widget immediately
    const triggered = triggerGoogleTranslateWidget(langCode);
    if (!triggered) {
      // Retry every 300ms for up to 3 seconds until Google Translate widget mounts
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (triggerGoogleTranslateWidget(langCode) || attempts > 10) {
          clearInterval(interval);
        }
      }, 300);
    }
  }, []);

  const changeLanguage = (code: string, isManual = true) => {
    applyLanguage(code, isManual);
  };

  const revertToEnglish = () => {
    applyLanguage('en', true);
    setShowToast(false);
  };

  const dismissToast = () => {
    setShowToast(false);
  };

  // Initial Auto-Detection logic
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedLang = localStorage.getItem('infosbrain_user_lang');
    const isManualChoice = localStorage.getItem('infosbrain_lang_manual') === 'true';

    // If user previously manually picked a language, honor it
    if (savedLang && isManualChoice) {
      applyLanguage(savedLang, false);
      return;
    }

    // Otherwise, auto-detect country & language
    const detectVisitorLanguage = async () => {
      let targetLang = 'en';
      let countryInfo: { code: string; name: string } | null = null;

      // 1. Check browser/OS language
      const browserLang = (navigator.language || (navigator.languages && navigator.languages[0]) || 'en').toLowerCase();
      if (browserLang.startsWith('zh')) {
        targetLang = 'zh-CN';
      } else {
        const prefix = browserLang.slice(0, 2);
        if (SUPPORTED_LANGUAGES.some((l) => l.code === prefix)) {
          targetLang = prefix;
        }
      }

      // 2. Try Geo-IP lookup for precise country detection
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        // Fetch free geolocation
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const countryCode = (data.country_code || data.country || '').toUpperCase();
          const countryName = data.country_name || '';

          if (countryCode) {
            countryInfo = { code: countryCode, name: countryName };
            setDetectedCountry(countryInfo);

            if (COUNTRY_TO_LANG[countryCode]) {
              targetLang = COUNTRY_TO_LANG[countryCode];
            }
          }
        }
      } catch (e) {
        // Fallback silently to browser language
      }

      // If detected language is non-English, automatically translate!
      if (targetLang !== 'en') {
        setDetectedLang(targetLang);
        setIsAutoTranslated(true);
        setShowToast(true);
        applyLanguage(targetLang, false);
      }
    };

    detectVisitorLanguage();
  }, [applyLanguage]);

  const currentLanguageObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <TranslationContext.Provider
      value={{
        currentLang,
        detectedCountry,
        detectedLang,
        isAutoTranslated,
        showToast,
        dismissToast,
        changeLanguage,
        revertToEnglish,
        supportedLanguages: SUPPORTED_LANGUAGES,
        currentLanguageObj,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
