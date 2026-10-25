export type Language = 'en' | 'fa' | 'de' | 'tr'

export const LANGUAGES: Language[] = ['en', 'fa', 'de', 'tr']

export type ProjectStatus = 'published' | 'draft'

export interface ProjectLocale {
  name: string
  short: string
  full: string
}

export interface SeedProject {
  /** Stable identifier — preserved verbatim from the source PDF. */
  slug: string
  category: string
  /** Verbatim description text from the source PDF (English). */
  sourceDescription: string
  status: ProjectStatus
  /** Optional factual note about the source status (e.g. "scaffold"). */
  statusNote?: string
  /** Technologies explicitly named in the source. */
  technologies: string[]
  /** Capability groupings derived from the portfolio (not formal departments). */
  capabilities: string[]
  locales: Record<Language, ProjectLocale>
}

export const CATEGORIES = [
  '04-DATA-Insight-Systems',
  '04-DATA-Intelligent-Systems',
  '06-EDGE-Data-Gathering-Systems',
] as const

export type CategoryKey = (typeof CATEGORIES)[number]
