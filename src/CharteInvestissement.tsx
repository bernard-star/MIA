import { ArrowLeft, CheckCircle2, Download, CalendarCheck } from 'lucide-react';
import './App.css';

type CharteInvestissementProps = {
    lang: 'fr' | 'en' | 'es' | 'ar';
    onBack: () => void;
};

const ARTICLE_CONTENT = {
    fr: {
        back: "Retour à l'accueil",
        title: "Nouvelle Charte de l'Investissement : Le Guide Complet 2026",
        subtitle: "Découvrez comment le Maroc soutient activement les investisseurs étrangers avec des primes allant jusqu'à 30% du montant d'investissement total.",
        category: "Réglementation",
        date: "Mis à jour en Février 2026",
        intro: "Adoptée pour propulser le Maroc en tant que hub industriel et logistique mondial à l'aube de 2030, la Nouvelle Charte de l'Investissement révolutionne les mécanismes de soutien de l'État. Elle vise un objectif clair : faciliter la création de valeur et l'internationalisation des entreprises étrangères sur le territoire marocain.",
        section1Title: "Les 3 Piliers des Primes à l'Investissement",
        section1Desc: "La charte introduit des primes directes et cumulables, destinées aux projets dépassant les 50 millions de dirhams (environ 5 millions d'euros) ou créant plus de 50 emplois stables.",
        primes: [
            {
                title: "1. La Prime Territoriale (Jusqu'à 15%)",
                desc: "Pour encourager la décentralisation, l'État offre une subvention majeure si vous vous installez hors de l'axe classique. Les provinces sont classées en deux catégories (A et B), ouvrant droit à 10% ou 15% de prime sur votre investissement total."
            },
            {
                title: "2. La Prime Sectorielle (5%)",
                desc: "Les secteurs prioritaires bénéficient d'un boost de 5%. Cela inclut massivement l'Industrie (dont le 4.0), l'Agro-industrie, les Énergies Renouvelables, la Santé, et bien entendu les infrastructures liées à l'événementiel sportif mondial de 2030."
            },
            {
                title: "3. La Prime Commune (Jusqu'à 10%)",
                desc: "Répartie sur des critères de performance : Création d'emplois, parité homme/femme, ou l'utilisation d'énergies renouvelables pour la production."
            }
        ],
        exampleTitle: "Cas Pratique : Installation d'une usine AgriTech dans l'Oriental",
        exampleDesc: "Une entreprise européenne implante une usine AgriTech (Secteur prioritaire : +5%), dans une province de catégorie A (+10%), en atteignant les objectifs de parité et d'énergie verte (+5%). L'État subventionnera donc 20% du coût total du projet.",
        ctaTitle: "Accélérez votre projet avec MIA",
        ctaDesc: "Notre équipe d'Intelligence Active (MIA) est experte dans le montage de ces dossiers d'investissement. Nous vous guidons pour maximiser ces subventions et sécuriser vos accords avec l'Agence Marocaine de Développement des Investissements (AMDIE).",
        btnCalendly: "Planifier une consultation gratuite",
        btnDownload: "Télécharger le résumé en PDF"
    },
    en: {
        back: "Back to Home",
        title: "New Investment Charter: The Comprehensive 2026 Guide",
        subtitle: "Discover how Morocco actively supports foreign investors with premiums covering up to 30% of the total investment amount.",
        category: "Regulation",
        date: "Updated February 2026",
        intro: "Adopted to propel Morocco as a global industrial and logistical hub by 2030, the New Investment Charter revolutionizes state support mechanisms. Its clear objective: to facilitate foreign companies' value creation and internationalization on Moroccan soil.",
        section1Title: "The 3 Pillars of Investment Premiums",
        section1Desc: "The charter introduces direct and cumulative premiums intended for projects exceeding 50 million dirhams (approx. 5 million euros) or creating over 50 stable jobs.",
        primes: [
            {
                title: "1. The Territorial Premium (Up to 15%)",
                desc: "To encourage decentralization, the State offers major subsidies for establishing outside standard hubs. Provinces are divided into two categories (A and B), granting 10% or 15% subsidies on your total investment."
            },
            {
                title: "2. The Sectoral Premium (5%)",
                desc: "Priority sectors receive a 5% boost. This includes Industry (especially 4.0), Agro-industry, Renewable Energies, Healthcare, and infrastructure related to the 2030 global sporting event."
            },
            {
                title: "3. The Common Premium (Up to 10%)",
                desc: "Distributed across performance criteria: Job creation, gender equality, and sustainable development/renewable energy usage in production."
            }
        ],
        exampleTitle: "Case Study: AgriTech plant setup in the Oriental Region",
        exampleDesc: "A European company establishes an AgriTech factory (Priority sector: +5%), in a Category A province (+10%), while achieving gender and green energy targets (+5%). The State will therefore subsidize 20% of the project's total cost.",
        ctaTitle: "Fast-Track Your Project with MIA",
        ctaDesc: "Our active intelligence network (MIA) holds the expertise to build these investment applications. We aim to maximize your subsidies and secure your agreements with the Moroccan Agency for Investment Development (AMDIE).",
        btnCalendly: "Schedule a free consultation",
        btnDownload: "Download the PDF Summary"
    },
    es: {
        back: "Volver al Inicio",
        title: "Nueva Carta de Inversiones: La Guía Completa 2026",
        subtitle: "Descubra cómo Marruecos apoya activamente a los inversores extranjeros con primas de hasta el 30% del monto total de inversión.",
        category: "Regulación",
        date: "Actualizado en Febrero 2026",
        intro: "Adoptada para impulsar a Marruecos como un centro industrial y logístico global de cara a 2030, la Nueva Carta de Inversiones revoluciona los mecanismos de apoyo estatal. Su objetivo claro: facilitar la creación de valor y el establecimiento de empresas extranjeras.",
        section1Title: "Los 3 Pilares de las Primas a la Inversión",
        section1Desc: "La carta introduce primas directas y acumulativas destinadas a proyectos que superen los 50 millones de dírhams (aprox. 5 millones de euros) o creen más de 50 empleos estables.",
        primes: [
            {
                title: "1. La Prima Territorial (Hasta un 15%)",
                desc: "Para fomentar la descentralización, el Estado ofrece un subsidio importante por establecerse fuera de las áreas clásicas. Las provincias se dividen (A y B), otorgando un 10% o un 15% sobre su inversión."
            },
            {
                title: "2. La Prima Sectorial (5%)",
                desc: "Los sectores prioritarios reciben un impulso del 5%: Industria (especialmente 4.0), Agroindustria, Energías Renovables, Salud e infraestructuras para el evento de la Copa del Mundo 2030."
            },
            {
                title: "3. La Prima Común (Hasta un 10%)",
                desc: "Distribuida en criterios de rendimiento: Creación de empleo, paridad de género y uso de energías sostenibles."
            }
        ],
        exampleTitle: "Caso Práctico: Instalación de una planta AgriTech",
        exampleDesc: "Una empresa europea establece una fábrica AgriTech (Sector prioritario: +5%), en una provincia de Categoría A (+10%), y alcanza objetivos de equidad y energía verde (+5%). El Estado subvencionará el 20% del costo total.",
        ctaTitle: "Acelere su proyecto con MIA",
        ctaDesc: "Nuestro equipo (MIA) es experto en construir estas solicitudes de inversión. Le orientamos para maximizar sus subvenciones y asegurar sus acuerdos con la Agencia Marroquí para el Desarrollo de Inversiones (AMDIE).",
        btnCalendly: "Programar una consulta gratuita",
        btnDownload: "Descargar Resumen en PDF"
    },
    ar: {
        back: "العودة إلى الرئيسية",
        title: "ميثاق الاستثمار الجديد: الدليل الشامل 2026",
        subtitle: "اكتشف كيف يدعم المغرب بنشاط المستثمرين الأجانب بمنح تصل إلى 30% من إجمالي مبلغ الاستثمار.",
        category: "تنظيمات",
        date: "تم التحديث في فبراير 2026",
        intro: "تم اعتماد ميثاق الاستثمار الجديد لدفع المغرب كمركز صناعي ولوجستي عالمي بحلول عام 2030، وهو يُحدث ثورة في آليات دعم الدولة. هدفه الواضح: تسهيل خلق القيمة وإضفاء الطابع الدولي على الشركات الأجنبية على الأراضي المغربية.",
        section1Title: "الركائز الثلاث لمنح الاستثمار",
        section1Desc: "يقدم الميثاق منحاً مباشرة وتراكمية تستهدف المشاريع التي تتجاوز قيمتها 50 مليون درهم (حوالي 5 ملايين يورو) أو تخلق أكثر من 50 فرصة عمل مستقرة.",
        primes: [
            {
                title: "1. المنحة الإقليمية (تصل إلى 15%)",
                desc: "لتشجيع اللامركزية، تقدم الدولة دعماً كبيراً إذا استقرت خارج المحور الكلاسيكي (الدار البيضاء/طنجة). تُصنف المقاطعات إلى فئتين (أ و ب)، مما يعطي الحق في 10% أو 15% كمنحة على استثمارك الإجمالي."
            },
            {
                title: "2. المنحة القطاعية (5%)",
                desc: "تستفيد القطاعات ذات الأولوية من زيادة قدرها 5%. يشمل ذلك الصناعة، والصناعات الغذائية، والطاقات المتجددة، والصحة، والبنى التحتية المرتبطة بالحدث الرياضي العالمي 2030."
            },
            {
                title: "3. المنحة المشتركة (تصل إلى 10%)",
                desc: "موزعة على معايير الأداء: خلق فرص العمل، أو المساواة بين الجنسين، أو استخدام الطاقات المتجددة في الإنتاج."
            }
        ],
        exampleTitle: "حالة دراسية: إنشاء مصنع تكنولوجيا زراعية (AgriTech)",
        exampleDesc: "شركة أوروبية تنشئ مصنع تكنولوجيا زراعية (قطاع ذو أولوية: +5%)، في مقاطعة من الفئة (أ) (+10%)، مع تحقيق أهداف المساواة والطاقة الخضراء (+5%). ستدعم الدولة بالتالي 20% من إجمالي تكلفة المشروع.",
        ctaTitle: "سرّع مشروعك مع جمعيتنا (MIA)",
        ctaDesc: "فريقنا المتخصص في الاستخبارات النشطة (MIA) خبير في إعداد ملفات الاستثمار هذه. نحن نرشدك لتعظيم هذه المنح وتأمين اتفاقياتك مع الوكالة المغربية لتنمية الاستثمارات (AMDIE).",
        btnCalendly: "تحديد موعد استشارة مجانية",
        btnDownload: "تنزيل الملخص (PDF)"
    }
};

export default function CharteInvestissement({ lang, onBack }: CharteInvestissementProps) {
    const t = ARTICLE_CONTENT[lang];
    const isRTL = lang === 'ar';

    return (
        <div className={`article-page ${isRTL ? 'arabic-text' : ''}`} dir={isRTL ? "rtl" : "ltr"}>
            {/* Article Navigation */}
            <nav className="article-nav">
                <div className="container" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <button onClick={onBack} className="back-btn" style={{
                        background: 'none', border: 'none', color: 'var(--royal-blue)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                        fontWeight: 600, fontSize: '1rem', padding: 0
                    }}>
                        <ArrowLeft size={20} style={isRTL ? { transform: 'scaleX(-1)' } : {}} />
                        {t.back}
                    </button>
                </div>
            </nav>

            {/* Article Header */}
            <header className="article-header">
                <div className="container">
                    <div className="article-meta">
                        <span className="news-category" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                            {t.category}
                        </span>
                        <span style={{ margin: '0 10px', color: 'var(--text-muted)' }}>|</span>
                        <span className="news-date">{t.date}</span>
                    </div>
                    <h1 className="article-title">{t.title}</h1>
                    <p className="article-subtitle">{t.subtitle}</p>
                </div>
            </header>

            {/* Article Content */}
            <main className="article-body container">
                <div className="article-content-wrapper">
                    <p className="article-intro drop-cap">{t.intro}</p>

                    <h2 className="article-h2">{t.section1Title}</h2>
                    <p>{t.section1Desc}</p>

                    <div className="primes-grid">
                        {t.primes.map((prime, idx) => (
                            <div className="prime-card" key={idx}>
                                <div className="prime-icon">
                                    <CheckCircle2 size={32} color="var(--sand-gold)" />
                                </div>
                                <div>
                                    <h3 className="prime-title">{prime.title}</h3>
                                    <p>{prime.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="article-example-box">
                        <h3 className="example-title">{t.exampleTitle}</h3>
                        <p>{t.exampleDesc}</p>
                    </div>

                    <div className="article-cta-box">
                        <h2>{t.ctaTitle}</h2>
                        <p>{t.ctaDesc}</p>
                        <div className="article-cta-buttons">
                            <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={() => window.location.hash = '#contact'}>
                                <CalendarCheck size={20} />
                                {t.btnCalendly}
                            </button>
                            <button className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <Download size={20} />
                                {t.btnDownload}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer minimal */}
            <footer className="footer" style={{ marginTop: '4rem', padding: '2rem 0', textAlign: 'center' }}>
                <p>© 2026 MIA - Moroccan Investment Association.</p>
            </footer>
        </div>
    );
}
