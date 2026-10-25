import type { Language } from '../seed/index.js'

export interface ContentValue {
  en: string
  fa: string
  de: string
  tr: string
}

/**
 * Default public-facing content, editable via the admin "Site content" panel.
 * These are sensible baselines; the database (settings table) can override any
 * key per language. Content that is business-claim-free is safe to show.
 */
export const CONTENT_DEFAULTS: Record<string, ContentValue> = {
  'hero.title': {
    en: 'PRISM',
    fa: 'PRISM',
    de: 'PRISM',
    tr: 'PRISM',
  },
  'hero.tagline': {
    en: 'Raw Data. Infinite Possibilities.',
    fa: 'داده خام. امکانات بی‌نهایت.',
    de: 'Rohdaten. Unendliche Möglichkeiten.',
    tr: 'Ham Veri. Sınırsız İmkânlar.',
  },
  'hero.subtitle': {
    en: 'We transform complex data into intelligent systems, actionable insights, and real-world impact.',
    fa: 'ما داده‌های پیچیده را به سامانه‌های هوشمند، بینش‌های عملی و اثرات واقعی تبدیل می‌کنیم.',
    de: 'Wir wandeln komplexe Daten in intelligente Systeme, handlungsrelevante Erkenntnisse und reale Wirkung um.',
    tr: 'Karmaşık veriyi akıllı sistemlere, uygulanabilir içgörüye ve gerçek dünya etkisine dönüştürüyoruz.',
  },
  'nav.home': { en: 'Home', fa: 'خانه', de: 'Start', tr: 'Ana Sayfa' },
  'nav.about': { en: 'About', fa: 'درباره', de: 'Über uns', tr: 'Hakkında' },
  'nav.capabilities': { en: 'Capabilities', fa: 'توانمندی‌ها', de: 'Kompetenzen', tr: 'Yetenekler' },
  'nav.projects': { en: 'Projects', fa: 'پروژه‌ها', de: 'Projekte', tr: 'Projeler' },
  'nav.technology': { en: 'Technology', fa: 'فناوری', de: 'Technologie', tr: 'Teknoloji' },
  'nav.contact': { en: 'Contact', fa: 'تماس', de: 'Kontakt', tr: 'İletişim' },
  'cta.primary': {
    en: 'Explore Our Work',
    fa: 'دیدن کارهای ما',
    de: 'Unsere Arbeit entdecken',
    tr: 'Çalışmalarımızı Keşfet',
  },
  'cta.secondary': {
    en: 'Discover PRISM',
    fa: 'PRISM را کشف کنید',
    de: 'PRISM entdecken',
    tr: 'PRISM Keşfet',
  },
  'contact.info_note': {
    en: 'Use the form to reach us. We store and review every message through our admin inbox.',
    fa: 'برای ارتباط با ما از فرم استفاده کنید. هر پیام را ذخیره و از طریق صندوق مدیریت بازبینی می‌کنیم.',
    de: 'Nutzen Sie das Formular, um uns zu erreichen. Wir speichern jede Nachricht und prüfen sie im Admin-Inbox.',
    tr: 'Bize ulaşmak için formu kullanın. Her mesajı depolayıp yönetim gelen kutusu üzerinden inceliyoruz.',
  },
  'footer.description': {
    en: 'PRISM is an international AI and data intelligence company transforming complex data into intelligence.',
    fa: 'PRISM یک شرکت بین‌المللی هوش مصنوعی و هوش داده است که داده‌های پیچیده را به هوش تبدیل می‌کند.',
    de: 'PRISM ist ein internationales KI- und Data-Intelligence-Unternehmen, das komplexe Daten in Erkenntnisse verwandelt.',
    tr: 'PRISM, karmaşık veriyi içgörüye dönüştüren uluslararası bir yapay zeka ve veri istihbaratı şirketidir.',
  },
}

export function defaultContent(key: string, lang: Language): string {
  const c = CONTENT_DEFAULTS[key]
  return c ? c[lang] : ''
}
