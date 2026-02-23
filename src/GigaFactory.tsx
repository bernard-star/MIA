import { ArrowLeft, CheckCircle2, Download, CalendarCheck, Factory, Zap, ShieldCheck } from 'lucide-react';
import './App.css';

type GigaFactoryProps = {
    lang: 'fr' | 'en' | 'es' | 'ar';
    onBack: () => void;
};

const ARTICLE_CONTENT = {
    fr: {
        back: "Retour à l'accueil",
        title: "Comment la Giga-factory de Kénitra redessine la supply chain automobile",
        subtitle: "Le Maroc s'impose comme le nouveau hub mondial de la mobilité électrique avec l'émergence d'un écosystème de batteries ultra-compétitif.",
        category: "Industrie 4.0",
        date: "Mis à jour en Février 2026",
        intro: "Avec des investissements étrangers records dans la fabrication de batteries électriques, la zone industrielle de Kénitra (Atlantic Free Zone) est en train de basculer dans l'ère de la mobilité décarbonée. Entre proximité européenne, énergie verte et talents locaux, découvrez pourquoi les géants mondiaux repensent toute leur chaîne de valeur depuis le Maroc.",
        section1Title: "Les 3 leviers de l'écosystème Kénitra",
        section1Desc: "La réussite de Kénitra ne repose pas uniquement sur des incitations fiscales, mais sur la construction d'un écosystème en boucle fermée (closed-loop ecosystem) pour la filière automobile.",
        primes: [
            {
                icon: 'factory',
                title: "Intégration Locale Profonde (Sourcing à plus de 65%)",
                desc: "Les équipementiers de rang 1 et 2 trouvent sur place tout le nécessaire : câblage, emboutissage, plasturgie et désormais, matériaux de cathode. Cela réduit drastiquement les coûts logistiques."
            },
            {
                icon: 'zap',
                title: "Énergie Verte et Compétitive",
                desc: "La Giga-factory profitera directement de la production marocaine en énergies renouvelables (éolien et solaire), garantissant aux constructeurs un bilan carbone réduit essentiel pour l'exportation vers l'Union Européenne (Taxe Carbone de l'UE)."
            },
            {
                icon: 'shield',
                title: "Connectivité et Zone Franche",
                desc: "Dotée du statut de zone franche d'exportation (0% d'IS les 5 premières années) et reliée directement au port en eau profonde de Tanger Med par le rail, Kénitra offre un \"Time-to-Market\" imbattable vers l'Europe et les Amériques."
            }
        ],
        exampleTitle: "Perspectives 2030 : Le Hub Africain de l'Électrique",
        exampleDesc: "L'arrivée de la Giga-factory attire un nouvel afflux de sous-traitants spécialisés dans la chimie, le recyclage de batteries (urban mining) et l'électronique de puissance. Les investisseurs internationaux ciblent désormais Kénitra pour des composants critiques de la voiture autonome et électrique, anticipant la bascule technologique de 2030.",
        ctaTitle: "Positionnez votre entreprise au cœur de l'écosystème",
        ctaDesc: "Contactez MIA pour identifier les opportunités de sous-traitance, comprendre les incitations de l'Atlantic Free Zone et organiser une visite sur site avec les acteurs clés de Kénitra.",
        btnCalendly: "Réserver un appel découverte",
        btnDownload: "Télécharger l'étude Sectorielle (Automobile)"
    },
    en: {
        back: "Back to Home",
        title: "How Kenitra's Gigafactory is reshaping the automotive supply chain",
        subtitle: "Morocco establishes itself as the new global hub for electric mobility with the emergence of an ultra-competitive battery ecosystem.",
        category: "Industry 4.0",
        date: "Updated February 2026",
        intro: "Driven by record foreign investments in EV battery manufacturing, the Kenitra industrial zone (Atlantic Free Zone) is transitioning into the era of decarbonized mobility. Combining European proximity, green energy, and local talent, discover why global giants are redesigning their entire value chain from Morocco.",
        section1Title: "The 3 Levers of the Kenitra Ecosystem",
        section1Desc: "Kenitra's success relies not only on tax incentives but on building a closed-loop ecosystem for the automotive industry.",
        primes: [
            {
                icon: 'factory',
                title: "Deep Local Integration (Sourcing over 65%)",
                desc: "Tier 1 and 2 suppliers find everything they need locally: wiring, stamping, plastics, and now cathode materials. This drastically reduces logistics costs."
            },
            {
                icon: 'zap',
                title: "Competitive and Green Energy",
                desc: "The Gigafactory directly leverages Morocco's renewable energy production (wind and solar), guaranteeing manufacturers a reduced carbon footprint crucial for exporting to the EU (Carbon Border Adjustment Mechanism)."
            },
            {
                icon: 'shield',
                title: "Connectivity & Free Trade Zone",
                desc: "Granted Export Free Zone status (0% Corporate Tax for 5 years) and directly linked to the deep-water Tanger Med port by rail, Kenitra offers an unbeatable \"Time-to-Market\" to Europe and the Americas."
            }
        ],
        exampleTitle: "2030 Outlook: Africa's Prime EV Hub",
        exampleDesc: "The arrival of the Gigafactory is attracting a new wave of subcontractors specializing in chemistry, battery recycling (urban mining), and power electronics. International investors are targeting Kenitra for critical autonomous and EV components to anticipate the 2030 tech shift.",
        ctaTitle: "Position your business at the core of the ecosystem",
        ctaDesc: "Contact MIA to identify subcontracting opportunities, navigate Atlantic Free Zone incentives, and organize a site visit with Kenitra's key stakeholders.",
        btnCalendly: "Book a discovery call",
        btnDownload: "Download Sector Report (Automotive)"
    },
    es: {
        back: "Volver al Inicio",
        title: "Cómo la Gigafactoría de Kenitra está remodelando la cadena de suministro automotriz",
        subtitle: "Marruecos se consolida como el nuevo centro mundial de la movilidad eléctrica con la aparición de un ecosistema de baterías ultracompetitivo.",
        category: "Industria 4.0",
        date: "Actualizado en Febrero 2026",
        intro: "Con inversiones extranjeras récord en la fabricación de baterías para vehículos eléctricos, la zona industrial de Kenitra (Atlantic Free Zone) está entrando en la era de la movilidad descarbonizada. Gracias a su proximidad con Europa, energía verde y talento local, los gigantes del mundo están rediseñando su cadena de valor desde Marruecos.",
        section1Title: "Las 3 Palancas del Ecosistema de Kenitra",
        section1Desc: "El éxito de Kenitra radica en la construcción de un ecosistema de circuito cerrado integral (closed-loop) para la industria automotriz.",
        primes: [
            {
                icon: 'factory',
                title: "Profunda Integración Local (Más de 65% de abastecimiento)",
                desc: "Los proveedores de nivel 1 y 2 encuentran todo lo necesario in situ: cableado, estampación, plásticos y materiales de cátodo. Esto reduce drásticamente los costos."
            },
            {
                icon: 'zap',
                title: "Energía Verde y Competitiva",
                desc: "La Gigafactoría aprovecha la producción de energías renovables marroquí (eólica y solar), garantizando una menor huella de carbono, clave para la exportación a la Unión Europea."
            },
            {
                icon: 'shield',
                title: "Conectividad y Zona Franca",
                desc: "Dotada de estatus de Zona Franca de Exportación (0% IS durante los primeros 5 años) y conectada por ferrocarril al puerto de Tánger Med, ofrece un 'Time-to-Market' inmejorable."
            }
        ],
        exampleTitle: "Perspectivas 2030: El Centro EV Africano",
        exampleDesc: "La llegada de la Gigafactoría atrae fábricas especializadas en química, reciclaje de baterías (minería urbana) y electrónica de potencia. Los inversores internacionales apuntan a Kenitra para los componentes críticos del coche autónomo y eléctrico.",
        ctaTitle: "Posicione su empresa en el corazón del ecosistema",
        ctaDesc: "Contacte con MIA para identificar oportunidades de subcontratación y organizar reuniones estratégicas con los actores de Kenitra.",
        btnCalendly: "Reservar una llamada de descubrimiento",
        btnDownload: "Descargar Informe Sectorial (Automoción)"
    },
    ar: {
        back: "العودة إلى الرئيسية",
        title: "كيف يعيد مصنع القنيطرة تشكيل سلسلة توريد السيارات",
        subtitle: "المغرب يفرض نفسه كمركز عالمي جديد للتنقل الكهربائي مع ظهور نظام بيئي للبطاريات عالي التنافسية.",
        category: "الصناعة 4.0",
        date: "تم التحديث في فبراير 2026",
        intro: "مدفوعة باستثمارات أجنبية قياسية في تصنيع بطاريات السيارات الكهربائية، تدخل المنطقة الصناعية بالقنيطرة (المنطقة الحرة الأطلسية) عصر التنقل الخالي من الكربون. اكتشف لماذا تعيد الشركات العالمية العملاقة تصميم سلسلة القيمة الخاصة بها من المغرب، بفضل القرب من أوروبا، والطاقة الخضراء، والمواهب المحلية.",
        section1Title: "الرافعات الثلاث لنظام القنيطرة البيئي",
        section1Desc: "لا يعتمد نجاح القنيطرة على الحوافز الضريبية فحسب، بل على بناء نظام بيئي متكامل ومغلق (closed-loop) لقطاع السيارات.",
        primes: [
            {
                icon: 'factory',
                title: "اندماج محلي عميق (مصادر محلية بأكثر من 65%)",
                desc: "يجد موردو المعدات من المستويين الأول والثاني كل ما يحتاجونه محلياً: الأسلاك، والختم، وصناعة البلاستيك، والآن مواد الكاثود. هذا يقلل بشكل كبير من التكاليف اللوجستية."
            },
            {
                icon: 'zap',
                title: "طاقة خضراء وتنافسية",
                desc: "سيستفيد المصنع الضخم من إنتاج المغرب من الطاقات المتجددة (الرياح والطاقة الشمسية)، مما يضمن للمصنعين بصمة كربونية منخفضة وهو أمر ضروري للتصدير إلى الاتحاد الأوروبي (ضريبة الكربون الأوروبية)."
            },
            {
                icon: 'shield',
                title: "الربط والمنطقة الحرة",
                desc: "تتمتع القنيطرة بوضع منطقة تجارة حرة للتصدير (إعفاء بنسبة 0% من ضريبة الشركات لأول 5 سنوات)، وترتبط مباشرة بميناء طنجة المتوسط للتحكم المباشر والسريع في الأسواق الأوروبية والأمريكية."
            }
        ],
        exampleTitle: "آفاق 2030: مركز السيارات الكهربائية الأول في إفريقيا",
        exampleDesc: "يجذب وصول المصنع الضخم تدفقاً جديداً من المقاولين المتخصصين في الكيمياء، وإعادة تدوير البطاريات، وإلكترونيات الطاقة. يستهدف المستثمرون الدوليون القنيطرة للحصول على المكونات الحيوية للسيارات المستقلة تمهيداً لعام 2030.",
        ctaTitle: "ضع شركتك في صميم هذا النظام البيئي",
        ctaDesc: "اتصل بجمعية (MIA) لتحديد فرص التعاقد من الباطن، والتعرف على حوافز المنطقة الحرة الأطلسية، وتنظيم زيارة ميدانية مع اللاعبين الرئيسيين المتواجدين في القنيطرة.",
        btnCalendly: "حجز مكالمة اكتشاف",
        btnDownload: "تنزيل تقرير القطاع (السيارات)"
    }
};

export default function GigaFactory({ lang, onBack }: GigaFactoryProps) {
    const t = ARTICLE_CONTENT[lang];
    const isRTL = lang === 'ar';

    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case 'factory': return <Factory size={32} color="var(--sand-gold)" />;
            case 'zap': return <Zap size={32} color="var(--sand-gold)" />;
            case 'shield': return <ShieldCheck size={32} color="var(--sand-gold)" />;
            default: return <CheckCircle2 size={32} color="var(--sand-gold)" />;
        }
    }

    return (
        <section id="gigafactory" className={`gigafactory-section ${isRTL ? 'arabic-text' : ''}`} dir={isRTL ? "rtl" : "ltr"} style={{ paddingBottom: '4rem' }}>
            <div className="container" style={{ marginBottom: '2rem' }}>
                <button onClick={onBack} className="back-btn" style={{
                    background: 'none', border: 'none', color: 'var(--royal-blue)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                    fontWeight: 600, fontSize: '1rem', padding: '1rem 0'
                }}>
                    <ArrowLeft size={20} style={isRTL ? { transform: 'scaleX(-1)' } : {}} />
                    {t.back}
                </button>
            </div>

            {/* Article Header */}
            <header className="article-header" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)' }}>
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
                    <p className="article-intro drop-cap" style={{ color: 'var(--text-color)', fontWeight: 400 }}>{t.intro}</p>

                    <h2 className="article-h2">{t.section1Title}</h2>
                    <p>{t.section1Desc}</p>

                    <div className="primes-grid">
                        {t.primes.map((prime, idx) => (
                            <div className="prime-card" key={idx} style={{ background: '#fafafa', border: '1px solid #eee', borderLeft: isRTL ? '1px solid #eee' : '4px solid var(--royal-blue)', borderRight: isRTL ? '4px solid var(--royal-blue)' : '1px solid #eee' }}>
                                <div className="prime-icon">
                                    {renderIcon(prime.icon)}
                                </div>
                                <div>
                                    <h3 className="prime-title" style={{ color: 'var(--royal-blue-dark)' }}>{prime.title}</h3>
                                    <p style={{ color: '#444' }}>{prime.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="article-example-box" style={{ background: 'linear-gradient(135deg, rgba(8, 25, 45, 0.95) 0%, rgba(10, 35, 66, 0.9) 100%)', color: 'white', border: 'none' }}>
                        <h3 className="example-title" style={{ color: 'var(--sand-gold)' }}>{t.exampleTitle}</h3>
                        <p style={{ opacity: 0.9 }}>{t.exampleDesc}</p>
                    </div>

                    <div className="article-cta-box" style={{ background: 'white', color: 'var(--royal-blue)', border: '2px solid var(--royal-blue)', boxShadow: 'none' }}>
                        <h2 style={{ color: 'var(--royal-blue-dark)' }}>{t.ctaTitle}</h2>
                        <p style={{ color: 'var(--text-muted)' }}>{t.ctaDesc}</p>
                        <div className="article-cta-buttons">
                            <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={() => window.location.hash = '#contact'}>
                                <CalendarCheck size={20} />
                                {t.btnCalendly}
                            </button>
                            <button className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderColor: 'var(--royal-blue)' }}>
                                <Download size={20} />
                                {t.btnDownload}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

        </section>
    );
}
