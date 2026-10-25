import type { SeedProject } from './types.js'

/** 06-EDGE-Data-Gathering-Systems — 7 projects (verbatim from the source PDF). */
export const EDGE_GATHERING: SeedProject[] = [
  {
    slug: 'ice-data-collector',
    category: '06-EDGE-Data-Gathering-Systems',
    sourceDescription: 'ICE.ir commodity-price web scraper',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering'],
    locales: {
      en: {
        name: 'ICE Data Collector',
        short: 'ICE.ir commodity-price web scraper',
        full: 'A web scraper that collects commodity prices from ICE.ir. It retrieves, parses and stores price data on a schedule, building a reliable source for commodity price analysis.',
      },
      fa: {
        name: 'مجموعه‌کننده‌ی داده ICE',
        short: 'اسکرپر قیمت کالایی ICE.ir',
        full: 'اسکرپری که قیمت‌های کالایی را از ICE.ir جمع‌آوری می‌کند. داده‌های قیمت را به‌صورت دوره‌ای دریافت، تجزیه و ذخیره می‌کند و منبعی قابل اتکا برای تحلیل قیمت کالایی می‌سازد.',
      },
      de: {
        name: 'ICE-Daten-Sammler',
        short: 'Web-Scraper für Rohstoffpreise (ICE.ir)',
        full: 'Ein Web-Scraper, der Rohstoffpreise von ICE.ir sammelt. Er ruft Preisdaten regelmäßig ab, parst und speichert sie und baut damit eine verlässliche Quelle für die Rohstoffpreisanalyse.',
      },
      tr: {
        name: 'ICE Veri Toplayıcı',
        short: 'ICE.ir emtia fiyat web kazıyıcısı',
        full: 'ICE.ir üzerinden emtia fiyatlarını toplayan bir web kazıyıcısı. Fiyat verilerini düzenli olarak çeker, ayrıştırır ve saklar; emtia fiyat analizi için güvenilir bir kaynak oluşturur.',
      },
    },
  },
  {
    slug: 'iran-household-data',
    category: '06-EDGE-Data-Gathering-Systems',
    sourceDescription: 'Iranian household indicators dataset (World Bank)',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering'],
    locales: {
      en: {
        name: 'Iran Household Data',
        short: 'Iranian household indicators dataset (World Bank)',
        full: 'A dataset of Iranian household indicators sourced from the World Bank. It compiles and structures the data so it can be used in economic and demographic analysis.',
      },
      fa: {
        name: 'داده‌های خانوار ایران',
        short: 'مجموعه‌داده شاخص‌های خانوار ایران (بانک جهانی)',
        full: 'مجموعه‌داده‌ای از شاخص‌های خانوار ایران، تهیه‌شده از بانک جهانی. داده‌ها را گردآوری و ساختار می‌دهد تا در تحلیل‌های اقتصادی و جمعیت‌شناسی قابل استفاده باشد.',
      },
      de: {
        name: 'Iran-Haushaltsdaten',
        short: 'Dataset iranischer Haushaltsindikatoren (Weltbank)',
        full: 'Ein Dataset iranischer Haushaltsindikatoren, bezogen von der Weltbank. Es sammelt und strukturiert die Daten, damit sie in der wirtschaftlichen und demografischen Analyse verwendet werden können.',
      },
      tr: {
        name: 'İran Hanehalk Verileri',
        short: 'İran hanehalk göstergeleri veri seti (Dünya Bankası)',
        full: "Dünya Bankası'ndan kaynaklanan İran hanehalk göstergeleri veri seti. Verileri derleyip yapılandırır; ekonomi ve demografi analizinde kullanılabilsin.",
      },
    },
  },
  {
    slug: 'iran-inflation-data',
    category: '06-EDGE-Data-Gathering-Systems',
    sourceDescription: 'Iran inflation data extraction package (WB/IMF/CBI)',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering'],
    locales: {
      en: {
        name: 'Iran Inflation Data',
        short: 'Iran inflation data extraction package (WB/IMF/CBI)',
        full: 'A package for extracting Iran inflation data from the World Bank, IMF and the Central Bank of Iran. It pulls and harmonizes inflation indicators into a consistent, analysis-ready form.',
      },
      fa: {
        name: 'داده‌های تورم ایران',
        short: 'بسته‌ی استخراج داده‌های تورم ایران (WB/IMF/CBI)',
        full: 'بسته‌ای برای استخراج داده‌های تورم ایران از بانک جهانی، صندوق بین‌المللی پول و بانک مرکزی ایران. شاخص‌های تورم را دریافت و یکدست می‌کند تا در شکلی منسجم و آماده‌ی تحلیل قرار گیرد.',
      },
      de: {
        name: 'Iran-Inflationsdaten',
        short: 'Paket zur Extraktion iranischer Inflationsdaten (WB/IMF/CBI)',
        full: 'Ein Paket zur Extraktion von Iran-Inflationsdaten aus Weltbank, IWF und der Zentralbank Irans. Es zieht Inflationsindikatoren ab und harmonisiert sie zu einer konsistenten, analysereifen Form.',
      },
      tr: {
        name: 'İran Enflasyon Verileri',
        short: 'İran enflasyon veri çıkarma paketi (DB/IMF/TCMB)',
        full: 'Dünya Bankası, IMF ve İran Merkez Bankası’ndan İran enflasyon verilerini çıkaran bir paket. Enflasyon göstergelerini çekip uyumlulaştırır; tutarlı ve analize hazır bir forma dönüştürür.',
      },
    },
  },
  {
    slug: 'multi-rate-scraper',
    category: '06-EDGE-Data-Gathering-Systems',
    sourceDescription: 'Multi-currency & market-rate scraper (tgju.org)',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering'],
    locales: {
      en: {
        name: 'Multi-Rate Scraper',
        short: 'Multi-currency & market-rate scraper (tgju.org)',
        full: 'A scraper for multi-currency and market rates from tgju.org. It collects exchange and market rates across currencies and stores them as a time series for analysis and comparison.',
      },
      fa: {
        name: 'اسکرپر نرخ‌های چند ارز',
        short: 'اسکرپر نرخ‌های چند ارز و بازار (tgju.org)',
        full: 'اسکرپری برای نرخ‌های چند ارز و بازار از tgju.org. نرخ‌های ارز و بازار را در چند ارز جمع‌آوری و به‌صورت سری زمانی ذخیره می‌کند تا برای تحلیل و مقایسه استفاده شود.',
      },
      de: {
        name: 'Multi-Rate-Scraper',
        short: 'Scraper für Multi-Währungs- & Marktkurse (tgju.org)',
        full: 'Ein Scraper für Multi-Währungs- und Marktkurse von tgju.org. Er sammelt Wechsel- und Marktkurse über Währungen hinweg und speichert sie als Zeitreihe für Analyse und Vergleich.',
      },
      tr: {
        name: 'Çoklu Kur Kazıyıcısı',
        short: 'Çoklu para birimi & piyasa kuru kazıyıcısı (tgju.org)',
        full: 'tgju.org üzerinden çoklu para birimi ve piyasa kurlarını kazıyan bir kazıyıcı. Paralar arası döviz ve piyasa kurlarını toplayıp analiz ve karşılaştırma için zaman serisi olarak saklar.',
      },
    },
  },
  {
    slug: 'pmi-analyzer',
    category: '06-EDGE-Data-Gathering-Systems',
    sourceDescription: 'Iran PMI (Shamkh) analysis package',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering', 'data-intelligence'],
    locales: {
      en: {
        name: 'PMI Analyzer',
        short: 'Iran PMI (Shamkh) analysis package',
        full: 'An analysis package for the Iran Purchasing Managers Index (PMI), referencing the Shamkh index. It organizes PMI data and provides analysis for understanding economic activity signals.',
      },
      fa: {
        name: 'تحلیل‌گر PMI',
        short: 'بسته‌ی تحلیل PMI ایران (شامخ)',
        full: 'بسته‌ای برای تحلیل شاخص مدیران خرید (PMI) ایران با ارجاع به شاخص شامخ. داده‌های PMI را سازمان می‌دهد و برای درک سیگنال‌های فعالیت اقتصادی تحلیل ارائه می‌دهد.',
      },
      de: {
        name: 'PMI-Analysator',
        short: 'Analyse-Paket für den Iran-PMI (Shamkh)',
        full: 'Ein Analyse-Paket für den iranischen Einkaufsmanagerindex (PMI) mit Bezug auf den Shamkh-Index. Es organisiert PMI-Daten und stellt Analysen bereit, um Signale der wirtschaftlichen Aktivität zu verstehen.',
      },
      tr: {
        name: 'PMI Analizörü',
        short: 'İran PMI (Shamkh) analiz paketi',
        full: 'Shamkh endeksine atıfta bulunan, İran Satınalma Yöneticileri Endeksi (PMI) için bir analiz paketi. PMI verilerini düzenler ve ekonomik aktivite sinyallerini anlamak için analiz sunar.',
      },
    },
  },
  {
    slug: 'tgju-data-collector',
    category: '06-EDGE-Data-Gathering-Systems',
    sourceDescription: 'tgju.org market-rate data collector',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering'],
    locales: {
      en: {
        name: 'TGJU Data Collector',
        short: 'tgju.org market-rate data collector',
        full: 'A data collector for market rates from tgju.org. It gathers and persists market-rate data over time, forming a dependable feed for rate monitoring and downstream use.',
      },
      fa: {
        name: 'مجموعه‌کننده‌ی داده TGJU',
        short: 'مجموعه‌کننده‌ی داده نرخ بازار tgju.org',
        full: 'مجموعه‌کننده‌ای برای داده‌های نرخ بازار از tgju.org. داده‌های نرخ بازار را در طول زمان جمع‌آوری و پایدار می‌کند و خوراک قابل اتقایی برای پایش نرخ‌ها و استفاده‌های بعدی تشکیل می‌دهد.',
      },
      de: {
        name: 'TGJU-Daten-Sammler',
        short: 'Daten-Sammler für Marktkurse (tgju.org)',
        full: 'Ein Daten-Sammler für Marktkurse von tgju.org. Er erfasst und speichert Marktkursdaten über die Zeit und bildet damit eine verlässliche Versorgung für Kursüberwachung und nachgelagerte Nutzung.',
      },
      tr: {
        name: 'TGJU Veri Toplayıcı',
        short: 'tgju.org piyasa kuru veri toplayıcısı',
        full: 'tgju.org üzerinden piyasa kuru verilerini toplayan bir veri toplayıcı. Piyasa kuru verilerini zaman içinde toplayıp kalıcı olarak saklar; kuru izleme ve sonraki kullanım için güvenilir bir besleme oluşturur.',
      },
    },
  },
  {
    slug: 'wikiplast-scraper',
    category: '06-EDGE-Data-Gathering-Systems',
    sourceDescription: 'WikiPlast plastics/petrochemical stealth scraper',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering'],
    locales: {
      en: {
        name: 'WikiPlast Scraper',
        short: 'WikiPlast plastics/petrochemical stealth scraper',
        full: 'A stealth web scraper for WikiPlast covering plastics and petrochemical data. It collects data quietly and reliably, respecting rate limits, to build a dataset for plastics and petrochemical market analysis.',
      },
      fa: {
        name: 'اسکرپر WikiPlast',
        short: 'اسکرپر مخفی پلاستیک/پتروشیمی WikiPlast',
        full: 'اسکرپر وب مخفی برای WikiPlast که داده‌های پلاستیک و پتروشیمی را پوشش می‌دهد. داده را به‌صورت کم‌صدا و قابل اتکا و با رعایت محدودیت‌های نرخ جمع‌آوری می‌کند تا مجموعه‌داده‌ای برای تحلیل بازار پلاستیک و پتروشیمی بسازد.',
      },
      de: {
        name: 'WikiPlast-Scraper',
        short: 'Stealth-Scraper für Plastics/Petrochemie (WikiPlast)',
        full: 'Ein Stealth-Web-Scraper für WikiPlast, der Kunststoff- und Petrochemie-Daten abdeckt. Er sammelt Daten unauffällig und zuverlässig unter Berücksichtigung von Ratenbegrenzungen und baut damit ein Dataset für die Marktanalyse von Kunststoff und Petrochemie.',
      },
      tr: {
        name: 'WikiPlast Kazıyıcısı',
        short: 'WikiPlast plastik/petrokimya gizli kazıyıcısı',
        full: 'Plastik ve petrokimya verilerini kapsayan WikiPlast için gizli bir web kazıyıcısı. Veriyi sessiz ve güvenilir biçimde, oran sınırlarına uyarak toplar; plastik ve petrokimya piyasa analizi için veri seti oluşturur.',
      },
    },
  },
]
