import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Rocket, FolderPlus, List, PlusCircle, Edit, Trash2 } from 'lucide-react';
import CurrencyInput from 'react-currency-input-field';
import './App.css';

type VotreProjetProps = {
    lang: 'fr' | 'en' | 'es' | 'ar';
    onBack: () => void;
};

const CONTENT = {
    fr: {
        back: "Retour à l'accueil",
        title: "Votre Projet",
        subtitle: "Déposez votre projet d'investissement pour le proposer à nos partenaires et l'afficher dans la Bourse d'Échanges.",
        authRequired: "Veuillez vous connecter ou créer un compte pour soumettre un projet.",
        email: "Adresse Email",
        phone: "Téléphone",
        organization: "Organisation / Entreprise",
        project_size: "Taille du projet (Investissement)",
        sector: "Secteur d'activité",
        funding: "Besoins de financement",
        partners: "Partenaires recherchés",
        yields: "Rendement attendu",
        message: "Description du projet",
        submit: "Soumettre le projet",
        success: "Votre projet a été soumis avec succès !",
        error: "Une erreur est survenue lors de la soumission.",
        location: "Localisation (Ville / Région)",
        visibility: "Visibilité",
        visibilityOptions: { public: "Public (Apparaît dans la Bourse d'Échanges)", private: "Privé (A l'usage du réseau de partenaires MIA)" },
        display_mode: "Mode d'affichage",
        displayModeOptions: { teaser: "Mode Teaser (Détails anonymisés)", full: "Complet" },
        myProjects: "Mes projets déposés",
        newProject: "Déposer un nouveau projet",
        noProjects: "Vous n'avez pas encore déposé de projet.",
        interactions: "Interactions",
        date: "Date de dépôt",
        statusLabel: "Statut",
        cancel: "Annuler",
        edit: "Modifier",
        delete: "Supprimer",
        confirmDelete: "Êtes-vous sûr de vouloir supprimer ce projet ?",
        saveChanges: "Enregistrer les modifications",
        moreDetails: "Plus de précisions",
        moreDetailsTitle: "Plus de précisions sur votre projet",
        role_position: "Role/Position*",
        moroccan_roots: "Do you or your co-founder have Moroccan roots?*",
        how_did_you_learn: "How did you first learn about MIA?*",
        project_name: "Project Name*",
        website_url: "Website URL",
        project_description: "Please Describe Your Project*",
        loom_url: "Please Paste Your Loom Screencast URL Below If You Have Recorded a Presentation with Your Voice (Maximum Duration: 5 Minutes)",
        pitch_deck: "Please Upload Your Pitch Deck & Business Plan*",
        head_office: "Where is your head office located*",
        additional_locations: "Additional locations",
        business_info_title: "BUSINESS INFORMATION",
        business_info_subtitle: "Please provide some key business information to help us assess your stage and investment readiness.",
        founding_year: "Which Year was your company founded? (ie 2023)*",
        main_country: "Main Country of Operation*",
        business_stage: "Current stage of your business?",
        current_arr: "Current Annual Recurring Revenues (ARR)*",
        projected_arr: "Projected ARR in 3 years?*",
        current_funding_round: "Current funding round (If applicable)?",
        investment_seeking: "Amount of investment you're seeking (in EUR)*",
        previously_raised: "Have you previously raised any funds?",
        referred_by: "If you have been referred by a VC Fund, a Business Angel or a StartUp, please share their name",
        yes: "Oui", no: "Non"
    },
    en: {
        back: "Back to Home",
        title: "Your Project",
        subtitle: "Submit your investment project to present it to our partners and list it in the Exchange Board.",
        authRequired: "Please sign in or create an account to submit a project.",
        email: "Email Address",
        phone: "Phone",
        organization: "Organization / Company",
        project_size: "Project Size (Investment)",
        sector: "Business Sector",
        funding: "Funding Needs",
        partners: "Partners Sought",
        yields: "Expected Yields",
        message: "Project Description",
        submit: "Submit Project",
        success: "Your project has been successfully submitted!",
        error: "An error occurred during submission.",
        location: "Location (City / Region)",
        visibility: "Visibility",
        visibilityOptions: { public: "Public (Appears on the Exchange Board)", private: "Private (MIA internal partner network only)" },
        display_mode: "Display Mode",
        displayModeOptions: { teaser: "Teaser Mode (Anonymized details)", full: "Full details" },
        myProjects: "My Submitted Projects",
        newProject: "Submit a New Project",
        noProjects: "You haven't submitted any projects yet.",
        interactions: "Interactions",
        date: "Submission Date",
        statusLabel: "Status",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
        confirmDelete: "Are you sure you want to delete this project?",
        saveChanges: "Save Changes",
        moreDetails: "More Details",
        moreDetailsTitle: "More Details About Your Project",
        role_position: "Role/Position*",
        moroccan_roots: "Do you or your co-founder have Moroccan roots?*",
        how_did_you_learn: "How did you first learn about MIA?*",
        project_name: "Project Name*",
        website_url: "Website URL",
        project_description: "Please Describe Your Project*",
        loom_url: "Please Paste Your Loom Screencast URL Below If You Have Recorded a Presentation with Your Voice (Maximum Duration: 5 Minutes)",
        pitch_deck: "Please Upload Your Pitch Deck & Business Plan*",
        head_office: "Where is your head office located*",
        additional_locations: "Additional locations",
        business_info_title: "BUSINESS INFORMATION",
        business_info_subtitle: "Please provide some key business information to help us assess your stage and investment readiness.",
        founding_year: "Which Year was your company founded? (ie 2023)*",
        main_country: "Main Country of Operation*",
        business_stage: "Current stage of your business?",
        current_arr: "Current Annual Recurring Revenues (ARR)*",
        projected_arr: "Projected ARR in 3 years?*",
        current_funding_round: "Current funding round (If applicable)?",
        investment_seeking: "Amount of investment you're seeking (in EUR)*",
        previously_raised: "Have you previously raised any funds?",
        referred_by: "If you have been referred by a VC Fund, a Business Angel or a StartUp, please share their name",
        yes: "Yes", no: "No"
    },
    es: {
        back: "Volver al inicio",
        title: "Tu Proyecto",
        subtitle: "Envía tu proyecto de inversión para presentarlo a nuestros socios y listarlo en la Bolsa de Intercambio.",
        authRequired: "Debes iniciar sesión o crear una cuenta para enviar un proyecto.",
        email: "Correo electrónico",
        phone: "Teléfono",
        organization: "Organización / Empresa",
        project_size: "Tamaño del proyecto (Inversión)",
        sector: "Sector de actividad",
        funding: "Necesidades de financiación",
        partners: "Socios buscados",
        yields: "Rendimiento esperado",
        message: "Descripción del proyecto",
        submit: "Enviar proyecto",
        success: "¡Tu proyecto ha sido enviado con éxito!",
        error: "Se produjo un error durante el envío.",
        location: "Ubicación (Ciudad / Región)",
        visibility: "Visibilidad",
        visibilityOptions: { public: "Público (Aparece en la Bolsa de Intercambio)", private: "Privado (Red interna de socios de MIA)" },
        display_mode: "Modo de visualización",
        displayModeOptions: { teaser: "Modo Teaser (Detalles limitados)", full: "Detalles completos" },
        myProjects: "Mis Proyectos Enviados",
        newProject: "Enviar un Nuevo Proyecto",
        noProjects: "Aún no has enviado ningún proyecto.",
        interactions: "Interacciones",
        date: "Fecha de Envío",
        statusLabel: "Estado",
        cancel: "Cancelar",
        edit: "Editar",
        delete: "Eliminar",
        confirmDelete: "¿Estás seguro de que quieres eliminar este proyecto?",
        saveChanges: "Guardar Cambios",
        moreDetails: "Más Detalles",
        moreDetailsTitle: "Más Detalles Sobre Tu Proyecto",
        role_position: "Role/Position*",
        moroccan_roots: "Do you or your co-founder have Moroccan roots?*",
        how_did_you_learn: "How did you first learn about MIA?*",
        project_name: "Project Name*",
        website_url: "Website URL",
        project_description: "Please Describe Your Project*",
        loom_url: "Please Paste Your Loom Screencast URL Below If You Have Recorded a Presentation with Your Voice (Maximum Duration: 5 Minutes)",
        pitch_deck: "Please Upload Your Pitch Deck & Business Plan*",
        head_office: "Where is your head office located*",
        additional_locations: "Additional locations",
        business_info_title: "BUSINESS INFORMATION",
        business_info_subtitle: "Please provide some key business information to help us assess your stage and investment readiness.",
        founding_year: "Which Year was your company founded? (ie 2023)*",
        main_country: "Main Country of Operation*",
        business_stage: "Current stage of your business?",
        current_arr: "Current Annual Recurring Revenues (ARR)*",
        projected_arr: "Projected ARR in 3 years?*",
        current_funding_round: "Current funding round (If applicable)?",
        investment_seeking: "Amount of investment you're seeking (in EUR)*",
        previously_raised: "Have you previously raised any funds?",
        referred_by: "If you have been referred by a VC Fund, a Business Angel or a StartUp, please share their name",
        yes: "Sí", no: "No"
    },
    ar: {
        back: "العودة إلى الرئيسية",
        title: "مشروعك",
        subtitle: "أرسل مشروعك الاستثماري لعرضه على شركائنا وإدراجه في بورصة تبادل المشاريع.",
        authRequired: "يرجى تسجيل الدخول أو إنشاء حساب لتقديم مشروع.",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        organization: "المنظمة / الشركة",
        project_size: "حجم المشروع (الاستثمار)",
        sector: "قطاع الأعمال",
        funding: "التمويل المطلوب",
        partners: "الشركاء المطلوبين",
        yields: "العائد المتوقع",
        message: "وصف المشروع",
        submit: "تقديم المشروع",
        success: "تم تقديم المشروع بنجاح!",
        error: "حدث خطأ أثناء التقديم.",
        location: "الموقع (المدينة / المنطقة)",
        visibility: "الظهور",
        visibilityOptions: { public: "عام (يظهر في بورصة المشاريع)", private: "خاص (لشركاء MIA فقط)" },
        display_mode: "وضع العرض",
        displayModeOptions: { teaser: "وضع تشويقي (تفاصيل مجهولة)", full: "تفاصيل كاملة" },
        myProjects: "مشاريعي المقدمة",
        newProject: "تقديم مشروع جديد",
        noProjects: "لم تقم بتقديم أي مشاريع بعد.",
        interactions: "التفاعلات",
        date: "تاريخ التقديم",
        statusLabel: "الحالة",
        cancel: "إلغاء",
        edit: "تعديل",
        delete: "حذف",
        confirmDelete: "هل أنت متأكد أنك تريد حذف هذا المشروع؟",
        saveChanges: "حفظ التغييرات",
        moreDetails: "المزيد من التفاصيل",
        moreDetailsTitle: "المزيد من التفاصيل حول مشروعك",
        role_position: "Role/Position*",
        moroccan_roots: "Do you or your co-founder have Moroccan roots?*",
        how_did_you_learn: "How did you first learn about MIA?*",
        project_name: "Project Name*",
        website_url: "Website URL",
        project_description: "Please Describe Your Project*",
        loom_url: "Please Paste Your Loom Screencast URL Below If You Have Recorded a Presentation with Your Voice (Maximum Duration: 5 Minutes)",
        pitch_deck: "Please Upload Your Pitch Deck & Business Plan*",
        head_office: "Where is your head office located*",
        additional_locations: "Additional locations",
        business_info_title: "BUSINESS INFORMATION",
        business_info_subtitle: "Please provide some key business information to help us assess your stage and investment readiness.",
        founding_year: "Which Year was your company founded? (ie 2023)*",
        main_country: "Main Country of Operation*",
        business_stage: "Current stage of your business?",
        current_arr: "Current Annual Recurring Revenues (ARR)*",
        projected_arr: "Projected ARR in 3 years?*",
        current_funding_round: "Current funding round (If applicable)?",
        investment_seeking: "Amount of investment you're seeking (in EUR)*",
        previously_raised: "Have you previously raised any funds?",
        referred_by: "If you have been referred by a VC Fund, a Business Angel or a StartUp, please share their name",
        yes: "نعم", no: "لا"
    }
};

export default function VotreProjet({ lang }: Omit<VotreProjetProps, 'onBack'>) {
    const t = CONTENT[lang];
    const isRTL = lang === 'ar';
    const [session, setSession] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
    const [sectors, setSectors] = useState<{ id: string, label_fr: string, label_en: string, label_ar: string }[]>([]);
    const [view, setView] = useState<'list' | 'form'>('list');

    const [userProjects, setUserProjects] = useState<any[]>([]);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

    const initialFormState = {
        contact_email: '', contact_phone: '', organization: '', project_size: '', project_sector: '',
        funding_needed: '', partner_needs: '', expected_yields: '', description: '', location: '',
        visibility: 'public', display_mode: 'full',
        role_position: '', moroccan_roots: '', how_did_you_learn: '', project_name: '', website_url: '',
        detailed_description: '', loom_url: '', pitch_deck_url: '', head_office: '', additional_locations: '',
        founding_year: '', main_country: '', business_stage: '', current_arr: '', projected_arr: '',
        current_funding_round: '', investment_seeking_eur: '', previously_raised_funds: '', referred_by: ''
    };
    const [formState, setFormState] = useState(initialFormState);
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        supabase.from('project_sectors').select('*').then(({ data }) => {
            if (data) setSectors(data);
        });

        if (session) {
            fetchUserProjects(session.user.email);
        }

        return () => subscription.unsubscribe();
    }, [session]);

    const fetchUserProjects = async (email: string) => {
        const { data, error } = await supabase.from('project_requests').select('*').eq('contact_email', email).order('created_at', { ascending: false });
        if (data && !error) {
            setUserProjects(data);
        }
    };

    const handleEditProject = (project: any) => {
        setFormState({
            contact_email: project.contact_email || '',
            contact_phone: project.contact_phone || '',
            organization: project.organization || '',
            project_size: project.project_size || '',
            project_sector: project.project_sector || '',
            funding_needed: project.funding_needed || '',
            partner_needs: project.partner_needs || '',
            expected_yields: project.expected_yields || '',
            description: project.description || '',
            location: project.location || '',
            visibility: project.visibility || 'public',
            display_mode: project.display_mode || 'full',
            role_position: project.role_position || '',
            moroccan_roots: project.moroccan_roots || '',
            how_did_you_learn: project.how_did_you_learn || '',
            project_name: project.project_name || '',
            website_url: project.website_url || '',
            detailed_description: project.detailed_description || '',
            loom_url: project.loom_url || '',
            pitch_deck_url: project.pitch_deck_url || '',
            head_office: project.head_office || '',
            additional_locations: project.additional_locations || '',
            founding_year: project.founding_year || '',
            main_country: project.main_country || '',
            business_stage: project.business_stage || '',
            current_arr: project.current_arr || '',
            projected_arr: project.projected_arr || '',
            current_funding_round: project.current_funding_round || '',
            investment_seeking_eur: project.investment_seeking_eur || '',
            previously_raised_funds: project.previously_raised_funds || '',
            referred_by: project.referred_by || ''
        });
        setEditingProjectId(project.id);

        setView('form');
    };

    const handleDeleteProject = async (id: string) => {
        if (window.confirm(t.confirmDelete)) {
            await supabase.from('project_requests').delete().eq('id', id);
            if (session?.user?.email) fetchUserProjects(session.user.email);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('loading');

        try {
            const payload = {
                ...formState,
                // Assign to user if they are logged in. (Or link email if wanted)
                contact_email: session?.user?.email || formState.contact_email,
                contact_name: formState.organization || 'Contact', // Added default to bypass NOT NULL constraint
            };

            let error;
            if (editingProjectId) {
                const { error: updateError } = await supabase.from('project_requests').update(payload).eq('id', editingProjectId);
                error = updateError;
            } else {
                const { error: insertError } = await supabase.from('project_requests').insert(payload);
                error = insertError;
            }

            if (error) {
                console.error(error);
                setFormStatus('error');
            } else {
                setFormStatus('success');
                setFormState(initialFormState);

                setEditingProjectId(null);
                if (session?.user?.email) fetchUserProjects(session.user.email);
                setTimeout(() => setView('list'), 2000);
            }
        } catch (err) {
            console.error(err);
            setFormStatus('error');
        }
    };

    return (
        <section id="votreprojet" className="votreprojet-section bg-alt" dir={isRTL ? "rtl" : "ltr"}>
            <div className="container">
                <div className="section-header text-center mb-2" style={{ paddingBottom: '0.5rem' }}>
                    <h2 className="section-title">{t.title}</h2>
                    <p className="section-subtitle mb-0">{t.subtitle}</p>
                </div>

                <div className="votreprojet-content" style={{ minHeight: '40vh', maxWidth: '800px', margin: '0 auto' }}>
                    {!session ? (
                        <div className="shadow-form" style={{ background: '#fff', padding: '3rem', borderRadius: '16px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <FolderPlus size={48} color="var(--royal-blue)" style={{ margin: '0 auto 1rem' }} />
                                <h3>{t.authRequired}</h3>
                            </div>
                            <Auth
                                supabaseClient={supabase}
                                appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: 'var(--royal-blue)', brandAccent: 'var(--royal-blue-dark)' } } } }}
                                providers={['google']}
                                redirectTo={typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : undefined}
                            />
                        </div>
                    ) : view === 'list' ? (
                        <div className="projects-list-view">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3><List size={24} style={{ display: 'inline-block', marginRight: '10px', verticalAlign: 'middle', color: 'var(--royal-blue)' }} /> {t.myProjects}</h3>
                                <button className="btn btn-primary" onClick={() => setView('form')}>
                                    <PlusCircle size={18} className="mr-2" style={{ marginRight: '8px' }} /> {t.newProject}
                                </button>
                            </div>

                            {userProjects.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '16px', border: '1px dashed #ccc' }}>
                                    <p style={{ color: '#666' }}>{t.noProjects}</p>
                                    <button className="btn btn-primary mt-3" onClick={() => {
                                        setEditingProjectId(null);
                                        setFormState({
                                            contact_email: '', contact_phone: '', organization: '', project_size: '', project_sector: '',
                                            funding_needed: '', partner_needs: '', expected_yields: '', description: '', location: '',
                                            visibility: 'public', display_mode: 'full'
                                        });
                                        setView('form');
                                    }}>{t.newProject}</button>
                                </div>
                            ) : (
                                <div className="projects-grid" style={{ display: 'grid', gap: '1.5rem' }}>
                                    {userProjects.map((p) => (
                                        <div key={p.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--royal-blue)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <h4 style={{ margin: 0, fontWeight: 600, color: 'var(--charcoal)' }}>{p.organization} - {p.project_size}</h4>
                                                <span style={{ fontSize: '0.85rem', color: '#888' }}>{new Date(p.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p style={{ margin: '0 0 1rem', color: '#555', fontSize: '0.95rem' }}>{p.description}</p>

                                            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                                <div><strong>{t.statusLabel}:</strong> <span style={{ color: 'var(--royal-blue)', background: 'rgba(30, 60, 114, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{t.visibilityOptions[p.visibility as 'public' | 'private']}</span></div>
                                                <div><strong>{t.interactions}:</strong> <span style={{ color: '#666' }}>0</span></div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button onClick={() => handleEditProject(p)} style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: '1px solid #ddd', padding: '0.4rem 0.8rem', borderRadius: '6px', color: 'var(--charcoal)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s' }} className="hover-bg-light">
                                                    <Edit size={14} style={{ marginRight: '6px' }} /> {t.edit}
                                                </button>
                                                <button onClick={() => handleDeleteProject(p.id)} style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: '1px solid #ffd4d4', padding: '0.4rem 0.8rem', borderRadius: '6px', color: '#e53e3e', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s' }} className="hover-bg-red">
                                                    <Trash2 size={14} style={{ marginRight: '6px' }} /> {t.delete}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="shadow-form" style={{ background: '#fff', padding: '3rem', borderRadius: '16px', borderTop: '4px solid var(--sand-gold)' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                                <button onClick={() => {
                                    setEditingProjectId(null);
                                    setFormState(initialFormState);
                                    setView('list');
                                }} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    {t.cancel}
                                </button>
                            </div>
                            <form className="contact-form" onSubmit={handleFormSubmit}>
                                {formStatus === 'success' && <div style={{ color: 'green', marginBottom: '1.5rem', fontWeight: 600, padding: '1rem', background: '#eafbf0', borderRadius: '8px' }}>{t.success}</div>}
                                {formStatus === 'error' && <div style={{ color: 'red', marginBottom: '1.5rem', fontWeight: 600, padding: '1rem', background: '#ffebeb', borderRadius: '8px' }}>{t.error}</div>}

                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label>{t.email}</label>
                                        <input type="email" placeholder={t.email} required value={formState.contact_email || session.user.email} onChange={(e) => setFormState({ ...formState, contact_email: e.target.value })} disabled />
                                    </div>
                                    <div>
                                        <label>{t.phone}</label>
                                        <input type="text" placeholder={t.phone} required value={formState.contact_phone} onChange={(e) => setFormState({ ...formState, contact_phone: e.target.value })} />
                                    </div>
                                </div>

                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                                    <div>
                                        <label>{t.organization}</label>
                                        <input type="text" placeholder={t.organization} required value={formState.organization} onChange={(e) => setFormState({ ...formState, organization: e.target.value })} />
                                    </div>
                                    <div>
                                        <label>{t.project_size}</label>
                                        <CurrencyInput
                                            id="project_size"
                                            name="project_size"
                                            placeholder="ex: 50,000,000 MAD"
                                            defaultValue={formState.project_size}
                                            decimalsLimit={2}
                                            onValueChange={(value) => setFormState({ ...formState, project_size: value || '' })}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                    <label>{t.sector}</label>
                                    <select required value={formState.project_sector} onChange={(e) => setFormState({ ...formState, project_sector: e.target.value })}>
                                        <option value="">Sélectionnez / Select</option>
                                        {sectors.map(s => (
                                            <option key={s.id} value={s.id}>
                                                {lang === 'fr' ? s.label_fr : lang === 'ar' ? s.label_ar : s.label_en}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                                    <div>
                                        <label>{t.funding}</label>
                                        <input type="text" placeholder="ex: 80%" required value={formState.funding_needed} onChange={(e) => setFormState({ ...formState, funding_needed: e.target.value })} />
                                    </div>
                                    <div>
                                        <label>{t.partners}</label>
                                        <input type="text" placeholder="ex: Joint venture" required value={formState.partner_needs} onChange={(e) => setFormState({ ...formState, partner_needs: e.target.value })} />
                                    </div>
                                    <div>
                                        <label>{t.yields}</label>
                                        <input type="text" placeholder="ex: 12% IRR" required value={formState.expected_yields} onChange={(e) => setFormState({ ...formState, expected_yields: e.target.value })} />
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                    <label>{t.location}</label>
                                    <input type="text" placeholder="ex: Dakhla, Casablanca..." required value={formState.location} onChange={(e) => setFormState({ ...formState, location: e.target.value })} />
                                </div>

                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                                    <div>
                                        <label>{t.visibility}</label>
                                        <select required value={formState.visibility} onChange={(e) => setFormState({ ...formState, visibility: e.target.value })}>
                                            <option value="public">{t.visibilityOptions.public}</option>
                                            <option value="private">{t.visibilityOptions.private}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>{t.display_mode}</label>
                                        <select required value={formState.display_mode} onChange={(e) => setFormState({ ...formState, display_mode: e.target.value })}>
                                            <option value="full">{t.displayModeOptions.full}</option>
                                            <option value="partial">{t.displayModeOptions.teaser}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                    <label>{t.message}</label>
                                    <textarea rows={6} required placeholder={t.message} value={formState.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })}></textarea>
                                </div>

                                <div className="more-details-section" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px dashed #ddd' }}>
                                    <h3 style={{ marginBottom: '0.5rem', color: 'var(--royal-blue)' }}>{t.moreDetailsTitle}</h3>
                                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Optionnel mais recommandé.</p>

                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label>{t.role_position}</label>
                                            <input type="text" value={formState.role_position} onChange={(e) => setFormState({ ...formState, role_position: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label>{t.moroccan_roots}</label>
                                            <select value={formState.moroccan_roots} onChange={(e) => setFormState({ ...formState, moroccan_roots: e.target.value })} required>
                                                <option value="">Sélectionnez / Select</option>
                                                <option value="yes">{t.yes}</option>
                                                <option value="no">{t.no}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <label>{t.how_did_you_learn}</label>
                                        <input type="text" value={formState.how_did_you_learn} onChange={(e) => setFormState({ ...formState, how_did_you_learn: e.target.value })} required />
                                    </div>

                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label>{t.project_name}</label>
                                            <input type="text" value={formState.project_name} onChange={(e) => setFormState({ ...formState, project_name: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label>{t.website_url}</label>
                                            <input type="url" placeholder="https://" value={formState.website_url} onChange={(e) => setFormState({ ...formState, website_url: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <label>{t.project_description}</label>
                                        <textarea rows={4} value={formState.detailed_description} onChange={(e) => setFormState({ ...formState, detailed_description: e.target.value })} required></textarea>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <label>{t.loom_url}</label>
                                        <input type="url" placeholder="https://loom.com/share/..." value={formState.loom_url} onChange={(e) => setFormState({ ...formState, loom_url: e.target.value })} />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <label>{t.pitch_deck}</label>
                                        <input type="text" placeholder="URL link to Pitch Deck or File Drive..." value={formState.pitch_deck_url} onChange={(e) => setFormState({ ...formState, pitch_deck_url: e.target.value })} required />
                                        <small style={{ color: '#888', display: 'block', margin: '4px 0 0 2px' }}>Veuillez coller un lien vers votre document (Google Drive, Dropbox, un site...).</small>
                                    </div>

                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label>{t.head_office}</label>
                                            <input type="text" value={formState.head_office} onChange={(e) => setFormState({ ...formState, head_office: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label>{t.additional_locations}</label>
                                            <input type="text" value={formState.additional_locations} onChange={(e) => setFormState({ ...formState, additional_locations: e.target.value })} />
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
                                        <h4 style={{ color: 'var(--charcoal)', fontWeight: 600, margin: 0 }}>{t.business_info_title}</h4>
                                        <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>{t.business_info_subtitle}</p>
                                    </div>

                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label>{t.founding_year}</label>
                                            <input type="text" placeholder="ex: 2023" value={formState.founding_year} onChange={(e) => setFormState({ ...formState, founding_year: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label>{t.main_country}</label>
                                            <input type="text" value={formState.main_country} onChange={(e) => setFormState({ ...formState, main_country: e.target.value })} required />
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label>{t.business_stage}</label>
                                            <select value={formState.business_stage} onChange={(e) => setFormState({ ...formState, business_stage: e.target.value })}>
                                                <option value="">Sélectionnez / Select</option>
                                                <option value="Idea">Idea</option>
                                                <option value="MVP">MVP</option>
                                                <option value="Early Revenue">Early Revenue</option>
                                                <option value="Growth">Growth</option>
                                                <option value="Profitable">Profitable</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>{t.current_funding_round}</label>
                                            <select value={formState.current_funding_round} onChange={(e) => setFormState({ ...formState, current_funding_round: e.target.value })}>
                                                <option value="">Sélectionnez / Select</option>
                                                <option value="Pre-seed">Pre-seed</option>
                                                <option value="Seed">Seed</option>
                                                <option value="Series A">Series A</option>
                                                <option value="Series B+">Series B+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label>{t.current_arr}</label>
                                            <input type="text" value={formState.current_arr} onChange={(e) => setFormState({ ...formState, current_arr: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label>{t.projected_arr}</label>
                                            <input type="text" value={formState.projected_arr} onChange={(e) => setFormState({ ...formState, projected_arr: e.target.value })} required />
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label>{t.investment_seeking}</label>
                                            <input type="text" value={formState.investment_seeking_eur} onChange={(e) => setFormState({ ...formState, investment_seeking_eur: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label>{t.previously_raised}</label>
                                            <select value={formState.previously_raised_funds} onChange={(e) => setFormState({ ...formState, previously_raised_funds: e.target.value })}>
                                                <option value="">Sélectionnez / Select</option>
                                                <option value="yes">{t.yes}</option>
                                                <option value="no">{t.no}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <label>{t.referred_by}</label>
                                        <input type="text" value={formState.referred_by} onChange={(e) => setFormState({ ...formState, referred_by: e.target.value })} />
                                    </div>
                                </div>



                                <button className="btn btn-primary w-full" type="submit" disabled={formStatus === 'loading'} style={{ marginTop: '1rem' }}>
                                    <Rocket size={20} className="mr-2" style={{ marginRight: '8px' }} /> {formStatus === 'loading' ? '...' : editingProjectId ? t.saveChanges : t.submit}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
