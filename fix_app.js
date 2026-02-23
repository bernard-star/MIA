const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update imports
code = code.replace(
  "import {\n  Menu, X, Fish, Sun, Sprout, Target, Quote,\n  MapPin, Mail, ArrowRight, ShieldCheck,\n  Building, Globe, BriefcaseBusiness, Map, TrendingUp, ArrowUpRight,\n  Linkedin, Download, CalendarCheck\n} from 'lucide-react';",
  "import {\n  Menu, X, Fish, Sun, Sprout, Target, Quote,\n  MapPin, Mail, ArrowRight, ShieldCheck,\n  Building, Globe, BriefcaseBusiness, Map, TrendingUp, ArrowUpRight,\n  Linkedin, Download, CalendarCheck, ChevronDown\n} from 'lucide-react';"
);

// Update translations array (fr)
code = code.replace(
  "    nav: {\n      about: 'Notre Mission',\n      team: \"L'Équipe\",\n      sectors: 'Secteurs',\n      map: 'Écosystèmes',\n      services: 'Services',\n      news: 'Insights',\n      exchange: 'Bourse de Projets',\n      testimonials: 'Témoignages',\n      contact: 'Contact',\n    },",
  "    nav: {\n      association: \"L'Association\",\n      about: 'Notre Mission',\n      team: \"L'Équipe\",\n      testimonials: 'Témoignages',\n      expertise: \"Notre Expertise\",\n      sectors: 'Secteurs',\n      map: 'Écosystèmes',\n      services: 'Services',\n      opportunites: \"Opportunités\",\n      exchange: 'Bourse de Projets',\n      insightsMain: \"Insights\",\n      news: 'Actualités',\n      contact: 'Contact',\n    },"
);

// Update translations array (en)
code = code.replace(
  "    nav: {\n      about: 'About Us',\n      team: 'Team',\n      sectors: 'Secteurs',\n      map: 'Ecosystems',\n      services: 'Services',\n      news: 'Insights',\n      exchange: 'Project Exchange',\n      testimonials: 'Testimonials',\n      contact: 'Contact',\n    },",
  "    nav: {\n      association: 'The Association',\n      about: 'About Us',\n      team: 'Team',\n      testimonials: 'Testimonials',\n      expertise: 'Our Expertise',\n      sectors: 'Sectors',\n      map: 'Ecosystems',\n      services: 'Services',\n      opportunites: 'Opportunities',\n      exchange: 'Project Exchange',\n      insightsMain: 'Insights',\n      news: 'News',\n      contact: 'Contact',\n    },"
);
// fix the en sectors to english actual
code = code.replace("sectors: 'Secteurs',", "sectors: 'Sectors',");

// Update translations array (es)
code = code.replace(
  "    nav: {\n      about: 'Nuestra Misión',\n      team: 'Equipo',\n      sectors: 'Sectores',\n      map: 'Ecosistemas',\n      services: 'Servicios',\n      news: 'Noticias',\n      exchange: 'Bolsa de Proyectos',\n      testimonials: 'Testimonios',\n      contact: 'Contacto',\n    },",
  "    nav: {\n      association: 'La Asociación',\n      about: 'Nuestra Misión',\n      team: 'Equipo',\n      testimonials: 'Testimonios',\n      expertise: 'Nuestra Experiencia',\n      sectors: 'Sectores',\n      map: 'Ecosistemas',\n      services: 'Servicios',\n      opportunites: 'Oportunidades',\n      exchange: 'Bolsa de Proyectos',\n      insightsMain: 'Insights',\n      news: 'Noticias',\n      contact: 'Contacto',\n    },"
);

// Update translations array (ar)
code = code.replace(
  "    nav: {\n      about: 'مهمتنا',\n      team: 'فريقنا',\n      sectors: 'قطاعاتنا',\n      map: 'الأنظمة البيئية',\n      services: 'خدماتنا',\n      news: 'رؤى',\n      exchange: 'بورصة المشاريع',\n      testimonials: 'الشهادات',\n      contact: 'اتصل بنا',\n    },",
  "    nav: {\n      association: 'الجمعية',\n      about: 'مهمتنا',\n      team: 'فريقنا',\n      testimonials: 'الشهادات',\n      expertise: 'خبراتنا',\n      sectors: 'قطاعاتنا',\n      map: 'الأنظمة البيئية',\n      services: 'خدماتنا',\n      opportunites: 'فرص',\n      exchange: 'بورصة المشاريع',\n      insightsMain: 'رؤى',\n      news: 'أخبار',\n      contact: 'اتصل بنا',\n    },"
);

// We need to inject the hook into App function
let appIndex = code.indexOf('function App() {');
let hookCode = `
  const [currentPath, setCurrentPath] = useState(() => {
    const p = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (['/', '/association', '/expertise', '/opportunites', '/insights', '/contact'].includes(p)) {
      return p;
    }
    return '/';
  });

  import { useEffect } from 'react'; // ensure it
  // Actually we need to add useEffect to imports
  
  const navigateTo = (path, hash) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setCurrentPage('home');
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  };
`;

// wait let me add react imports 
code = code.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';");
code = code.replace("const [currentPage, setCurrentPage] = useState<'home' | 'charte' | 'gigafactory' | 'hydrogene' | 'exchange'>('home');", 
`const [currentPage, setCurrentPage] = useState<'home' | 'charte' | 'gigafactory' | 'hydrogene' | 'exchange'>('home');
  const [currentPath, setCurrentPath] = useState(() => {
    const p = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (['/', '/association', '/expertise', '/opportunites', '/insights', '/contact'].includes(p)) {
      return p;
    }
    return '/';
  });

  useEffect(() => {
    const handlePop = () => {
       const p = window.location.pathname;
       setCurrentPath(['/', '/association', '/expertise', '/opportunites', '/insights', '/contact'].includes(p) ? p : '/');
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigateTo = (path: string, hash?: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setCurrentPage('home');
    setIsMenuOpen(false);
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  };`);

// Update navbar rendering
let oldNavDesktop = `<div className="nav-links">
            <a href="#about" className="nav-link">{t.nav.about}</a>
            <a href="#team" className="nav-link">{t.nav.team}</a>
            <a href="#sectors" className="nav-link">{t.nav.sectors}</a>
            <a href="#map" className="nav-link">{t.nav.map}</a>
            <a href="#services" className="nav-link">{t.nav.services}</a>
            <a href="#news" className="nav-link">{t.nav.news}</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('exchange'); window.scrollTo(0, 0); }}>{t.nav.exchange}</a>
            <a href="#testimonial" className="nav-link">{t.nav.testimonials}</a>
            <a href="#contact" className="nav-link">{t.nav.contact}</a>
            <div className="lang-switcher">`;

let newNavDesktop = `<div className="nav-links">
            <div className="nav-item">
              <a href="/association" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('/association'); }}>{t.nav.association} <ChevronDown size={14} /></a>
              <div className="dropdown-menu">
                <a href="#about" className="dropdown-link" onClick={(e) => { e.preventDefault(); navigateTo('/association', 'about'); }}>{t.nav.about}</a>
                <a href="#team" className="dropdown-link" onClick={(e) => { e.preventDefault(); navigateTo('/association', 'team'); }}>{t.nav.team}</a>
                <a href="#testimonial" className="dropdown-link" onClick={(e) => { e.preventDefault(); navigateTo('/association', 'testimonial'); }}>{t.nav.testimonials}</a>
              </div>
            </div>

            <div className="nav-item">
              <a href="/expertise" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('/expertise'); }}>{t.nav.expertise} <ChevronDown size={14} /></a>
              <div className="dropdown-menu">
                <a href="#sectors" className="dropdown-link" onClick={(e) => { e.preventDefault(); navigateTo('/expertise', 'sectors'); }}>{t.nav.sectors}</a>
                <a href="#map" className="dropdown-link" onClick={(e) => { e.preventDefault(); navigateTo('/expertise', 'map'); }}>{t.nav.map}</a>
                <a href="#services" className="dropdown-link" onClick={(e) => { e.preventDefault(); navigateTo('/expertise', 'services'); }}>{t.nav.services}</a>
              </div>
            </div>

            <div className="nav-item">
              <a href="/opportunites" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('/opportunites'); }}>{t.nav.opportunites} <ChevronDown size={14} /></a>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-link" onClick={(e) => { e.preventDefault(); setCurrentPage('exchange'); window.history.pushState({}, '', '/opportunites'); setCurrentPath('/opportunites'); window.scrollTo(0,0); }}>{t.nav.exchange}</a>
              </div>
            </div>

            <div className="nav-item">
              <a href="/insights" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('/insights'); }}>{t.nav.insightsMain} <ChevronDown size={14} /></a>
              <div className="dropdown-menu">
                <a href="#news" className="dropdown-link" onClick={(e) => { e.preventDefault(); navigateTo('/insights', 'news'); }}>{t.nav.news}</a>
              </div>
            </div>

            <div className="nav-item">
              <a href="/contact" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }}>{t.nav.contact}</a>
            </div>

            <div className="lang-switcher">`;

code = code.replace(oldNavDesktop, newNavDesktop);

// Update mobile menu
let oldNavMobile = `<div className="mobile-menu">
            <a href="#about" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</a>
            <a href="#team" onClick={() => setIsMenuOpen(false)}>{t.nav.team}</a>
            <a href="#sectors" onClick={() => setIsMenuOpen(false)}>{t.nav.sectors}</a>
            <a href="#map" onClick={() => setIsMenuOpen(false)}>{t.nav.map}</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>{t.nav.services}</a>
            <a href="#news" onClick={() => setIsMenuOpen(false)}>{t.nav.news}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setCurrentPage('exchange'); window.scrollTo(0, 0); }}>{t.nav.exchange}</a>
            <a href="#testimonial" onClick={() => setIsMenuOpen(false)}>{t.nav.testimonials}</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</a>
            <div className="mobile-lang">`;

let newNavMobile = `<div className="mobile-menu">
            <div style={{fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem'}}>{t.nav.association}</div>
            <a href="#about" style={{paddingLeft: '1rem', textTransform: 'none', fontWeight: 500}} onClick={(e) => { e.preventDefault(); navigateTo('/association', 'about'); }}>- {t.nav.about}</a>
            <a href="#team" style={{paddingLeft: '1rem', textTransform: 'none', fontWeight: 500}} onClick={(e) => { e.preventDefault(); navigateTo('/association', 'team'); }}>- {t.nav.team}</a>
            <a href="#testimonial" style={{paddingLeft: '1rem', textTransform: 'none', fontWeight: 500}} onClick={(e) => { e.preventDefault(); navigateTo('/association', 'testimonial'); }}>- {t.nav.testimonials}</a>
            
            <div style={{fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem'}}>{t.nav.expertise}</div>
            <a href="#sectors" style={{paddingLeft: '1rem', textTransform: 'none', fontWeight: 500}} onClick={(e) => { e.preventDefault(); navigateTo('/expertise', 'sectors'); }}>- {t.nav.sectors}</a>
            <a href="#map" style={{paddingLeft: '1rem', textTransform: 'none', fontWeight: 500}} onClick={(e) => { e.preventDefault(); navigateTo('/expertise', 'map'); }}>- {t.nav.map}</a>
            <a href="#services" style={{paddingLeft: '1rem', textTransform: 'none', fontWeight: 500}} onClick={(e) => { e.preventDefault(); navigateTo('/expertise', 'services'); }}>- {t.nav.services}</a>
            
            <div style={{fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem'}}>{t.nav.opportunites}</div>
            <a href="#" style={{paddingLeft: '1rem', textTransform: 'none', fontWeight: 500}} onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setCurrentPage('exchange'); window.history.pushState({}, '', '/opportunites'); setCurrentPath('/opportunites'); window.scrollTo(0,0); }}>- {t.nav.exchange}</a>

            <div style={{fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem'}}>{t.nav.insightsMain}</div>
            <a href="#news" style={{paddingLeft: '1rem', textTransform: 'none', fontWeight: 500}} onClick={(e) => { e.preventDefault(); navigateTo('/insights', 'news'); }}>- {t.nav.news}</a>
            
            <div style={{fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem'}}>{t.nav.contact}</div>
            <a href="#contact" style={{paddingLeft: '1rem', textTransform: 'none', fontWeight: 500}} onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }}>- {t.nav.contact}</a>
            
            <div className="mobile-lang">`;

code = code.replace(oldNavMobile, newNavMobile);

// Apply conditional rendering to sections
const CONDITIONAL_WRAP = (sectionId, paths) => {
  const openTag = \`<section id="\${sectionId}"\`;
  let pathChecks = paths.map(p => \`currentPath === '\${p}'\`).join(' || ');
  if (paths.includes('/')) pathChecks = "currentPath === '/' || " + pathChecks;
  code = code.replace(openTag, \`{ (\${pathChecks}) && (\\n        <section id="\${sectionId}"\`);
  // find the corresponding </section> and close the braces
  // Simplest is replace with manual closing.
};

// We will do string replacement for the sections
// <section id="hero" ... -> { (currentPath === '/' || currentPath === '/association' || currentPath === '/expertise' || currentPath === '/opportunites' || currentPath === '/insights' || currentPath === '/contact') && ( <section id="hero" ...
code = code.replace('<section id="hero"', "{ (currentPath === '/' || currentPath === '/association' || currentPath === '/expertise' || currentPath === '/insights' || currentPath === '/contact') && (<section id=\"hero\"");
// wait hero ends at </section> (first one)
let c = code.split(/<\/section>/);
// 0: hero
// 1: about
// 2: team
// 3: sectors
// 4: map
// 5: services
// 6: news
// 7: testimonial
// 8: lead-magnet
// 9: contact

function wrapSection(index, paths) {
  let pCond = paths.map(p => \`currentPath === '\${p}'\`).join(' || ');
  c[index] = c[index].replace('<section id=', \`{ (\${pCond}) && (<section id=\`);
  c[index] = c[index] + '</section>)}';
}
// wait, the previous code.replace already did { (...) && (<section for hero.
// it's easier to just use standard DOM editing or replace blocks. Let's do string replacement.

fs.writeFileSync('src/App.tsx', code);
