import { ArrowLeft, CheckCircle2, Download, CalendarCheck, Wind, Sun, BatteryCharging } from 'lucide-react';
import './App.css';

type HydrogeneDakhlaProps = {
    lang: 'fr' | 'en' | 'es' | 'ar';
    onBack: () => void;
};

const ARTICLE_CONTENT = {
    fr: {
        back: "Retour à l'accueil",
        title: "Dakhla : L'épicentre mondial de l'Hydrogène Vert",
        subtitle: "Découvrez comment les provinces du Sud du Maroc redéfinissent la carte mondiale de l'énergie avec l'« Offre Maroc ».",
        category: "Énergies Renouvelables",
        date: "Mis à jour en Février 2026",
        intro: "Bordée par l'océan Atlantique et balayée par des vents réguliers, Dakhla possède l'un des meilleurs potentiels hybrides éoliens-solaires au monde. Avec l'initiative stratégique de l'« Offre Maroc », la région attire les plus grands conglomérats internationaux pour produire l'hydrogène vert et ses dérivés (Ammoniac, Méthanol) à des coûts défiant toute concurrence.",
        section1Title: "Les 3 piliers de la révolution verte à Dakhla",
        section1Desc: "La compétitivité de Dakhla ne s'arrête pas au climat, elle repose sur un cadre d'investissement clé en main, inédit en Afrique, pensé pour accélérer le passage des Mégawatts aux Gigawatts.",
        primes: [
            {
                icon: 'wind',
                title: "Un gisement hybride exceptionnel",
                desc: "Avec plus de 3 500 heures d'ensoleillement par an et des vents constants d'une vitesse moyenne de 10 m/s, Dakhla permet un taux de charge (capacity factor) record dépassant les 70% pour la production d'électricité verte."
            },
            {
                icon: 'battery',
                title: "L'« Offre Maroc » : 1 million d'hectares alloués",
                desc: "L'État a mis en place un processus de foncier massif, transparent et incitatif, alloué exclusivement aux projets Power-to-X. Fini les lourdeurs, place à un guichet unique pour les développeurs mondiaux."
            },
            {
                icon: 'sun',
                title: "Le futur hub logistique de l'Atlantique",
                desc: "Le Mégaprojet du port de Dakhla Atlantique connecte directement les unités de production et de dessalement de l'eau aux pipelines d'exportation vers l'Europe et les autres marchés globaux."
            }
        ],
        exampleTitle: "Horizon 2030 : Du Power-to-X à l'industrie lourde décarbonée",
        exampleDesc: "L'hydrogène vert produit à Dakhla ne sera pas qu'exporté. Il vise à décarboner l'industrie lourde nationale (acier, ciment, engrais). Le Groupe OCP, géant mondial des phosphates, compte sur cet hydrogène pour produire de l'ammoniac vert, garantissant la sécurité alimentaire sans l'empreinte carbone des combustibles fossiles.",
        ctaTitle: "Accédez en priorité au hub énergétique de demain",
        ctaDesc: "Contactez MIA pour structurer votre projet d'énergie renouvelable, naviguer dans le cadre de l'« Offre Maroc » et obtenir les incitations d'investissement étatiques (Nouvelle Charte).",
        btnCalendly: "Planifier un rendez-vous expert",
        btnDownload: "Télécharger le White Paper (H2 Vert)"
    },
    en: {
        back: "Back to Home",
        title: "Dakhla: The Global Epicenter of Green Hydrogen",
        subtitle: "Discover how Morocco's southern provinces are reshaping the global energy map with the 'Morocco Offer'.",
        category: "Renewable Energy",
        date: "Updated February 2026",
        intro: "Bordered by the Atlantic Ocean and swept by steady offshore-level winds, Dakhla possesses one of the world's best hybrid wind-solar potentials. Through the strategic 'Morocco Offer', the region is attracting massive international conglomerates to produce green hydrogen and its derivatives (Ammonia, Methanol) at highly competitive costs.",
        section1Title: "The 3 Pillars of Dakhla's Green Revolution",
        section1Desc: "Dakhla's competitiveness doesn’t stop at its climate; it lies in a turnkey investment framework, unseen in Africa, designed to accelerate the jump from Megawatts to Gigawatts.",
        primes: [
            {
                icon: 'wind',
                title: "An Exceptional Hybrid Resource",
                desc: "Boasting over 3,500 hours of sunshine annually and constant winds averaging 10 m/s, Dakhla enables an unprecedented capacity factor exceeding 70% for green energy generation."
            },
            {
                icon: 'battery',
                title: "The 'Morocco Offer': 1 Million Hectares Allocated",
                desc: "The State has deployed a massive, transparent, and highly incentivized land allocation process strictly for Power-to-X projects. A one-stop-shop approach fast-tracks global developers."
            },
            {
                icon: 'sun',
                title: "The Future Atlantic Logistics Hub",
                desc: "The Dakhla Atlantic Port Megaproject directly connects colossal desalination and production units to export pipelines targeting Europe and other global markets."
            }
        ],
        exampleTitle: "2030 Horizon: From Power-to-X to Decarbonized Heavy Industry",
        exampleDesc: "The green hydrogen produced in Dakhla won't solely be exported. It aims to decarbonize national heavy industry (steel, cement, fertilizers). The OCP Group, a global phosphate giant, relies on this hydrogen to produce green ammonia, ensuring global food security without the carbon footprint of fossil fuels.",
        ctaTitle: "Get priority access to the energy hub of tomorrow",
        ctaDesc: "Contact MIA to structure your renewable energy project, navigate the 'Morocco Offer' framework, and secure state investment incentives (New Investment Charter).",
        btnCalendly: "Schedule an Expert Meeting",
        btnDownload: "Download the White Paper (Green H2)"
    },
    es: {
        back: "Volver al Inicio",
        title: "Dajla: El Epicentro Mundial del Hidrógeno Verde",
        subtitle: "Descubra cómo las provincias del sur de Marruecos están redefiniendo el mapa energético global con la «Oferta Marruecos».",
        category: "Energías Renovables",
        date: "Actualizado en Febrero 2026",
        intro: "Bordeada por el Océano Atlántico y barrida por vientos constantes, Dajla posee uno de los mejores potenciales híbridos eólico-solares del mundo. A través de la iniciativa estratégica de la «Oferta Marruecos», la región atrae a masivos conglomerados internacionales para producir hidrógeno verde y sus derivados (Amoníaco, Metanol) a costos ultracompetitivos.",
        section1Title: "Los 3 Pilares de la Revolución Verde en Dajla",
        section1Desc: "La competitividad de Dajla no se limita a su clima; se basa en un marco de inversión con todo incluido, inédito en África, diseñado para acelerar el salto de Megavatios a Gigavatios.",
        primes: [
            {
                icon: 'wind',
                title: "Un Recurso Híbrido Excepcional",
                desc: "Con más de 3.500 horas de sol al año y vientos constantes con una media de 10 m/s, Dajla permite un factor de capacidad récord superior al 70% para la generación de energía verde."
            },
            {
                icon: 'battery',
                title: "La «Oferta Marruecos»: 1 millón de hectáreas",
                desc: "El Estado ha implementado un proceso de asignación de terrenos masivo, transparente e incentivado, dedicado exclusivamente a los proyectos Power-to-X. Se acabó la burocracia gracias a la ventanilla única."
            },
            {
                icon: 'sun',
                title: "El Futuro Eje Logístico del Atlántico",
                desc: "El megaproyecto del Puerto de Dajla Atlántico conecta directamente las inmensas unidades de producción y desalinización con los gasoductos de exportación hacia Europa y los mercados globales."
            }
        ],
        exampleTitle: "Horizonte 2030: Del Power-to-X a la Industria Pesada Descarbonizada",
        exampleDesc: "El hidrógeno verde producido en Dajla no solo se exportará. Su objetivo es descarbonizar la industria pesada nacional (acero, cemento, fertilizantes). OCP, el gigante mundial de los fosfatos, apuesta por este vector para producir amoníaco verde y garantizar la seguridad alimentaria.",
        ctaTitle: "Acceda prioritariamente al gran hub energético",
        ctaDesc: "Contacte con MIA para estructurar su proyecto de energía renovable, navegar por la «Oferta Marruecos» y conseguir los mejores incentivos estatales a la inversión.",
        btnCalendly: "Programar una reunión experta",
        btnDownload: "Descargar Informe (H2 Verde)"
    },
    ar: {
        back: "العودة إلى الرئيسية",
        title: "الداخلة: البؤرة العالمية للهيدروجين الأخضر",
        subtitle: "اكتشف كيف تعيد الأقاليم الجنوبية للمغرب رسم خريطة الطاقة العالمية من خلال «عرض المغرب».",
        category: "الطاقات المتجددة",
        date: "تم التحديث في فبراير 2026",
        intro: "بموقعها على المحيط الأطلسي والرياح المنتظمة التي تميزها، تمتلك الداخلة إحدى أفضل الإمكانات الهجينة لطاقة الرياح والطاقة الشمسية في العالم. بفضل المبادرة الاستراتيجية «عرض المغرب»، تجذب المنطقة كبرى المجموعات الدولية لإنتاج الهيدروجين الأخضر ومشتقاته (الأمونيا والميثانول) بتكلفة تنافسية تقهر التوقعات.",
        section1Title: "الركائز الثلاث للثورة الخضراء في الداخلة",
        section1Desc: "لا تتوقف تنافسية الداخلة عند المناخ، بل تعتمد على إطار استثماري جاهز وغير مسبوق في إفريقيا، مصمم لتسريع الانتقال من الميغاواط إلى الجيغاواط.",
        primes: [
            {
                icon: 'wind',
                title: "مورد هجين استثنائي (رياح + شمس)",
                desc: "مع أكثر من 3500 ساعة من أشعة الشمس سنوياً ورياح ثابتة بسرعة متوسطة تبلغ 10 م/ث، تتيح الداخلة عامل قدرة (Capacity Factor) قياسي يتجاوز 70% لإنتاج الكهرباء الخضراء."
            },
            {
                icon: 'battery',
                title: "«عرض المغرب»: مليون هكتار مخصصة للقطاع",
                desc: "وضعت الدولة عملية تخصيص للأراضي واسعة النطاق، وشفافة، ومحفزة للغاية، مخصصة حصرياً لمشاريع (Power-to-X). تم القضاء على البيروقراطية بفضل شباك المشاريع الموحد."
            },
            {
                icon: 'sun',
                title: "المحور اللوجستي الأطلسي المستقبلي",
                desc: "يربط المشروع الضخم لميناء الداخلة الأطلسي وحدات الإنتاج العملاقة ومحطات تحلية المياه مباشرة بخطوط أنابيب التصدير المتجهة نحو أوروبا والأسواق العالمية الأخرى."
            }
        ],
        exampleTitle: "آفاق 2030: من Power-to-X إلى إزالة الكربون من الصناعة الثقيلة",
        exampleDesc: "لن يُصَدر الهيدروجين الأخضر المنتج في الداخلة فقط. بل يهدف إلى إزالة الكربون من الصناعة الوطنية الثقيلة (الصلب والأسمنت والأسمدة). تعتمد مجموعة OCP، العملاق العالمي للفوسفات، على هذا الهيدروجين لإنتاج الأمونيا الخضراء، لضمان الأمن الغذائي دون البصمة الكربونية للوقود الأحفوري.",
        ctaTitle: "احصل على وصول تفضيلي لمركز طاقة الغد",
        ctaDesc: "تواصل مع (MIA) لهيكلة مشروعك للطاقة المتجددة، وفهم إطار عمل «عرض المغرب»، وتأمين حوافز الاستثمار الحكومية بموجب الميثاق الجديد.",
        btnCalendly: "جدولة موعد مع خبير",
        btnDownload: "تنزيل الورقة البيضاء (H2 الأخضر)"
    }
};

export default function HydrogeneDakhla({ lang, onBack }: HydrogeneDakhlaProps) {
    const t = ARTICLE_CONTENT[lang];
    const isRTL = lang === 'ar';

    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case 'wind': return <Wind size={32} color="var(--sand-gold)" />;
            case 'sun': return <Sun size={32} color="var(--sand-gold)" />;
            case 'battery': return <BatteryCharging size={32} color="var(--sand-gold)" />;
            default: return <CheckCircle2 size={32} color="var(--sand-gold)" />;
        }
    }

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
            <header className="article-header" style={{ background: 'linear-gradient(to bottom, #dff6f0 0%, #ffffff 100%)' }}>
                <div className="container">
                    <div className="article-meta">
                        <span className="news-category" style={{ display: 'inline-block', marginBottom: '1rem', background: '#e8f5e9', color: '#2e7d32' }}>
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
                            <div className="prime-card" key={idx} style={{ background: '#ffffff', border: '1px solid #e0e0e0', borderLeft: isRTL ? 'none' : '4px solid #2e7d32', borderRight: isRTL ? '4px solid #2e7d32' : 'none' }}>
                                <div className="prime-icon">
                                    {renderIcon(prime.icon)}
                                </div>
                                <div>
                                    <h3 className="prime-title" style={{ color: '#2e7d32' }}>{prime.title}</h3>
                                    <p style={{ color: '#555' }}>{prime.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="article-example-box" style={{ background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.05) 0%, rgba(203, 160, 82, 0.1) 100%)', border: '1px solid #81c784' }}>
                        <h3 className="example-title" style={{ color: '#2e7d32' }}>{t.exampleTitle}</h3>
                        <p style={{ color: '#444' }}>{t.exampleDesc}</p>
                    </div>

                    <div className="article-cta-box" style={{ background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)', color: 'white' }}>
                        <h2 style={{ color: 'white' }}>{t.ctaTitle}</h2>
                        <p style={{ opacity: 0.9 }}>{t.ctaDesc}</p>
                        <div className="article-cta-buttons">
                            <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--sand-gold)', color: 'white' }} onClick={() => window.location.hash = '#contact'}>
                                <CalendarCheck size={20} />
                                {t.btnCalendly}
                            </button>
                            <button className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderColor: 'white', color: 'white' }}>
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
