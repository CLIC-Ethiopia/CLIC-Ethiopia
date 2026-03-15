import React, { useEffect, useContext } from 'react';
import { LanguageContext } from '../App';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ (Amharic)' },
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'ti', label: 'ትግርኛ (Tigrinya)' },
  { code: 'so', label: 'Soomaali' },
  { code: 'sw', label: 'Kiswahili' },
  { code: 'ha', label: 'Hausa' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية (Arabic)' }
];

const GoogleTranslateWidget = ({ id = "google_translate_element" }: { id?: string }) => {
  const { setLang } = useContext(LanguageContext);

  useEffect(() => {
    const initTranslate = () => {
      // Clear the element first in case of remount
      const element = document.getElementById(id);
      if (element) element.innerHTML = '';
      
      // @ts-ignore
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: 'en',
          includedLanguages: 'en,am,om,ti,so,sw,ha,fr,ar',
          autoDisplay: false
        },
        id
      );
    };

    // Check if script is already added
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      // @ts-ignore
      window.googleTranslateElementInit = initTranslate;
    } else {
      // @ts-ignore
      if (window.google && window.google.translate) {
        initTranslate();
      }
    }
  }, [id]);

  useEffect(() => {
    // Prevent Google Translate from adding `top` to the body
    const observer = new MutationObserver(() => {
      if (document.body.style.top) {
        document.body.style.top = '';
      }
      if (document.body.style.marginTop) {
        document.body.style.marginTop = '';
      }
      if (document.documentElement.style.top) {
        document.documentElement.style.top = '';
      }
      if (document.documentElement.style.marginTop) {
        document.documentElement.style.marginTop = '';
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    
    // Always use English as the base for the app's manual translation
    // so Google Translate can translate the entire page from English to the target language
    setLang('en');

    if (selectedLang === 'en') {
      // Clear Google Translate cookies to properly revert to original language
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      window.location.reload();
      return;
    }

    // Trigger Google Translate
    // Google Translate uses an empty string for the default page language
    const targetValue = selectedLang === 'en' ? '' : selectedLang;
    
    const gtSelects = document.querySelectorAll('.goog-te-combo');
    if (gtSelects.length > 0) {
      gtSelects.forEach((select) => {
        (select as HTMLSelectElement).value = targetValue;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      });
    } else {
      // Fallback if the widget hasn't fully loaded or DOM changed
      document.cookie = `googtrans=/en/${selectedLang}; path=/;`;
      window.location.reload();
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Hidden Google Translate Element */}
      <div id={id} className="absolute opacity-0 pointer-events-none -z-10 overflow-hidden w-0 h-0"></div>
      
      {/* Custom UI */}
      <div className="notranslate relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="pl-3 pr-1 pointer-events-none text-gray-500 dark:text-gray-400">
          <Globe size={16} />
        </div>
        <select 
          onChange={handleLanguageChange}
          className="appearance-none bg-transparent text-gray-700 dark:text-gray-200 py-2 pl-1 pr-8 text-xs xl:text-sm font-bold cursor-pointer outline-none"
          defaultValue="en"
        >
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code} className="text-gray-900">{l.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GoogleTranslateWidget;
