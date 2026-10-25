import { en } from './en.js'
import { fa } from './fa.js'
import { de } from './de.js'
import { tr } from './tr.js'
import type { Language, Strings } from './types.js'

export * from './types.js'

export const DICTS: Record<Language, Strings> = { en, fa, de, tr }

/** Interpolate `{placeholder}` tokens in a template string. */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`,
  )
}

export function t(lang: Language, key: keyof Strings, vars?: Record<string, string | number>): string {
  const template = DICTS[lang][key] ?? DICTS.en[key] ?? String(key)
  return vars ? interpolate(template, vars) : template
}

// The provider + hook live in LanguageProvider.tsx; re-export here so consumers
// can `import { useI18n } from '../i18n'` alongside the dictionaries/types.
export { useI18n } from './LanguageProvider.js'
