export type Language = 'en' | 'fa' | 'de' | 'tr'

export const LANGUAGES: Language[] = ['en', 'fa', 'de', 'tr']

export const DIRECTION: Record<Language, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fa: 'rtl',
  de: 'ltr',
  tr: 'ltr',
}

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  fa: 'فارسی',
  de: 'Deutsch',
  tr: 'Türkçe',
}

export const LANGUAGE_CODES: Record<Language, string> = {
  en: 'EN',
  fa: 'FA',
  de: 'DE',
  tr: 'TR',
}

/**
 * Every user-facing string, in one flat namespace. All four dictionaries are
 * typed as this interface, so a missing key is a compile-time error — and a
 * unit test additionally verifies key parity at runtime.
 */
export interface Strings {
  // ---- meta ----
  'meta.title': string
  'meta.description': string

  // ---- navigation ----
  'nav.home': string
  'nav.about': string
  'nav.capabilities': string
  'nav.projects': string
  'nav.technology': string
  'nav.contact': string
  'nav.menu': string
  'nav.language': string

  // ---- hero ----
  'hero.title': string
  'hero.tagline': string
  'hero.subtitle': string
  'hero.ctaPrimary': string
  'hero.ctaSecondary': string
  'hero.scroll': string
  'hero.stream.ai': string
  'hero.stream.data': string
  'hero.stream.automation': string
  'hero.stream.predictive': string
  'hero.fallback.note': string

  // ---- about ----
  'about.eyebrow': string
  'about.title': string
  'about.lede': string
  'about.story.title': string
  'about.story.p1': string
  'about.story.p2': string
  'about.lifecycle.eyebrow': string
  'about.lifecycle.title': string
  'about.lifecycle.step1': string
  'about.lifecycle.step1Desc': string
  'about.lifecycle.step2': string
  'about.lifecycle.step2Desc': string
  'about.lifecycle.step3': string
  'about.lifecycle.step3Desc': string
  'about.lifecycle.step4': string
  'about.lifecycle.step4Desc': string

  // ---- capabilities ----
  'cap.eyebrow': string
  'cap.title': string
  'cap.lede': string
  'cap.ai-ml.title': string
  'cap.ai-ml.desc': string
  'cap.data-intelligence.title': string
  'cap.data-intelligence.desc': string
  'cap.nlp-speech.title': string
  'cap.nlp-speech.desc': string
  'cap.cv-ocr.title': string
  'cap.cv-ocr.desc': string
  'cap.fraud-risk.title': string
  'cap.fraud-risk.desc': string
  'cap.predictive.title': string
  'cap.predictive.desc': string
  'cap.data-engineering.title': string
  'cap.data-engineering.desc': string
  'cap.automation.title': string
  'cap.automation.desc': string

  // ---- projects ----
  'proj.eyebrow': string
  'proj.title': string
  'proj.lede': string
  'proj.search.placeholder': string
  'proj.filter.all': string
  'proj.filter.byCategory': string
  'proj.showing': string
  'proj.empty.title': string
  'proj.empty.desc': string
  'proj.empty.clear': string
  'proj.card.details': string
  'proj.detail.source': string
  'proj.detail.technologies': string
  'proj.detail.capabilities': string
  'proj.detail.category': string
  'proj.detail.status': string
  'proj.detail.close': string
  'proj.detail.related': string
  'proj.status.published': string
  'proj.status.draft': string
  'proj.note.scaffold': string
  'proj.unavailable': string

  // ---- technology ----
  'tech.eyebrow': string
  'tech.title': string
  'tech.lede': string
  'tech.note': string

  // ---- contact ----
  'contact.eyebrow': string
  'contact.title': string
  'contact.lede': string
  'contact.form.name': string
  'contact.form.namePh': string
  'contact.form.email': string
  'contact.form.emailPh': string
  'contact.form.company': string
  'contact.form.companyPh': string
  'contact.form.projectType': string
  'contact.form.projectTypePh': string
  'contact.form.message': string
  'contact.form.messagePh': string
  'contact.form.consent': string
  'contact.form.submit': string
  'contact.form.submitting': string
  'contact.form.success.title': string
  'contact.form.success.desc': string
  'contact.form.error': string
  'contact.error.name': string
  'contact.error.email': string
  'contact.error.emailInvalid': string
  'contact.error.message': string
  'contact.error.consent': string
  'contact.info.note': string

  // ---- footer ----
  'footer.tagline': string
  'footer.nav': string
  'footer.rights': string
  'footer.admin': string

  // ---- common / a11y ----
  'common.loading': string
  'common.error': string
  'common.retry': string
  'common.close': string
  'common.cancel': string
  'common.save': string
  'common.search': string
  'a11y.skip': string
  'a11y.nav': string
  'a11y.selectLanguage': string
  'a11y.toggleMenu': string
}

