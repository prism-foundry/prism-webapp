import type { SeedProject } from './types.js'

/** 04-DATA-Intelligent-Systems — projects 9–16 of 23. */
export const INTELLIGENT_SYSTEMS_B: SeedProject[] = [
  {
    slug: 'demand-estimation',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Demand estimation (cement sector)',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['predictive', 'ai-ml'],
    locales: {
      en: {
        name: 'Demand Estimation',
        short: 'Demand estimation (cement sector)',
        full: 'A modeling effort to estimate demand in the cement sector. It builds statistical and ML models over market and production data to project future demand, supporting planning and inventory decisions.',
      },
      fa: {
        name: 'تخمین تقاضا',
        short: 'تخمین تقاضا (صنعت سیمان)',
        full: 'کار مدل‌سازی برای تخمین تقاضا در صنعت سیمان. با داده‌های بازار و تولید، مدل‌های آماری و یادگیری ماشین می‌سازد تا تقاضای آینده را پیش‌بینی کند و تصمیم‌های برنامه‌ریزی و موجودی را پشتیبانی کند.',
      },
      de: {
        name: 'Nachfrage-Schätzung',
        short: 'Nachfrageschätzung (Zementsektor)',
        full: 'Eine Modellierung zur Schätzung der Nachfrage im Zementsektor. Sie baut statistische und ML-Modelle auf Basis von Markt- und Produktionsdaten, um zukünftige Nachfrage vorherzusagen und Planungs- und Bestandsentscheidungen zu stützen.',
      },
      tr: {
        name: 'Talep Tahmini',
        short: 'Talep tahmini (çimento sektörü)',
        full: 'Çimento sektöründe talebi tahmin etmek için bir modelleme çalışması. Piyasa ve üretim verileri üzerinde istatistiksel ve ML modelleri kurarak gelecekteki talebi öngörür; planlama ve stok kararlarını destekler.',
      },
    },
  },
  {
    slug: 'distribution-fitter-engine',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Statistical distribution-fitting library (DistFit Pro)',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['predictive'],
    locales: {
      en: {
        name: 'Distribution Fitter Engine',
        short: 'Statistical distribution-fitting library (DistFit Pro)',
        full: 'A statistical library for fitting probability distributions to data (product “DistFit Pro”). It selects and fits candidate distributions, estimates their parameters and goodness-of-fit, and is designed to be embedded in downstream analysis.',
      },
      fa: {
        name: 'موتور برازش توزیع',
        short: 'کتابخانه‌ی برازش توزیع‌های آماری (DistFit Pro)',
        full: 'کتابخانه‌ی آماری برای برازش توزیع‌های احتمال به داده (محصول «DistFit Pro»). توزیع‌های نامزد را انتخاب و می‌بازند، پارامترها و مقدار برازش را تخمین می‌زند و برای استفاده در تحلیل‌های بعدی طراحی شده است.',
      },
      de: {
        name: 'Verteilungs-Engine',
        short: 'Statistische Verteilungs-Fitting-Bibliothek (DistFit Pro)',
        full: 'Eine statistische Bibliothek zum Fitten von Wahrscheinlichkeitsverteilungen an Daten (Produkt „DistFit Pro“). Sie wählt und passt Kandidaten-Verteilungen an, schätzt deren Parameter und Goodness-of-Fit und ist zur Einbettung in nachgelagerte Analysen gedacht.',
      },
      tr: {
        name: 'Dağılım Sığdırma Motoru',
        short: 'İstatistiksel dağılım sığdırma kütüphanesi (DistFit Pro)',
        full: 'Olasılık dağılımlarını verilere sığdıran istatistiksel bir kütüphane („DistFit Pro” ürünü). Aday dağılımları seçip sığdırır, parametreleri ve uyum ölçüsünü tahmin eder; sonraki analizlere gömülmek üzere tasarlanmıştır.',
      },
    },
  },
  {
    slug: 'fraud-graph-hawk',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Graph-based fraud detection (Neo4j + SQL)',
    status: 'published',
    technologies: ['Neo4j', 'SQL Server'],
    capabilities: ['fraud-risk', 'data-engineering'],
    locales: {
      en: {
        name: 'Fraud Graph Hawk',
        short: 'Graph-based fraud detection (Neo4j + SQL)',
        full: 'A graph-based fraud-detection system combining Neo4j with SQL. It models entities and their relationships as a graph to reveal hidden connections, rings and anomalous patterns that tabular analysis tends to miss.',
      },
      fa: {
        name: 'سامانه‌ی کشف تقلب گرافیکی',
        short: 'کشف تقلب مبتنی بر گراف (Neo4j + SQL)',
        full: 'سامانه‌ی کشف تقلب مبتنی بر گراف که Neo4j را با SQL ترکیب می‌کند. موجودیت‌ها و روابط آن‌ها را به‌صورت گراف مدل می‌کند تا پیوندهای پنهان، حلقه‌ها و الگوهای غیرعادی را که با تحلیل جدولی معمولاً از دست می‌روند، نمایان کند.',
      },
      de: {
        name: 'Fraud-Graph-Hawk',
        short: 'Grafbasierte Betrugserkennung (Neo4j + SQL)',
        full: 'Ein grafbasiertes Betrugserkennungssystem, das Neo4j mit SQL kombiniert. Es modelliert Entitäten und deren Beziehungen als Graph, um verborgene Verbindungen, Ringschläge und anomale Muster aufzudecken, die eine tabellarische Analyse oft übersieht.',
      },
      tr: {
        name: 'Dolandırıcılık Graf Ağcisi',
        short: 'Graf tabanlı dolandırıcılık tespiti (Neo4j + SQL)',
        full: 'Neo4j’yi SQL ile birleştiren graf tabanlı bir dolandırıcılık tespit sistemi. Varlıkları ve ilişkilerini bir graf olarak modeller; tablo bazlı analizle kaçırılan gizli bağlantıları, çemberleri ve anormal örüntüleri ortaya çıkarır.',
      },
    },
  },
  {
    slug: 'llm-site-generator',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'LLM-powered HTML site generator (Ollama)',
    status: 'published',
    technologies: ['Ollama'],
    capabilities: ['ai-ml', 'automation'],
    locales: {
      en: {
        name: 'LLM Site Generator',
        short: 'LLM-powered HTML site generator (Ollama)',
        full: 'A generator that uses a local LLM via Ollama to produce HTML sites from a description or prompt. It demonstrates how self-hosted language models can drive content and layout generation end to end.',
      },
      fa: {
        name: 'تولیدکننده‌ی سایت با LLM',
        short: 'تولیدکننده‌ی سایت HTML با LLM (Ollama)',
        full: 'تولیدکننده‌ای که از طریق Ollama از یک مدل زبانی بزرگ میزبان‌محلی استفاده می‌کند تا از روی توصیف یا دستور، سایت‌های HTML بسازد. نشان می‌دهد مدل‌های زبانی میزبان‌محلی چگونه می‌توانند تولید محتوا و چیدمان را به‌صورت سرتاسری هدایت کنند.',
      },
      de: {
        name: 'LLM-Site-Generator',
        short: 'LLM-basierter HTML-Site-Generator (Ollama)',
        full: 'Ein Generator, der ein lokal gehostetes LLM über Ollama nutzt, um HTML-Seiten aus einer Beschreibung oder einem Prompt zu erzeugen. Er zeigt, wie selbst gehostete Sprachmodelle Inhalts- und Layout-Generierung durchgängig steuern können.',
      },
      tr: {
        name: 'LLM Site Üretici',
        short: 'LLM destekli HTML site üreticisi (Ollama)',
        full: 'Ollama üzerinden yerel bir LLM kullanarak bir açıklama veya istemden HTML site üreten bir üretici. Kendi barındırılan dil modellerinin içerik ve yerleşim üretimini uçtan uca nasıl sürdürebileceğini gösterir.',
      },
    },
  },
  {
    slug: 'market-fraud-detector',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Stock-market manipulation detection',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['fraud-risk', 'predictive'],
    locales: {
      en: {
        name: 'Market Fraud Detector',
        short: 'Stock-market manipulation detection',
        full: 'A system for detecting manipulation in the stock market. It analyzes price, volume and order-flow signals to flag patterns consistent with manipulative trading, supporting market surveillance.',
      },
      fa: {
        name: 'تشخیص‌گر تقلب بازار',
        short: 'تشخیص دستکاری بازار سهام',
        full: 'سامانه‌ای برای تشخیص دستکاری در بازار سهام. سیگنال‌های قیمت، حجم و جریان سفارش را تحلیل می‌کند تا الگوهای هم‌راستا با معاملات دستکاری‌شده را علامت بزند و پایش بازار را پشتیبانی کند.',
      },
      de: {
        name: 'Markt-Betrug-Detector',
        short: 'Erkennung von Marktmanipulation am Aktienmarkt',
        full: 'Ein System zur Erkennung von Manipulation am Aktienmarkt. Es analysiert Preis-, Volumen- und Orderfluss-Signale, um Muster zu kennzeichnen, die mit manipulativem Handel einhergehen, und stützt damit die Marktüberwachung.',
      },
      tr: {
        name: 'Piyasa Dolandırıcılığı Tespitçisi',
        short: 'Hisse senedi piyasası manipülasyonu tespiti',
        full: 'Hisse senedi piyasasında manipülasyonu tespit eden bir sistem. Fiyat, hacim ve emir akışı sinyallerini analiz ederek manipülatif işlemle tutarlı örüntüleri işaretler; piyasa gözetimini destekler.',
      },
    },
  },
  {
    slug: 'meanshift-cpp',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'C++ mean-shift clustering library',
    status: 'published',
    technologies: ['C++'],
    capabilities: ['ai-ml', 'predictive'],
    locales: {
      en: {
        name: 'Mean-Shift C++',
        short: 'C++ mean-shift clustering library',
        full: 'A C++ library implementing mean-shift clustering. It provides a performant, low-level implementation of the algorithm that can be embedded in larger systems or exposed through higher-level tooling.',
      },
      fa: {
        name: 'Mean-Shift نسخه C++',
        short: 'کتابخانه‌ی خوشه‌بندی mean-shift به C++',
        full: 'کتابخانه‌ای به C++ که خوشه‌بندی mean-shift را پیاده‌سازی می‌کند. یک پیاده‌سازی کارآمد و کم‌لایه از الگوریتم ارائه می‌دهد که در سامانه‌های بزرگ‌تر قابل استفاده است یا از طریق ابزارهای بالاتر در دسترس می‌شود.',
      },
      de: {
        name: 'Mean-Shift C++',
        short: 'C++-Mean-Shift-Clustering-Bibliothek',
        full: 'Eine C++-Bibliothek, die Mean-Shift-Clustering implementiert. Sie liefert eine performante, niedrigschichtige Implementierung des Algorithmus, die in größere Systeme eingebettet oder über höherstufige Tools bereitgestellt werden kann.',
      },
      tr: {
        name: 'Mean-Shift C++',
        short: 'C++ mean-shift kümeleme kütüphanesi',
        full: 'Mean-shift kümelemesini uygulayan C++ kütüphanesi. Algoritmanın performanslı, alçak seviyeli bir uygulamasını sunar; daha büyük sistemlere gömülebilir veya üst düzey araçlar üzerinden sağlanabilir.',
      },
    },
  },
  {
    slug: 'meanshift-orchestrator',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Daily mean-shift processing orchestrator',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['ai-infra', 'automation'],
    locales: {
      en: {
        name: 'Mean-Shift Orchestrator',
        short: 'Daily mean-shift processing orchestrator',
        full: 'An orchestrator that schedules and runs daily mean-shift processing jobs. It coordinates the pipeline — ingesting data, launching processing, and collecting results — so the routine runs reliably without manual intervention.',
      },
      fa: {
        name: 'هماهنگ‌ساز Mean-Shift',
        short: 'هماهنگ‌ساز پردازش روزانه‌ی mean-shift',
        full: 'هماهنگ‌سازي که پردازش‌های روزانه‌ی mean-shift را برنامه‌ریزی و اجرا می‌کند. لوله‌خط را هماهنگ می‌کند — دریافت داده، راه‌اندازی پردازش و جمع‌آوری نتایج — تا فرایندهای دوره‌ای بدون دخالت دستی و به‌صورت قابل اتکا اجرا شوند.',
      },
      de: {
        name: 'Mean-Shift-Orchestrator',
        short: 'Täglicher Mean-Shift-Verarbeitungs-Orchestrator',
        full: 'Ein Orchestrator, der tägliche Mean-Shift-Verarbeitungsaufträge plant und ausführt. Er koordiniert die Pipeline — Dateneingabe, Start der Verarbeitung und Ergebnissammlung — damit die Routine zuverlässig ohne manuellen Eingriff läuft.',
      },
      tr: {
        name: 'Mean-Shift Orkestratörü',
        short: 'Günlük mean-shift işleme orkestratörü',
        full: 'Günlük mean-shift işleme işlerini zamanlayıp çalıştıran bir orkestratör. Boru hattını koordine eder — veri alımı, işleme başlatma ve sonuç toplama — böylece rutin, elle müdahale olmadan güvenilir biçimde çalışır.',
      },
    },
  },
  {
    slug: 'missingly',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Missing-data analysis for pandas',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['data-engineering'],
    locales: {
      en: {
        name: 'Missingly',
        short: 'Missing-data analysis for pandas',
        full: 'A library for analyzing missing data in pandas DataFrames. It detects and quantifies missingness, characterizes its patterns, and helps decide how to handle absent values before analysis or modeling.',
      },
      fa: {
        name: 'Missingly',
        short: 'تحلیل داده‌های گمشده برای pandas',
        full: 'کتابخانه‌ای برای تحلیل داده‌های گمشده در فریم‌داده‌های pandas. گمشده‌ها را شناسایی و کمّی می‌کند، الگوهای آن‌ها را توصیف می‌کند و به تصمیم‌گیری درباره‌ی نحوه‌ی کار با مقادیر ناموجود پیش از تحلیل یا مدل‌سازی کمک می‌کند.',
      },
      de: {
        name: 'Missingly',
        short: 'Missing-Data-Analyse für pandas',
        full: 'Eine Bibliothek zur Analyse fehlender Daten in pandas-DataFrames. Sie erkennt und quantifiziert Fehlwerte, beschreibt deren Muster und hilft zu entscheiden, wie fehlende Werte vor Analyse oder Modeling behandelt werden sollen.',
      },
      tr: {
        name: 'Missingly',
        short: 'Pandas için eksik veri analizi',
        full: 'Pandas veri çerçevelerinde eksik veriyi analiz eden bir kütüphane. Eksiklikleri tespit edip nicelleştirir, örüntülerini niteler; analiz veya modellemeden önce eksik değerlerin nasıl ele alınacağına karar verirken yardımcı olur.',
      },
    },
  },
  {
    slug: 'motor-plate-detector',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Motorcycle plate detector (scaffold)',
    status: 'published',
    statusNote: 'scaffold',
    technologies: ['YOLOv8'],
    capabilities: ['cv-ocr'],
    locales: {
      en: {
        name: 'Motor Plate Detector',
        short: 'Motorcycle plate detector (scaffold)',
        full: 'A scaffold for a motorcycle plate detector. It establishes the structure for detecting motorcycle plates in imagery, building on the same detection + OCR approach used for car plates, and is an early-stage starting point.',
      },
      fa: {
        name: 'تشخیص‌گر پلاک موتورسیکلت',
        short: 'تشخیص‌گر پلاک موتورسیکلت (اسکلت پروژه)',
        full: 'اسکلت پروژه‌ای برای تشخیص‌گر پلاک موتورسیکلت. ساختار را برای تشخیص پلاک موتورسیکلت در تصاویر شکل می‌دهد و روی همان رویکرد تشخیص + OCR به‌کاررفته‌شده برای پلاک خودرو بنا شده و نقطه‌ی شروعی در مراحل اولیه است.',
      },
      de: {
        name: 'Motor-Kennzeichen-Erkennung',
        short: 'Motorrad-Kennzeichen-Erkennung (Gerüst)',
        full: 'Ein Gerüst für eine Motorrad-Kennzeichen-Erkennung. Es legt die Struktur für die Erkennung von Motorradkennzeichen in Bildern an, baut auf dem für Fahrzeugkennzeichen verwendeten Ansatz aus Erkennung + OCR auf und ist ein frühes Startgerüst.',
      },
      tr: {
        name: 'Motosiklet Plaka Tespitçisi',
        short: 'Motosiklet plaka tespit edicisi (iskele)',
        full: 'Motosiklet plaka tespit edicisi için bir iskele. Görüntülerde motosiklet plakalarının tespitine yönelik yapıyı oluşturur; araç plakalarında kullanılan tespit + OCR yaklaşımına dayanır ve erken aşamada bir başlangıç noktasıdır.',
      },
    },
  },
  {
    slug: 'nlq-engine',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Natural-language-to-SQL engine (SQL Server)',
    status: 'published',
    technologies: ['SQL Server'],
    capabilities: ['nlp-speech', 'data-intelligence', 'ai-ml'],
    locales: {
      en: {
        name: 'NLQ Engine',
        short: 'Natural-language-to-SQL engine (SQL Server)',
        full: 'An engine that translates natural-language questions into SQL queries against SQL Server. It lets non-technical users ask questions in plain language and get data answers without writing SQL, connecting language understanding to the data layer.',
      },
      fa: {
        name: 'موتور NLQ',
        short: 'موتور تبدیل زبان طبیعی به SQL (SQL Server)',
        full: 'موتوری که سؤالات زبان طبیعی را به استعلام‌های SQL برای SQL Server ترجمه می‌کند. به کاربران غیرفنی اجازه می‌دهد بدون نوشتن SQL، به زبان ساده سؤال بپرسند و پاسخ داده دریافت کنند و درک زبان را به لایه‌ی داده پیوند می‌دهد.',
      },
      de: {
        name: 'NLQ-Engine',
        short: 'Natural-Language-to-SQL-Engine (SQL Server)',
        full: 'Eine Engine, die natürliche Sprachfragen in SQL-Abfragen für SQL Server übersetzt. Sie ermöglicht nicht-technischen Nutzern, Fragen in Klartext zu stellen und Datenantworten ohne SQL zu erhalten — sie verbindet Sprachverständnis mit der Datenschicht.',
      },
      tr: {
        name: 'NLQ Motoru',
        short: 'Doğal dilden SQL motoru (SQL Server)',
        full: 'Doğal dildeki soruları SQL Server için SQL sorgularına çeviren bir motor. Teknik olmayan kullanıcıların düz dilde soru sorup SQL yazmadan veri yanıtı almasını sağlar; dil anlama ile veri katmanını birbirine bağlar.',
      },
    },
  },
  {
    slug: 'robo-detection-ui',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Robot-detection results UI (.NET)',
    status: 'published',
    technologies: ['.NET'],
    capabilities: ['cv-ocr', 'ai-ml'],
    locales: {
      en: {
        name: 'Robo Detection UI',
        short: 'Robot-detection results UI (.NET)',
        full: 'A user interface, built on .NET, for reviewing robot-detection results. It presents detection outputs in a structured, reviewable form so operators can inspect findings and act on them.',
      },
      fa: {
        name: 'رابط کاربری تشخیص ربات',
        short: 'رابط کاربری نتایج تشخیص ربات (.NET)',
        full: 'رابط کاربری بر پایه‌ی .NET برای بازبینی نتایج تشخیص ربات. خروجی‌های تشخیص را در شکلی ساختاریافته و قابل بازبینی نشان می‌دهد تا اپراتورها بتوانند یافته‌ها را بررسی و روی آن‌ها اقدام کنند.',
      },
      de: {
        name: 'Robo-Detection-UI',
        short: 'UI für Roboter-Erkennungsergebnisse (.NET)',
        full: 'Eine auf .NET basierende Benutzeroberfläche zur Prüfung von Roboter-Erkennungsergebnissen. Sie stellt Erkennungsoutputs in strukturierter, überprüfbarer Form dar, damit Betreiber Befunde sichten und darauf handeln können.',
      },
      tr: {
        name: 'Robo Tespit Arayüzü',
        short: 'Robot tespit sonuçları arayüzü (.NET)',
        full: 'Robot tespit sonuçlarını inceleme için .NET üzerinde geliştirilmiş bir kullanıcı arayüzü. Tespit çıktıları yapılandırılmış ve inceleme biçiminde sunar; operatörlerin bulguları gözden geçirip eyleme geçmesine olanak tanır.',
      },
    },
  },
  {
    slug: 'shared-infrastructure',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Shared service port / config infrastructure',
    status: 'published',
    technologies: ['Python'],
    capabilities: ['ai-infra', 'data-engineering'],
    locales: {
      en: {
        name: 'Shared Infrastructure',
        short: 'Shared service port / config infrastructure',
        full: 'Shared infrastructure for service ports and configuration. It standardizes how services are launched, configured and discovered across projects, reducing duplication and keeping deployments consistent.',
      },
      fa: {
        name: 'زیرساخت مشترک',
        short: 'زیرساخت پورت سرویس مشترک / پیکربندی',
        full: 'زیرساخت مشترک برای پورت‌های سرویس و پیکربندی. نحوه‌ی راه‌اندازی، پیکربندی و یافتن سرویس‌ها را در پروژه‌ها استاندارد می‌کند، تکرار را کاهش می‌دهد و استقرارها را یکدست نگه می‌دارد.',
      },
      de: {
        name: 'Gemeinsame Infrastruktur',
        short: 'Gemeinsame Service-Port-/Config-Infrastruktur',
        full: 'Gemeinsame Infrastruktur für Service-Ports und Konfiguration. Sie standardisiert, wie Dienste gestartet, konfiguriert und gefunden werden, reduziert Duplikation und hält Deployment über Projekte hinweg konsistent.',
      },
      tr: {
        name: 'Paylaşımlı Altyapı',
        short: 'Paylaşımlı servis portu / yapılandırma altyapısı',
        full: 'Servis portları ve yapılandırma için paylaşımlı altyapı. Servislerin nasıl başlatılacağına, yapılandırılacağına ve keşfedileceğine dair standartlar koyar; yinelenmeyi azaltır ve dağıtımları tutarlı tutar.',
      },
    },
  },
  {
    slug: 'speech-to-text-engine',
    category: '04-DATA-Intelligent-Systems',
    sourceDescription: 'Persian ASR engine (Whisper large-v3)',
    status: 'published',
    technologies: ['Whisper'],
    capabilities: ['nlp-speech'],
    locales: {
      en: {
        name: 'Speech-to-Text Engine',
        short: 'Persian ASR engine (Whisper large-v3)',
        full: 'A speech recognition (ASR) engine for Persian built on Whisper large-v3. It converts Persian audio into accurate transcriptions, forming the acoustic and language foundation for downstream text analysis.',
      },
      fa: {
        name: 'موتور گفتار به متن',
        short: 'موتور شناسایی گفتار فارسی (Whisper large-v3)',
        full: 'موتور شناسایی گفتار (ASR) برای زبان فارسی، ساخته‌شده بر پایه‌ی Whisper large-v3. صدای فارسی را به متن‌نویسی دقیق تبدیل می‌کند و پایه‌ی صوتی-زبانی برای تحلیل‌های متنی بعدی را تشکیل می‌دهد.',
      },
      de: {
        name: 'Sprach-zu-Text-Engine',
        short: 'Persische ASR-Engine (Whisper large-v3)',
        full: 'Eine Spracherkennungs- (ASR-)Engine für Persisch auf Basis von Whisper large-v3. Sie wandelt persischen Audio in genaue Transkriptionen um und bildet die akustische und sprachliche Grundlage für nachgelagerte Textanalyse.',
      },
      tr: {
        name: 'Ses Metne Motoru',
        short: 'Farsça ASR motoru (Whisper large-v3)',
        full: 'Whisper large-v3 üzerine kurulu, Farsça için bir konuşma tanıma (ASR) motoru. Farsça ses dalgalarını doğru transkripsiyonlara dönüştürür; sonraki metin analizi için akustik ve dilsel temel oluşturur.',
      },
    },
  },
]
