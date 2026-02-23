import { useState } from 'react';
import { supabase } from './lib/supabase';
import { BriefcaseBusiness, Lightbulb, UserPlus, LogIn, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import './App.css';

type InscriptionProps = {
    lang: 'fr' | 'en' | 'es' | 'ar';
    onBack?: () => void;
};

const CONTENT = {
    fr: {
        title: "Créer un compte",
        subtitle: "Rejoignez la première plateforme d'investissement stratégique au Maroc.",
        loginTitle: "Connexion",
        loginSubtitle: "Accédez à votre compte",
        step1Title: "Qui êtes-vous ?",
        step1Desc: "Sélectionnez le profil qui correspond le mieux à votre situation.",
        roleCreator: "Porteur de projet",
        roleCreatorDesc: "J'ai un projet d'investissement et je cherche des financements ou des partenaires.",
        rolePartner: "Partenaire / Investisseur",
        rolePartnerDesc: "Je souhaite découvrir des opportunités et accompagner des projets prometteurs.",
        step2Title: "Vos informations de connexion",
        email: "Adresse Email",
        password: "Mot de passe",
        signup: "S'inscrire",
        submitLogin: "Se connecter",
        back: "Retour",
        success: "Inscription réussie ! Veuillez vérifier votre email.",
        error: "Erreur de connexion.",
        loginInstead: "Déjà un compte ? Se connecter",
        signupInstead: "Pas de compte ? S'inscrire",
    },
    en: {
        title: "Create an account",
        subtitle: "Join the leading strategic investment platform in Morocco.",
        loginTitle: "Login",
        loginSubtitle: "Access your account",
        step1Title: "Who are you?",
        step1Desc: "Select the profile that best fits your situation.",
        roleCreator: "Project Creator",
        roleCreatorDesc: "I have an investment project and I'm looking for funding or partners.",
        rolePartner: "Partner / Investor",
        rolePartnerDesc: "I want to discover opportunities and support promising projects.",
        step2Title: "Your login details",
        email: "Email Address",
        password: "Password",
        signup: "Sign Up",
        submitLogin: "Login",
        back: "Back",
        success: "Signup successful! Please check your email.",
        error: "Connection error.",
        loginInstead: "Already have an account? Log in",
        signupInstead: "No account? Sign up",
    },
    es: {
        title: "Crear una cuenta",
        subtitle: "Únete a la principal plataforma de inversión estratégica en Marruecos.",
        loginTitle: "Iniciar sesión",
        loginSubtitle: "Accede a tu cuenta",
        step1Title: "¿Quién es usted?",
        step1Desc: "Seleccione el perfil que mejor se adapte a su situación.",
        roleCreator: "Creador de proyectos",
        roleCreatorDesc: "Tengo un proyecto de inversión y busco financiación o socios.",
        rolePartner: "Socio / Inversor",
        rolePartnerDesc: "Quiero descubrir oportunidades y apoyar proyectos prometedores.",
        step2Title: "Sus datos de acceso",
        email: "Correo electrónico",
        password: "Contraseña",
        signup: "Registrarse",
        submitLogin: "Iniciar sesión",
        back: "Atrás",
        success: "¡Registro exitoso! Por favor, revise su correo electrónico.",
        error: "Error de conexión.",
        loginInstead: "¿Ya tiene una cuenta? Iniciar sesión",
        signupInstead: "¿No tienes cuenta? Regístrate",
    },
    ar: {
        title: "إنشاء حساب",
        subtitle: "انضم إلى منصة الاستثمار الاستراتيجي الرائدة في المغرب.",
        loginTitle: "تسجيل الدخول",
        loginSubtitle: "الوصول إلى حسابك",
        step1Title: "من أنت؟",
        step1Desc: "حدد الملف الشخصي الذي يناسب وضعك.",
        roleCreator: "صاحب مشروع",
        roleCreatorDesc: "لدي مشروع استثماري وأبحث عن تمويل أو شركاء.",
        rolePartner: "شريك / مستثمر",
        rolePartnerDesc: "أريد اكتشاف الفرص ودعم المشاريع الواعدة.",
        step2Title: "تفاصيل تسجيل الدخول الخاصة بك",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        signup: "اشتراك",
        submitLogin: "تسجيل الدخول",
        back: "رجوع",
        success: "تم التسجيل بنجاح! يرجى التحقق من بريدك الإلكتروني.",
        error: "خطأ في الاتصال.",
        loginInstead: "لدي حساب بالفعل؟ تسجيل الدخول",
        signupInstead: "ليس لديك حساب؟ اشتراك",
    }
};

export default function Inscription({ lang, onBack }: InscriptionProps) {
    const t = CONTENT[lang] || CONTENT.fr;
    const isRTL = lang === 'ar';

    const [mode, setMode] = useState<'signup' | 'login'>(
        () => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'login') ? 'login' : 'signup'
    );
    const [step, setStep] = useState<1 | 2>(1);
    const [role, setRole] = useState<'PROMOTER' | 'PARTNER' | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRoleSelect = (selectedRole: 'PROMOTER' | 'PARTNER') => {
        setRole(selectedRole);
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            user_role: role
                        }
                    }
                });

                if (error) {
                    setStatus('error');
                    setErrorMessage(error.message);
                } else {
                    setStatus('success');
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) {
                    setStatus('error');
                    setErrorMessage(error.message);
                } else {
                    if (onBack) onBack();
                    else window.location.href = '/opportunites/votreprojet';
                }
            }
        } catch (err: unknown) {
            setStatus('error');
            setErrorMessage(err instanceof Error ? err.message : String(err) || t.error);
        }
    };

    return (
        <section className="inscription-section bg-alt" style={{ padding: '4rem 0', minHeight: '80vh' }} dir={isRTL ? "rtl" : "ltr"}>
            <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="text-center mb-5">
                    <h2 className="section-title">{mode === 'signup' ? t.title : t.loginTitle}</h2>
                    <p className="section-subtitle">{mode === 'signup' ? t.subtitle : t.loginSubtitle}</p>
                </div>

                <div className="shadow-form" style={{ background: '#fff', padding: '3rem', borderRadius: '16px', position: 'relative' }}>

                    {mode === 'signup' && step === 2 && (
                        <button
                            onClick={() => setStep(1)}
                            type="button"
                            style={{ position: 'absolute', top: '20px', left: isRTL ? 'auto' : '20px', right: isRTL ? '20px' : 'auto', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-light)' }}
                        >
                            <ChevronLeft size={20} /> <span style={{ fontSize: '0.9rem' }}>{t.back}</span>
                        </button>
                    )}

                    {status === 'success' && mode === 'signup' ? (
                        <div className="text-center">
                            <div style={{ width: '60px', height: '60px', background: '#eafbf0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <UserPlus size={30} color="green" />
                            </div>
                            <h3 style={{ color: 'green', marginBottom: '1rem' }}>{t.success}</h3>
                            <button className="btn btn-outline mt-3" onClick={() => setMode('login')}>
                                {t.loginInstead}
                            </button>
                        </div>
                    ) : (
                        <>
                            {mode === 'signup' && step === 1 && (
                                <div className="step-1 animate-fade-in">
                                    <h3 className="text-center mb-2">{t.step1Title}</h3>
                                    <p className="text-center mb-4" style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{t.step1Desc}</p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div
                                            className="role-card hover-card"
                                            style={{ border: role === 'PROMOTER' ? '2px solid var(--sand-gold)' : '1px solid #eee', padding: '1.5rem', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease', background: role === 'PROMOTER' ? '#fdfbf7' : 'white', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                                            onClick={() => handleRoleSelect('PROMOTER')}
                                        >
                                            <div style={{ background: 'var(--royal-blue-light)', padding: '12px', borderRadius: '12px', display: 'flex', color: 'var(--royal-blue-dark)' }}>
                                                <Lightbulb size={24} />
                                            </div>
                                            <div>
                                                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--royal-blue-dark)' }}>{t.roleCreator}</h4>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.4' }}>{t.roleCreatorDesc}</p>
                                            </div>
                                        </div>

                                        <div
                                            className="role-card hover-card"
                                            style={{ border: role === 'PARTNER' ? '2px solid var(--sand-gold)' : '1px solid #eee', padding: '1.5rem', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease', background: role === 'PARTNER' ? '#fdfbf7' : 'white', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                                            onClick={() => handleRoleSelect('PARTNER')}
                                        >
                                            <div style={{ background: 'var(--royal-blue-light)', padding: '12px', borderRadius: '12px', display: 'flex', color: 'var(--royal-blue-dark)' }}>
                                                <BriefcaseBusiness size={24} />
                                            </div>
                                            <div>
                                                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--royal-blue-dark)' }}>{t.rolePartner}</h4>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.4' }}>{t.rolePartnerDesc}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                        <a
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); setMode('login'); }}
                                            style={{ color: 'var(--royal-blue)', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                                        >
                                            <LogIn size={14} /> {t.loginInstead}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {(mode === 'login' || (mode === 'signup' && step === 2)) && (
                                <div className="step-2 animate-fade-in text-center">
                                    <h3 className="mb-4">{mode === 'signup' ? t.step2Title : t.loginTitle}</h3>
                                    <form onSubmit={handleSubmit} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                                        {status === 'error' && (
                                            <div style={{ padding: '10px', background: '#ffebeb', color: 'red', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                                {errorMessage || t.error}
                                            </div>
                                        )}

                                        <div className="form-group mb-3">
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t.email}</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t.password}</label>
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', paddingRight: '40px' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{ position: 'absolute', right: '10px', top: '35px', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-full"
                                            style={{ width: '100%', padding: '14px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                            disabled={status === 'loading'}
                                        >
                                            {mode === 'signup' ? (
                                                <><UserPlus size={18} className="mr-2" style={{ marginRight: '8px' }} /> {status === 'loading' ? '...' : t.signup}</>
                                            ) : (
                                                <><LogIn size={18} className="mr-2" style={{ marginRight: '8px' }} /> {status === 'loading' ? '...' : t.submitLogin}</>
                                            )}
                                        </button>

                                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                            {mode === 'signup' ? (
                                                <a
                                                    href="#"
                                                    onClick={(e) => { e.preventDefault(); setMode('login'); }}
                                                    style={{ color: 'var(--royal-blue)', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                                                >
                                                    <LogIn size={14} /> {t.loginInstead}
                                                </a>
                                            ) : (
                                                <a
                                                    href="#"
                                                    onClick={(e) => { e.preventDefault(); setMode('signup'); }}
                                                    style={{ color: 'var(--royal-blue)', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                                                >
                                                    <UserPlus size={14} /> {t.signupInstead}
                                                </a>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
