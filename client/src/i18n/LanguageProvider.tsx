import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DIRECTION, LANGUAGES, t as translate, type Language, type Strings } from './index'

const STORAGE_KEY = 'prism.lang'

interface I18nContextValue {
  lang: Language
  dir: 'ltr' | 'rtl'
  setLanguage: (lang: Language) => void
  t: (key: keyof Strings, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function detectInitialLang(): Language {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null
    if (saved && LANGUAGES.includes(saved)) return saved
  }
  if (typeof navigator !== 'undefined') {
    const nav = navigator.language?.toLowerCase()
    if (nav?.startsWith('fa')) return 'fa'
    if (nav?.startsWith('de')) return 'de'
    if (nav?.startsWith('tr')) return 'tr'
  }
  return 'en'
}

/** Per-language document metadata (title + description) for SEO. */
const META: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'PRISM — Raw Data. Infinite Possibilities.',
    description:
      'PRISM is an international AI and data intelligence company transforming complex data into intelligent systems, actionable insights, and real-world impact.',
  },
  fa: {
    title: 'PRISM — داده خام. امکانات بی‌نهایت.',
    description:
      'PRISM یک شرکت بین‌المللی هوش مصنوعی و هوش داده است که داده‌های پیچیده را به سامانه‌های هوشمند، بینش‌های عملی و اثرات واقعی تبدیل می‌کند.',
  },
  de: {
    title: 'PRISM — Rohdaten. Unendliche Möglichkeiten.',
    description:
      'PRISM ist ein internationales KI- und Data-Intelligence-Unternehmen, das komplexe Daten in intelligente Systeme, handlungsrelevante Erkenntnisse und reale Wirkung verwandelt.',
  },
  tr: {
    title: 'PRISM — Ham Veri. Sınırsız İmkânlar.',
    description:
      'PRISM, karmaşık veriyi akıllı sistemlere, uygulanabilir içgörüye ve gerçek dünya etkisine dönüştüren uluslararası bir yapay zekâ ve veri istihbaratı şirketidir.',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(detectInitialLang)
  const dir = DIRECTION[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    localStorage.setItem(STORAGE_KEY, lang)
    const meta = META[lang]
    document.title = meta.title
    let desc = document.querySelector('meta[name="description"]')
    if (!desc) {
      desc = document.createElement('meta')
      desc.setAttribute('name', 'description')
      document.head.appendChild(desc)
    }
    desc.setAttribute('content', meta.description)
  }, [lang, dir])

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      dir,
      setLanguage: (l) => setLang(l),
      t: (key, vars) => translate(lang, key, vars),
    }),
    [lang, dir],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within a LanguageProvider')
  return ctx
}
