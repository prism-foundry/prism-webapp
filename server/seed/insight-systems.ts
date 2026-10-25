import type { SeedProject } from './types.js'

/** 04-DATA-Insight-Systems — 5 projects (verbatim from the source PDF). */
export const INSIGHT_SYSTEMS: SeedProject[] = [
  {
    slug: 'customer-risk-assessment-db',
    category: '04-DATA-Insight-Systems',
    sourceDescription: 'Customer risk & AML (money-laundering) SQL database',
    status: 'published',
    technologies: ['SQL Server'],
    capabilities: ['fraud-risk', 'data-engineering'],
    locales: {
      en: {
        name: 'Customer Risk Assessment Database',
        short: 'Customer risk & AML (money-laundering) SQL database',
        full: 'A relational data layer for customer risk and AML (anti-money-laundering) assessment. It organizes customer, transaction and counterparty data into a structured SQL model that risk teams can query directly for screening, monitoring and reporting.',
      },
      fa: {
        name: 'پایگاه‌داده ارزیابی ریسک مشتری',
        short: 'پایگاه‌داده SQL ریسک مشتریان و مبارزه با پولشویی (AML)',
        full: 'لایه‌ی داده‌ای رابطه‌ای برای ارزیابی ریسک مشتریان و مبارزه با پولشویی (AML). داده‌های مشتری، تراکنش و طرف‌های معاملاتی را در یک مدل SQL منسجم سازمان‌دهی می‌کند تا تیم‌های ریسک بتوانند مستقیماً برای غربالگری، پایش و گزارش‌گیری بر آن استعلام بگیرند.',
      },
      de: {
        name: 'Kunden-Risiko-DB (AML)',
        short: 'SQL-Datenbank für Kundenrisiko und Geldwäsche (AML)',
        full: 'Eine relationale Datenbasis für die Kundenrisiko- und Geldwäscheprüfung (AML). Sie strukturiert Kundendaten, Transaktionen und Gegenparteien in einem SQL-Modell, auf das Risiko-Teams direkt für Screening, Überwachung und Berichterstattung zugreifen können.',
      },
      tr: {
        name: 'Müşteri Risk Değerlendirme Veritabanı',
        short: 'Müşteri riski ve AML (para aklama) SQL veritabanı',
        full: 'Müşteri riski ve para aklamayla mücadele (AML) değerlendirmesi için ilişkisel bir veri katmanı. Müşteri, işlem ve işlem karşıtı verilerini, risk ekiplerinin tarama, izleme ve raporlama amacıyla doğrudan sorgulayabildiği yapılandırılmış bir SQL modelinde düzenler.',
      },
    },
  },
  {
    slug: 'data-catalog',
    category: '04-DATA-Insight-Systems',
    sourceDescription: 'Data catalog / management-system documentation',
    status: 'published',
    technologies: [],
    capabilities: ['data-intelligence'],
    locales: {
      en: {
        name: 'Data Catalog',
        short: 'Data catalog / management-system documentation',
        full: 'Documentation of the data catalog and management system. It describes the available data assets, their structure and lineage, so analysts and engineers can locate and understand data before using it in reporting or modeling.',
      },
      fa: {
        name: 'فهرست داده',
        short: 'مستندات فهرست داده / سیستم مدیریت داده',
        full: 'مستندات فهرست داده و سیستم مدیریت داده. دارایی‌های داده موجود، ساختار و خاستگاه آن‌ها را شرح می‌دهد تا تحلیلگران و مهندسان پیش از استفاده در گزارش‌گیری یا مدل‌سازی، داده‌ها را بیابند و درک کنند.',
      },
      de: {
        name: 'Datenkatalog',
        short: 'Dokumentation zu Datenkatalog / Daten-Management-System',
        full: 'Dokumentation des Datenkatalogs und des Daten-Management-Systems. Sie beschreibt verfügbare Datenassets, deren Struktur und Herkunft, damit Analysten und Ingenieure Daten vor ihrem Einsatz in Berichten oder Modellen finden und verstehen können.',
      },
      tr: {
        name: 'Veri Kataloğu',
        short: 'Veri kataloğu / yönetim sistemi belgeleri',
        full: 'Veri kataloğu ve yönetim sisteminin belgelenmesi. Mevcut veri varlıklarını, yapılarını ve kökenlerini açıklar; analist ve mühendislerin raporlama veya modellemede kullanmadan önce veriyi bulup anlayabilmesini sağlar.',
      },
    },
  },
  {
    slug: 'github-daily-pulse',
    category: '04-DATA-Insight-Systems',
    sourceDescription: 'Daily trending-repo tracker (Python CLI)',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering'],
    locales: {
      en: {
        name: 'GitHub Daily Pulse',
        short: 'Daily trending-repo tracker (Python CLI)',
        full: 'A Python command-line tool that tracks daily trending repositories. It pulls, ranks and summarizes repository activity on a regular schedule, giving a compact daily "pulse" of what is moving in the open-source landscape.',
      },
      fa: {
        name: 'نبض روزانه گیت‌هاب',
        short: 'پیگیر روزانه‌ی مخازن پرترند (خط فرمان Python)',
        full: 'ابزاری خط‌فرمانی بر پایه‌ی Python که مخازن پرترند روزانه را پیگیری می‌کند. به‌صورت منظم فعالیت مخازن را دریافت، رتبه‌بندی و خلاصه می‌کند و نابی فشرده از روندهای روزانه‌ی فضای متن‌باز ارائه می‌دهد.',
      },
      de: {
        name: 'GitHub Daily Pulse',
        short: 'Täglicher Tracker für Trend-Repositories (Python-CLI)',
        full: 'Ein Python-Befehlszeilenwerkzeug, das täglich Trend-Repositories verfolgt. Es zieht regelmäßig Repository-Aktivitäten ab, stuft sie ein und fasst sie zusammen — ein kompakter täglicher „Puls" der Open-Source-Landschaft.',
      },
      tr: {
        name: 'GitHub Günlük Nabız',
        short: 'Günlük trend depo izleyicisi (Python CLI)',
        full: 'Günlük trend depoları izleyen bir Python komut satırı aracı. Depo faaliyetlerini düzenli olarak çeker, sıralar ve özetler; açık kaynak dünyasında neyin hareket ettiğine dair günlük, yoğun bir „nabız" sunar.',
      },
    },
  },
  {
    slug: 'money-laundry-report',
    category: '04-DATA-Insight-Systems',
    sourceDescription: 'AML report queries (Metabase)',
    status: 'published',
    technologies: ['Metabase'],
    capabilities: ['fraud-risk', 'data-intelligence'],
    locales: {
      en: {
        name: 'Money-Laundering Reports',
        short: 'AML report queries (Metabase)',
        full: 'A set of Metabase queries and reports for anti-money-laundering (AML) analysis. They turn underlying risk and transaction data into reviewable reports that support compliance and monitoring workflows.',
      },
      fa: {
        name: 'گزارش‌های مبارزه با پولشویی',
        short: 'استعلام‌های گزارش AML (Metabase)',
        full: 'مجموعه‌ای از استعلام‌ها و گزارش‌های Metabase برای تحلیل مبارزه با پولشویی (AML). داده‌های ریسک و تراکنش پایه را به گزارش‌های قابل بازبینی تبدیل می‌کند که فرایندهای انطباق و پایش را پشتیبانی می‌کند.',
      },
      de: {
        name: 'Geldwäsche-Berichte',
        short: 'AML-Berichtsanfragen (Metabase)',
        full: 'Eine Sammlung von Metabase-Anfragen und Berichten für die Geldwäscheanalyse (AML). Sie wandelt Basisdaten zu Risiko und Transaktionen in überprüfbare Berichte um, die Compliance- und Überwachungsprozesse unterstützen.',
      },
      tr: {
        name: 'Para Aklama Raporları',
        short: 'AML raporlama sorguları (Metabase)',
        full: 'Para aklamayla mücadele (AML) analizi için Metabase sorgu ve raporları. Temel risk ve işlem verilerini, uyumluluk ve izleme süreçlerini destekleyen incelemeye uygun raporlara dönüştürür.',
      },
    },
  },
  {
    slug: 'sima-db-report',
    category: '04-DATA-Insight-Systems',
    sourceDescription: 'Sima SQL reports & data warehouse',
    status: 'published',
    technologies: ['SQL Server'],
    capabilities: ['data-intelligence', 'predictive'],
    locales: {
      en: {
        name: 'Sima Reports & Data Warehouse',
        short: 'Sima SQL reports & data warehouse',
        full: 'SQL reports and a data warehouse for the Sima domain. It consolidates source data into a reporting layer and provides recurring SQL-based reports for operational and analytical use.',
      },
      fa: {
        name: 'گزارش‌ها و انبار داده سیمارغ',
        short: 'گزارش‌های SQL و انبار داده سیمارغ',
        full: 'گزارش‌های SQL و انبار داده برای حوزه‌ی سیمارغ. داده‌های مبدأ را در یک لایه‌ی گزارش‌دهی یکپارچه می‌کند و گزارش‌های دوره‌ای مبتنی بر SQL را برای استفاده‌های عملیاتی و تحلیلی در اختیار می‌گذارد.',
      },
      de: {
        name: 'Sima-Berichte & Data-Warehouse',
        short: 'Sima SQL-Berichte & Data-Warehouse',
        full: 'SQL-Berichte und ein Data-Warehouse für den Bereich „Sima". Es konsolidiert Quelldaten in eine Berichtsschicht und stellt wiederkehrende, SQL-basierte Berichte für operative und analytische Zwecke bereit.',
      },
      tr: {
        name: 'Sima Raporları & Veri Ambarı',
        short: 'Sima SQL raporları & veri ambarı',
        full: 'Sima alanı için SQL raporları ve bir veri ambarı. Kaynak verileri raporlama katmanında birleştirir ve operasyonel ve analitik kullanım için tekrarlayan, SQL tabanlı raporlar sunar.',
      },
    },
  },
]
