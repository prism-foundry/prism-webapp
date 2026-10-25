import { adminEn } from './admin.en.js'
import { adminFa } from './admin.fa.js'
import { adminDe } from './admin.de.js'
import { adminTr } from './admin.tr.js'
import type { Language } from './types.js'
import type { AdminStrings } from './admin.types.js'
import { interpolate } from './index.js'
import { useI18n } from './LanguageProvider.js'

export const ADMIN_DICTS: Record<Language, AdminStrings> = {
  en: adminEn,
  fa: adminFa,
  de: adminDe,
  tr: adminTr,
}

export function adminT(lang: Language, key: keyof AdminStrings, vars?: Record<string, string | number>): string {
  const template = ADMIN_DICTS[lang][key] ?? ADMIN_DICTS.en[key] ?? String(key)
  return vars ? interpolate(template, vars) : template
}

/** Translate admin strings in the active UI language. */
export function useAdminT() {
  const { lang } = useI18n()
  return (key: keyof AdminStrings, vars?: Record<string, string | number>) => adminT(lang, key, vars)
}

export type { AdminStrings }
