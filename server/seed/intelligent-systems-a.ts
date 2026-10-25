import type { SeedProject } from './types.js'

/** 04-DATA-Intelligent-Systems — projects 1–8 of 23. */
export const INTELLIGENT_SYSTEMS_A: SeedProject[] = [
  {
    slug: 'ai-notes-vault',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Research notes vault (market manipulation, robots)',
    status: 'published',
    technologies: [],
    capabilities: ['nlp-speech'],
    locales: {
      en: {
        name: 'AI Notes Vault',
        short: 'Research notes vault (market manipulation, robots)',
        full: 'A structured vault of research notes covering topics such as market manipulation and robotics. It organizes findings and references so knowledge accumulated across investigations can be retrieved and reused.',
      },
      fa: {
        name: 'واکوت یادداشت‌های هوش مصنوعی',
        short: 'واکوت یادداشت‌های پژوهشی (دستکاری بازار، رباتیک)',
        full: 'واکوتی ساختاریافته از یادداشت‌های پژوهشی در حوزه‌هایی مانند دستکاری بازار و رباتیک. یافته‌ها و مراجع را سازمان می‌دهد تا دانش کسب‌شده در طول تحقیقات بازپیدا و دوباره به‌کار رود.',
      },
      de: {
        name: 'KI-Notiz-Vault',
        short: 'Forschungsnotizen-Vault (Marktmanipulation, Robotik)',
        full: 'Ein strukturierter Vault für Forschungsnotizen zu Themen wie Marktmanipulation und Robotik. Er organisiert Erkenntnisse und Referenzen, damit über Untersuchungen hinweg angesammeltes Wissen wieder auffindbar und wiederverwendbar bleibt.',
      },
      tr: {
        name: 'Yapay Zeka Notlar Kasası',
        short: 'Araştırma notları kasası (piyasa manipülasyonu, robotik)',
        full: 'Piyasa manipülasyonu ve robotik gibi konuları kapsayan yapılandırılmış bir araştırma notu kasası. Bulguları ve referansları düzenler; araştırmalar boyunca biriken bilgiyi yeniden bulup kullanılabilecek hâle getirir.',
      },
    },
  },
  {
    slug: 'algo-trade-detector',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Algorithmic / manipulative trade detector (mean-shift)',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['fraud-risk', 'ai-ml', 'predictive'],
    locales: {
      en: {
        name: 'Algorithmic Trade Detector',
        short: 'Algorithmic / manipulative trade detector (mean-shift)',
        full: 'A detection system for algorithmic and manipulative trading behavior. It applies mean-shift analysis to transaction patterns to surface anomalous clusters that may indicate manipulation, feeding risk and compliance review.',
      },
      fa: {
        name: 'تشخیص‌گر معاملات الگوریتمی',
        short: 'تشخیص‌گر معاملات الگوریتمی / دستکاری‌شده (mean-shift)',
        full: 'سامانه‌ای برای شناسایی رفتارهای معاملاتی الگوریتمی و دستکاری‌شده. با تحلیل mean-shift روی الگوهای تراکنش، خوشه‌های غیرعادی که ممکن است نشانه‌ی دستکاری باشد نمایان می‌کند و بازبینی ریسک و انطباق را پشتیبانی می‌کند.',
      },
      de: {
        name: 'Algorithmic-Trade-Detector',
        short: 'Erkennung algorithmischer / manipulativer Trades (Mean-Shift)',
        full: 'Ein Erkennungssystem für algorithmisches und manipulatives Handelsverhalten. Es wendet Mean-Shift-Analyse auf Transaktionsmuster an, um anomale Cluster zu offenbaren, die auf Manipulation hindeuten können — eine Basis für Risiko- und Compliance-Prüfung.',
      },
      tr: {
        name: 'Algoritmik İşlem Tespitçisi',
        short: 'Algoritmik / manipülatif işlem tespit edicisi (mean-shift)',
        full: 'Algoritmik ve manipülatif işlem davranışlarını tespit eden bir sistem. İşlem kalıplarına mean-shift analizi uygulayarak manipülasyona işaret edebilecek anormal kümeleri ortaya çıkarır; risk ve uyumluluk incelemesini besler.',
      },
    },
  },
  {
    slug: 'api-token-manager',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'OpenAI-compatible vLLM API gateway (Convertot)',
    status: 'published',
    technologies: ['vLLM'],
    capabilities: ['ai-infra', 'ai-ml'],
    locales: {
      en: {
        name: 'API Token Manager',
        short: 'OpenAI-compatible vLLM API gateway (Convertot)',
        full: 'An API gateway built on vLLM that exposes an OpenAI-compatible interface (project “Convertot”). It handles token management and request routing for self-hosted large language models, letting existing OpenAI-style clients point at local model serving.',
      },
      fa: {
        name: 'مدیر توکن API',
        short: 'دروازه API سازگار با OpenAI بر پایه‌ی vLLM (Convertot)',
        full: 'دروازه‌ی API ساخت‌شده بر پایه‌ی vLLM که یک روبروِ سازگار با OpenAI را در دسترس می‌گذارد (پروژه‌ی «Convertot»). مدیریت توکن و مسیریابی درخواست برای مدل‌های زبانی بزرگ میزبان‌محلی را بر عهده دارد تا کارکن‌های سبک OpenAI بتوانند به سرویس‌دهی محلی مدل اشاره کنند.',
      },
      de: {
        name: 'API-Token-Manager',
        short: 'OpenAI-kompatibles vLLM-API-Gateway (Convertot)',
        full: 'Ein auf vLLM aufsetzendes API-Gateway mit OpenAI-kompatibler Schnittstelle (Projekt „Convertot“). Es verwaltet Tokens und leitet Anfragen an selbst gehostete große Sprachmodelle weiter, damit bestehende OpenAI-Style-Clients auf lokale Modell-Serving zugreifen können.',
      },
      tr: {
        name: 'API Jeton Yöneticisi',
        short: 'OpenAI uyumlu vLLM API geçidi (Convertot)',
        full: 'vLLM üzerine kurulu, OpenAI ile uyumlu bir arayüz sunan API geçidi („Convertot” projesi). Kendi barındırılan büyük dil modelleri için jeton yönetimi ve istek yönlendirmesini üstlenir; mevcut OpenAI tarzı istemcilerin yerel model sunumuna yönelmesine olanak tanır.',
      },
    },
  },
  {
    slug: 'callcenter-extractor-engine',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'LLM-based call-center transcript extraction',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['nlp-speech', 'automation'],
    locales: {
      en: {
        name: 'Call Center Extraction Engine',
        short: 'LLM-based call-center transcript extraction',
        full: 'An LLM-based engine that extracts structured information from call-center transcripts. It identifies intents, entities and key facts in conversations, turning free-text call records into queryable, downstream-ready data.',
      },
      fa: {
        name: 'موتور استخراج مرکز تماس',
        short: 'استخراج متن مکالمات مرکز تماس بر پایه‌ی LLM',
        full: 'موتوری مبتنی بر مدل زبانی بزرگ که اطلاعات ساختاریافته را از متن مکالمات مرکز تماس استخراج می‌کند. نیت‌ها، موجودیت‌ها و نکات کلیدی گفت‌وگوها را شناسایی کرده و سوابق متنی تماس را به داده‌ای قابل استعلام و آماده‌ی مصرف تبدیل می‌کند.',
      },
      de: {
        name: 'Call-Center-Extraktionsengine',
        short: 'LLM-basierte Transkript-Extraktion im Call-Center',
        full: 'Eine LLM-basierte Engine, die strukturierte Informationen aus Call-Center-Transkripten extrahiert. Sie erkennt Intentionen, Entitäten und Schlüsselfakten in Gesprächen und wandelt freie Gesprächstexte in abfragbare, weiterverwendbare Daten um.',
      },
      tr: {
        name: 'Müşteri Hattı Çıkarım Motoru',
        short: 'LLM tabanlı müşteri hattı transkript çıkarma',
        full: 'Müşteri hattı transkriptlerinden yapılandırılmış bilgi çıkaran LLM tabanlı bir motor. Konuşmalardaki niyetleri, varlıkları ve ana faktörleri tespit edip serbest metin görüşme kayıtlarını sorgulanabilir, kullanıma hazır veriye dönüştürür.',
      },
    },
  },
  {
    slug: 'car-plate-detector',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Iranian plate & vehicle detection + OCR (YOLOv8)',
    status: 'published',
    technologies: ['YOLOv8'],
    capabilities: ['cv-ocr'],
    locales: {
      en: {
        name: 'Car Plate Detector',
        short: 'Iranian plate & vehicle detection + OCR (YOLOv8)',
        full: 'A vision system for detecting Iranian license plates and vehicles, combined with OCR to read the plate text. It is built on YOLOv8 for real-time object detection and targets surveillance and vehicle-management use cases.',
      },
      fa: {
        name: 'تشخیص‌گر پلاک خودرو',
        short: 'تشخیص پلاک و خودروی ایرانی + OCR (YOLOv8)',
        full: 'سامانه‌ی بینایی برای تشخیص پلاک‌ها و خودروهای ایرانی به همراه OCR برای خواندن متن پلاک. بر پایه‌ی YOLOv8 برای تشخیص شیء بلادرنگ ساخته شده و برای مصارف نظارتی و مدیریت خودرو به‌کار می‌رود.',
      },
      de: {
        name: 'Kennzeichen-Erkennung',
        short: 'Iranische Kennzeichen- & Fahrzeugerkennung + OCR (YOLOv8)',
        full: 'Ein Visionssystem zur Erkennung iranischer Kennzeichen und Fahrzeuge, kombiniert mit OCR zum Einlesen des Kennzeichentexts. Es basiert auf YOLOv8 für Echtzeit-Objekterkennung und zielt auf Überwachungs- und Fahrzeugverwaltungsanwendungen.',
      },
      tr: {
        name: 'Plaka Tespitçisi',
        short: 'İran plakası & araç tespiti + OCR (YOLOv8)',
        full: 'İran plakalarını ve araçlarını tespit edip OCR ile plaka metnini okuyan bir görü sistemi. Gerçek zamanlı nesne tespiti için YOLOv8 üzerine kurulu; gözetim ve araç yönetimi kullanım alanlarını hedefler.',
      },
    },
  },
  {
    slug: 'contract-ocr-engine',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Contract OCR & field extraction',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['cv-ocr', 'nlp-speech', 'automation'],
    locales: {
      en: {
        name: 'Contract OCR Engine',
        short: 'Contract OCR & field extraction',
        full: 'An engine that reads contracts via OCR and extracts structured fields from the document. It digitizes paper or scanned contracts and pulls out named fields, making agreement data searchable and usable downstream.',
      },
      fa: {
        name: 'موتور OCR قرارداد',
        short: 'OCR قرارداد و استخراج فیلدها',
        full: 'موتوری که قراردادهای کاغذی یا اسکن‌شده را با OCR خوانده و فیلدهای ساختاریافته را از مستند استخراج می‌کند. داده‌ی قرارداد را دیجیتال و قابل جستجو و مصرف در لایه‌های بعدی می‌کند.',
      },
      de: {
        name: 'Vertrags-OCR-Engine',
        short: 'Vertrags-OCR & Feld-Extraktion',
        full: 'Eine Engine, die Verträge per OCR einliest und strukturierte Felder aus dem Dokument extrahiert. Sie digitalisiert gedruckte oder gescannte Verträge und zieht benannte Felder heraus, damit Vertragsdaten durchsuchbar und weiterverwendbar werden.',
      },
      tr: {
        name: 'Sözleşme OCR Motoru',
        short: 'Sözleşme OCR & alan çıkarımı',
        full: 'Sözleşmeleri OCR ile okuyup belgeden yapılandırılmış alanları çıkaran bir motor. Kâğıt veya taranmış sözleşmeleri dijitalleştirip adlandırılmış alanları ayıklar; sözleşme verisini aranabilir ve kullanıma hazır hâle getirir.',
      },
    },
  },
  {
    slug: 'customer-risk-assessment-engine',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Customer risk-scoring engine (Python)',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['fraud-risk', 'ai-ml'],
    locales: {
      en: {
        name: 'Customer Risk Assessment Engine',
        short: 'Customer risk-scoring engine (Python)',
        full: 'A Python engine that scores customer risk. It combines customer, behavioral and risk signals into a quantitative risk score that helps prioritize monitoring and review effort.',
      },
      fa: {
        name: 'موتور ارزیابی ریسک مشتری',
        short: 'موتور نمره‌گذاری ریسک مشتری (Python)',
        full: 'موتوری بر پایه‌ی Python که به مشتریان نمره‌ی ریسک می‌دهد. سیگنال‌های مشتری، رفتاری و ریسک را در یک نمره‌ی کمّی ریسک ادغام می‌کند تا اولویت‌بندی پایش و بازبینی را تسهیل کند.',
      },
      de: {
        name: 'Kunden-Risikobewertungs-Engine',
        short: 'Kunden-Risk-Scoring-Engine (Python)',
        full: 'Eine Python-Engine, die Kundenrisiken bewertet. Sie kombiniert Kunden-, Verhaltens- und Risikosignale zu einem quantitativen Risikoscore, um Überwachungs- und Prüfungsanstrengungen priorisieren zu können.',
      },
      tr: {
        name: 'Müşteri Risk Değerlendirme Motoru',
        short: 'Müşteri risk puanlama motoru (Python)',
        full: 'Müşterilere risk puanı veren Python tabanlı bir motor. Müşteri, davranış ve risk sinyallerini niceliksel bir risk puanında birleştirerek izleme ve inceleme çabasının önceliklendirilmesine yardımcı olur.',
      },
    },
  },
  {
    slug: 'data-quality-toolkit',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Pandas data-quality & profiling toolkit',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering'],
    locales: {
      en: {
        name: 'Data Quality Toolkit',
        short: 'Pandas data-quality & profiling toolkit',
        full: 'A pandas-based toolkit for data quality and profiling. It inspects datasets for completeness, consistency and anomalies, and produces profiling reports that help teams trust and prepare data before modeling.',
      },
      fa: {
        name: 'جعبه‌ابزار کیفیت داده',
        short: 'جعبه‌ابزار کیفیت و پروفایل‌بندی داده بر پایه‌ی pandas',
        full: 'جعبه‌ابزاری بر پایه‌ی pandas برای کیفیت و پروفایل‌بندی داده. مجموعه‌های داده را از نظر کامل بودن، انسجام و ناهنجاری‌ها بازرسی کرده و گزارش‌های پروفایل می‌سازد تا تیم‌ها پیش از مدل‌سازی به داده اعتماد کرده و آن را آماده کنند.',
      },
      de: {
        name: 'Datenqualitäts-Toolkit',
        short: 'Pandas-Toolkit für Datenqualität & -profilierung',
        full: 'Ein pandas-basiertes Toolkit für Datenqualität und -profilierung. Es prüft Datensätze auf Vollständigkeit, Konsistenz und Anomalien und erstellt Profilberichte, damit Teams Daten vor dem Modeling vertrauen und aufbereiten können.',
      },
      tr: {
        name: 'Veri Kalitesi Aracı',
        short: 'Pandas veri kalitesi ve profil aracı',
        full: 'Veri kalitesi ve profilleme için pandas tabanlı bir araç seti. Veri kümelerini eksiksizlik, tutarlılık ve anomaliler açısından inceler; ekiplerin modellemeden önce veriye güvenip hazırlamasına yardımcı olan profil raporları üretir.',
      },
    },
  },
]
