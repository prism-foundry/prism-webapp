import type { SeedProject } from './types.js'

/** 04-DATA-Intelligent-Systems — projects 17–18 (final two) of 23. */
export const INTELLIGENT_SYSTEMS_C: SeedProject[] = [
  {
    slug: 'support-automatic-speech-recognition',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'ASR support notebooks (Whisper, Gemma)',
    status: 'published',
    technologies: ['Whisper'],
    capabilities: ['nlp-speech'],
    locales: {
      en: {
        name: 'ASR Support Notebooks',
        short: 'ASR support notebooks (Whisper, Gemma)',
        full: 'A collection of notebooks supporting the speech recognition work, exploring Whisper and Gemma models. They document experiments, model comparisons and pipelines that back the ASR engine.',
      },
      fa: {
        name: 'نوت‌بوک‌های پشتیبانی شناسایی گفتار',
        short: 'نوت‌بوک‌های پشتیبانی ASR (Whisper, Gemma)',
        full: 'مجموعه‌ای از نوت‌بوک‌ها برای پشتیبانی از کار شناسایی گفتار که مدل‌های Whisper و Gemma را بررسی می‌کند. آزمایش‌ها، مقایسه‌ی مدل‌ها و لوله‌خط‌هایی که موتور ASR را پشتیبانی می‌کنند را مستند می‌سازد.',
      },
      de: {
        name: 'ASR-Unterstützungs-Notebooks',
        short: 'ASR-Unterstützungs-Notebooks (Whisper, Gemma)',
        full: 'Eine Sammlung von Notebooks zur Unterstützung der Spracherkennungsarbeit, die Whisper- und Gemma-Modelle untersucht. Sie dokumentiert Experimente, Modellvergleiche und Pipelines, die die ASR-Engine stützen.',
      },
      tr: {
        name: 'ASR Destek Defterleri',
        short: 'ASR destek defterleri (Whisper, Gemma)',
        full: 'Konuşma tanıma çalışmalarını destekleyen, Whisper ve Gemma modellerini inceleyen bir defter koleksiyonu. ASR motorunu besleyen deneyleri, model karşılaştırmalarını ve boru hatlarını belgeleyerek.',
      },
    },
  },
  {
    slug: 'non-coder-chatbot',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Local Ollama AI chatbot & admin hub',
    status: 'published',
    technologies: ['Ollama'],
    capabilities: ['ai-ml', 'automation', 'nlp-speech'],
    locales: {
      en: {
        name: 'Non-Coder Chatbot',
        short: 'Local Ollama AI chatbot & admin hub',
        full: 'A local AI chatbot and admin hub powered by Ollama. It brings conversational AI to users who don’t write code and pairs it with an administrative surface for managing the assistant and its workflows.',
      },
      fa: {
        name: 'چت‌بات برای غیربرنامه‌نویسان',
        short: 'چت‌بات هوش مصنوعی محلی بر پایه‌ی Ollama و مرکز مدیریت',
        full: 'چت‌بات هوش مصنوعی و مرکز مدیریت محلی، به قدرت Ollama. هوش مصنوعی گفتگو را به کاربرانی که کد نمی‌نویسند می‌رساند و آن را با یک سطح مدیریتی برای مدیریت دستیار و فرایندهای آن همراه می‌کند.',
      },
      de: {
        name: 'Non-Coder-Chatbot',
        short: 'Lokaler Ollama-KI-Chatbot & Admin-Hub',
        full: 'Ein lokaler KI-Chatbot und Admin-Hub, angetrieben von Ollama. Er bringt Konversations-KI zu Nutzern, die keinen Code schreiben, und kombiniert sie mit einer Verwaltungsoberfläche, um den Assistenten und seine Workflows zu verwalten.',
      },
      tr: {
        name: 'Kod Yazmayanlar için Sohbet Botu',
        short: 'Yerel Ollama yapay zeka sohbet botu & yönetim merkezi',
        full: 'Ollama ile çalışan yerel bir yapay zeka sohbet botu ve yönetim merkezi. Konuşmacı yapay zekayı kod yazmayan kullanıcılara taşır; asistanı ve iş akışlarını yönetmek için bir yönetim yüzeyiyle birlikte gelir.',
      },
    },
  },
]
