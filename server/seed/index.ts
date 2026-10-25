import { INSIGHT_SYSTEMS } from './insight-systems.js'
import { INTELLIGENT_SYSTEMS_A } from './intelligent-systems-a.js'
import { INTELLIGENT_SYSTEMS_B } from './intelligent-systems-b.js'
import { INTELLIGENT_SYSTEMS_C } from './intelligent-systems-c.js'
import { EDGE_GATHERING } from './edge-gathering.js'
import type { CategoryKey, Language, SeedProject } from './types.js'

export type { CategoryKey, Language, ProjectLocale, ProjectStatus, SeedProject } from './types.js'
export { CATEGORIES, LANGUAGES } from './types.js'

/** The complete, authoritative portfolio: 35 projects (5 + 23 + 7). */
export const SEED_PROJECTS: SeedProject[] = [
  ...INSIGHT_SYSTEMS,
  ...INTELLIGENT_SYSTEMS_A,
  ...INTELLIGENT_SYSTEMS_B,
  ...INTELLIGENT_SYSTEMS_C,
  ...EDGE_GATHERING,
]

export const CATEGORY_LABELS: Record<CategoryKey, Record<Language, string>> = {
  '04-DATA-Insight-Systems': {
    en: 'Data Insight Systems',
    fa: 'سامانه‌های بینش داده',
    de: 'Data-Insight-Systeme',
    tr: 'Veri İçgörü Sistemleri',
  },
  '04-DATA-Intelligent-Systems': {
    en: 'Data Intelligent Systems',
    fa: 'سامانه‌های هوشمند داده',
    de: 'Data-Intelligent-Systeme',
    tr: 'Veri Akıllı Sistemleri',
  },
  '06-EDGE-Data-Gathering-Systems': {
    en: 'Edge Data-Gathering Systems',
    fa: 'سامانه‌های گردآوری داده لبه',
    de: 'Edge-Datenerfassungs-Systeme',
    tr: 'Uç Veri Toplama Sistemleri',
  },
}

/** Human-readable capability labels, per language. */
export const CAPABILITY_LABELS: Record<string, Record<Language, string>> = {
  'ai-ml': { en: 'AI & Machine Learning', fa: 'هوش مصنوعی و یادگیری ماشین', de: 'KI & maschinelles Lernen', tr: 'Yapay Zeka & Makine Öğrenmesi' },
  'data-intelligence': { en: 'Data Intelligence & Analytics', fa: 'هوش داده و تحلیل', de: 'Data Intelligence & Analytics', tr: 'Veri İstihbaratı & Analitik' },
  'nlp-speech': { en: 'NLP & Speech Recognition', fa: 'پردازش زبان طبیعی و شناسایی گفتار', de: 'NLP & Spracherkennung', tr: 'NLP & Konuşma Tanıma' },
  'cv-ocr': { en: 'Computer Vision & OCR', fa: 'بینایی ماشین و OCR', de: 'Computer Vision & OCR', tr: 'Bilgisayar Görüsü & OCR' },
  'fraud-risk': { en: 'Fraud Detection & Risk', fa: 'کشف تقلب و ارزیابی ریسک', de: 'Betrugserkennung & Risiko', tr: 'Dolandırıcılık Tespiti & Risk' },
  'predictive': { en: 'Statistical & Predictive Analysis', fa: 'تحلیل آماری و پیش‌بینانه', de: 'Statistische & prädiktive Analyse', tr: 'İstatistiksel & Öngörücü Analiz' },
  'data-engineering': { en: 'Data Engineering & Collection', fa: 'مهندسی و گردآوری داده', de: 'Data Engineering & Erfassung', tr: 'Veri Mühendisliği & Toplama' },
  'automation': { en: 'Intelligent Automation & AI Infrastructure', fa: 'اتوماسیون هوشمند و زیرساخت هوش مصنوعی', de: 'Intelligent Automation & KI-Infrastruktur', tr: 'Akıllı Otomasyon & AI Altyapısı' },
  'ai-infra': { en: 'AI Infrastructure', fa: 'زیرساخت هوش مصنوعی', de: 'KI-Infrastruktur', tr: 'AI Altyapısı' },
}

export const CAPABILITY_KEYS = Object.keys(CAPABILITY_LABELS)
