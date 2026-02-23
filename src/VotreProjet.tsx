import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Rocket, FolderPlus } from 'lucide-react';
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
        displayModeOptions: { teaser: "Mode Teaser (Détails anonymisés)", full: "Complet" }
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
        displayModeOptions: { teaser: "Teaser Mode (Anonymized details)", full: "Full details" }
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
        displayModeOptions: { teaser: "Modo Teaser (Detalles limitados)", full: "Detalles completos" }
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
        displayModeOptions: { teaser: "وضع تشويقي (تفاصيل مجهولة)", full: "تفاصيل كاملة" }
    }
};

export default function VotreProjet({ lang }: Omit<VotreProjetProps, 'onBack'>) {
    const t = CONTENT[lang];
    const isRTL = lang === 'ar';
    const [session, setSession] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
    const [sectors, setSectors] = useState<{ id: string, label_fr: string, label_en: string, label_ar: string }[]>([]);

    const [formState, setFormState] = useState({
        contact_email: '', contact_phone: '', organization: '', project_size: '', project_sector: '',
        funding_needed: '', partner_needs: '', expected_yields: '', description: '', location: '',
        visibility: 'public', display_mode: 'full'
    });
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

        return () => subscription.unsubscribe();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('loading');

        try {
            const { error } = await supabase.from('project_requests').insert({
                ...formState,
                // Assign to user if they are logged in. (Or link email if wanted)
                contact_email: session?.user?.email || formState.contact_email,
                contact_name: formState.organization || 'Contact', // Added default to bypass NOT NULL constraint
            });

            if (error) {
                console.error(error);
                setFormStatus('error');
            } else {
                setFormStatus('success');
                setFormState({
                    contact_email: '', contact_phone: '', organization: '', project_size: '', project_sector: '',
                    funding_needed: '', partner_needs: '', expected_yields: '', description: '', location: '',
                    visibility: 'public', display_mode: 'full'
                });
            }
        } catch (err) {
            console.error(err);
            setFormStatus('error');
        }
    };

    return (
        <section id="votreprojet" className="votreprojet-section bg-alt" dir={isRTL ? "rtl" : "ltr"}>
            <div className="container">
                <div className="section-header text-center mb-5" style={{ paddingBottom: '2rem' }}>
                    <h2 className="section-title">{t.title}</h2>
                    <p className="section-subtitle">{t.subtitle}</p>
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
                    ) : (
                        <div className="shadow-form" style={{ background: '#fff', padding: '3rem', borderRadius: '16px', borderTop: '4px solid var(--sand-gold)' }}>
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

                                <button className="btn btn-primary w-full" type="submit" disabled={formStatus === 'loading'} style={{ marginTop: '2rem' }}>
                                    <Rocket size={20} className="mr-2" style={{ marginRight: '8px' }} /> {formStatus === 'loading' ? '...' : t.submit}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
