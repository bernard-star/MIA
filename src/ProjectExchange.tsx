import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { ArrowLeft, MapPin, Briefcase, Handshake, CircleDollarSign, Fingerprint } from 'lucide-react';
import './App.css';

type ProjectExchangeProps = {
    lang: 'fr' | 'en' | 'es' | 'ar';
    onBack: () => void;
};

type Project = {
    id: string;
    contact_name: string;
    organization: string;
    project_sector: string;
    project_size: string;
    funding_needed: string;
    partner_needs: string;
    expected_yields: string;
    description: string;
    location: string;
    display_mode: string;
    created_at: string;
};

const EXCHANGE_CONTENT = {
    fr: {
        back: "Retour à l'accueil",
        title: "Bourse d'Échanges de Projets",
        subtitle: "Découvrez les opportunités d'investissement et trouvez vos futurs partenaires.",
        loading: "Chargement des projets...",
        noProjects: "Aucun projet public disponible pour le moment.",
        location: "Localisation",
        sector: "Secteur",
        size: "Taille du projet",
        funding: "Besoins",
        partners: "Partenaires",
        yields: "Rendement",
        teaser: "Version Teaser (Détails masqués par le porteur)",
        full: "Projet Complet",
        contact: "Contacter le porteur (via MIA)"
    },
    en: {
        back: "Back to Home",
        title: "Project Exchange Board",
        subtitle: "Discover investment opportunities and find your future partners.",
        loading: "Loading projects...",
        noProjects: "No public projects available at the moment.",
        location: "Location",
        sector: "Sector",
        size: "Project Size",
        funding: "Funding",
        partners: "Partners",
        yields: "Yields",
        teaser: "Teaser Version (Details hidden by creator)",
        full: "Full Project",
        contact: "Contact creator (via MIA)"
    },
    es: {
        back: "Volver al inicio",
        title: "Bolsa de Intercambio de Proyectos",
        subtitle: "Descubre oportunidades de inversión y encuentra a tus futuros socios.",
        loading: "Cargando proyectos...",
        noProjects: "No hay proyectos públicos disponibles en este momento.",
        location: "Ubicación",
        sector: "Sector",
        size: "Tamaño del proyecto",
        funding: "Fondos",
        partners: "Socios",
        yields: "Rendimiento",
        teaser: "Versión Teaser (Detalles ocultos por el creador)",
        full: "Proyecto Completo",
        contact: "Contactar al creador (vía MIA)"
    },
    ar: {
        back: "العودة إلى الرئيسية",
        title: "بورصة تبادل المشاريع",
        subtitle: "اكتشف فرص الاستثمار واعثر على شركائك المستقبليين.",
        loading: "جارٍ تحميل المشاريع...",
        noProjects: "لا توجد مشاريع عامة متاحة في الوقت الحالي.",
        location: "الموقع",
        sector: "القطاع",
        size: "حجم المشروع",
        funding: "التمويل",
        partners: "الشركاء",
        yields: "العائد",
        teaser: "نسخة دعائية (تم إخفاء التفاصيل من قبل المنشئ)",
        full: "المشروع بالكامل",
        contact: "اتصل بالمنشئ (عبر MIA)"
    }
};

export default function ProjectExchange({ lang, onBack }: ProjectExchangeProps) {
    const t = EXCHANGE_CONTENT[lang];
    const isRTL = lang === 'ar';

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('project_requests')
                .select('*')
                .eq('visibility', 'public')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching projects:', error);
            } else {
                setProjects(data || []);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    return (
        <div className={`article-page ${isRTL ? 'arabic-text' : ''}`} dir={isRTL ? "rtl" : "ltr"}>
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

            <header className="article-header" style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--light-bg)' }}>
                <div className="container">
                    <h1 className="article-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t.title}</h1>
                    <p className="article-intro" style={{ fontSize: '1.25rem', opacity: 0.8 }}>{t.subtitle}</p>
                </div>
            </header>

            <main className="container" style={{ padding: '4rem 0', minHeight: '50vh' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.5rem', color: 'var(--text-gray)' }}>
                        {t.loading}
                    </div>
                ) : projects.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.5rem', color: 'var(--text-gray)', border: '2px dashed var(--royal-blue)', borderRadius: '12px' }}>
                        {t.noProjects}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {projects.map(project => {
                            const isPartial = project.display_mode === 'partial';
                            return (
                                <div key={project.id} className="shadow-form" style={{ background: 'white', padding: '2rem', borderRadius: '16px', borderTop: '4px solid var(--sand-gold)', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                                            {isPartial ? t.teaser : project.organization || 'Projet Anonyme'}
                                        </h3>
                                        <span style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '20px', background: isPartial ? '#f3f4f6' : 'var(--royal-blue)', color: isPartial ? '#4b5563' : 'white', fontWeight: 600 }}>
                                            {isPartial ? 'Teaser' : 'Full'}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Briefcase size={18} color="var(--royal-blue)" />
                                            <strong>{t.sector}:</strong> {project.project_sector || '-'}
                                        </div>
                                        {project.location && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <MapPin size={18} color="var(--royal-blue)" />
                                                <strong>{t.location}:</strong> {project.location}
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Fingerprint size={18} color="var(--royal-blue)" />
                                            <strong>{t.size}:</strong> {isPartial ? '***' : project.project_size || '-'}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <CircleDollarSign size={18} color="var(--royal-blue)" />
                                            <strong>{t.funding}:</strong> {project.funding_needed || '-'}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Handshake size={18} color="var(--royal-blue)" />
                                            <strong>{t.partners}:</strong> {project.partner_needs || '-'}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <strong>{t.yields}:</strong> {isPartial ? '***' : project.expected_yields || '-'}
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                                        <p style={{ margin: 0, fontStyle: isPartial ? 'italic' : 'normal', color: 'var(--text-gray)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {project.description}
                                        </p>
                                    </div>

                                    <a href="#contact" onClick={(e) => {
                                        e.preventDefault();
                                        onBack();
                                        setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                                    }} className="btn btn-outline" style={{ textAlign: 'center', marginTop: 'auto' }}>
                                        {t.contact}
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
