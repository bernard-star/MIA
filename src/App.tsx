import { useState } from 'react';
import {
  Menu, X, Fish, Sun, Sprout, Target, Quote,
  MapPin, Mail, ArrowRight, ShieldCheck,
  Building, Globe, BriefcaseBusiness, Map
} from 'lucide-react';
import './App.css';

type Language = 'fr' | 'en';
type Region = 'tanger' | 'kenitra' | 'casablanca' | 'ouarzazate' | 'dakhla';

const CONTENT = {
  fr: {
    nav: {
      about: 'Notre Mission',
      sectors: 'Secteurs',
      map: 'Écosystèmes',
      services: 'Services',
      testimonials: 'Témoignages',
      contact: 'Contact',
    },
    hero: {
      title: "Investir au Maroc : Votre vision, notre ancrage.",
      subtitle: "L'association de référence pour faciliter l'implantation et la croissance des entreprises internationales dans les secteurs stratégiques du Royaume.",
      cta: "Démarrer mon projet au Maroc",
    },
    about: {
      title: "À propos de nous",
      desc: "À l'horizon 2030, le Maroc s'affirme comme le carrefour incontournable entre l'Europe et l'Afrique. MIA a été créée pour offrir aux investisseurs étrangers une interface agile, indépendante et experte. Notre mission est simple : transformer la complexité administrative en opportunités fluides et sécuriser votre déploiement opérationnel dans un marché en pleine explosion."
    },
    objective2030: {
      title: "Objectif 2030",
      desc: "L'association aide spécifiquement les entreprises étrangères à se positionner sur les marchés liés à la construction des infrastructures pour la Coupe du Monde 2030."
    },
    sectors: {
      title: "Nos Secteurs d'Expertise",
      subtitle: "Des opportunités d'investissement majeures pour l'internationnalisation de vos activités.",
      cards: [
        {
          title: "Économie Bleue & Pêche",
          desc: "Le Maroc dispose d'une façade maritime exceptionnelle et d'une industrie de transformation en pleine mutation technologique. Nous vous accompagnons pour naviguer entre les nouvelles réglementations de 2026, l'accès aux quotas de pêche et le développement d'unités d'aquaculture durable.",
        },
        {
          title: "Énergies Renouvelables & Solaire",
          desc: "Leader mondial du solaire, le Maroc ouvre désormais son réseau aux producteurs privés. Que votre projet concerne l'auto-production industrielle ou l'exportation d'énergie verte, nous facilitons votre raccordement et votre accès au foncier stratégique.",
        },
        {
          title: "AgriTech & Industrie 4.0",
          desc: "Face aux défis climatiques, le Maroc investit massivement dans l'innovation agricole. Nous connectons les entreprises de la Tech mondiale avec les grands domaines agricoles et les zones industrielles de nouvelle génération (Kénitra, Tanger, Jorf Lasfar).",
        }
      ]
    },
    map: {
      title: "Carte Interactive des Écosystèmes",
      subtitle: "Visualisez les pôles stratégiques et les opportunités territoriales du Royaume.",
      regions: {
        tanger: { name: "Tanger Med", focus: "Logistique & Industrie 4.0", desc: "Trait d'union entre l'Europe et l'Afrique, Tanger abrite le premier port de la Méditerranée et un hub automobile mondial de classe exceptionnelle." },
        kenitra: { name: "Kénitra", focus: "Mobilité Électrique", desc: "Berceau de la nouvelle Giga-factory de batteries et des équipementiers, offrant un écosystème ultra-connecté pour l'industrie de demain." },
        casablanca: { name: "Casablanca", focus: "Finance & Tech", desc: "Avec Casablanca Finance City, c'est la première place financière d'Afrique et le cœur névralgique de l'innovation et des startups." },
        ouarzazate: { name: "Ouarzazate", focus: "Énergies Renouvelables", desc: "Capitale mondiale du solaire abritant le méga-complexe Noor, un site de choix pour l'ingénierie verte et l'auto-production industrielle." },
        dakhla: { name: "Dakhla", focus: "Économie Bleue & Hub Vert", desc: "Le nouveau grand port Atlantique crée d'immenses opportunités pour l'aquaculture durable et les complexes de dessalement et d'hydrogène." },
      },
      selectPrompt: "Sélectionnez un pôle stratégique sur la carte pour découvrir son écosystème.",
      btnIncentives: "Découvrir les subventions"
    },
    services: {
      title: "Nos Services",
      subtitle: "La valeur ajoutée de notre association pour votre implantation au Maroc.",
      list: [
        {
          title: 'Accompagnement "Soft-Landing"',
          desc: "Une assistance complète pour votre installation (logistique, visas business, recherche de locaux et domiciliation)."
        },
        {
          title: "Ingénierie Administrative",
          desc: "Orientation personnalisée pour bénéficier des primes de la nouvelle Charte de l'Investissement."
        },
        {
          title: "Réseau de Partenaires",
          desc: "Accès direct à un écosystème de banquiers, avocats d'affaires et sous-traitants locaux certifiés."
        },
        {
          title: "Intelligence de Marché",
          desc: "Rapports sectoriels mis à jour et veille réglementaire en temps réel."
        }
      ]
    },
    testimonial: {
      title: "Ils nous font confiance",
      quote: "Grâce à l'association, nous avons réduit notre temps d'implantation de 6 mois. Leur connaissance des rouages locaux dans le secteur solaire a été le facteur clé de notre réussite à Ouarzazate.",
      author: "Marc D.",
      role: "CEO d'une multinationale européenne"
    },
    contact: {
      title: "Contactez-nous",
      name: "Nom complet",
      email: "Adresse Email",
      sector: "Secteur d'activité",
      message: "Votre message",
      submit: "Envoyer ma demande"
    },
    footer: {
      addressLabel: "Adresse",
      addressValue: "Casablanca, Maroc",
      contactLabel: "Contact",
      contactValue: "contact@mia.ma",
      legal: "Association à but non lucratif régie par le Dahir de 1958."
    }
  },
  en: {
    nav: {
      about: 'About Us',
      sectors: 'Sectors',
      map: 'Ecosystems',
      services: 'Services',
      testimonials: 'Testimonials',
      contact: 'Contact',
    },
    hero: {
      title: "Investing in Morocco: Your vision, our foundation.",
      subtitle: "The leading association facilitating the establishment and growth of international companies in the Kingdom's strategic sectors.",
      cta: "Launch My Project",
    },
    about: {
      title: "Our Mission",
      desc: "Looking ahead to 2030, Morocco is asserting itself as the essential crossroads between Europe and Africa. MIA was created to offer foreign investors an agile, independent, and expert interface. Our mission is simple: transform administrative complexity into smooth opportunities and secure your operational deployment in a rapidly booming market."
    },
    objective2030: {
      title: "Objective 2030",
      desc: "The association specifically helps foreign companies position themselves in markets related to the construction of infrastructure for the 2030 World Cup."
    },
    sectors: {
      title: "Our Expertise Sectors",
      subtitle: "Major investment opportunities for the internationalization of your activities.",
      cards: [
        {
          title: "Blue Economy & Fisheries",
          desc: "Morocco has an exceptional coastline and a processing industry in full technological mutation. We support you in navigating the new 2026 regulations, access to fishing quotas, and the development of sustainable aquaculture units.",
        },
        {
          title: "Renewable Energies & Solar",
          desc: "A global leader in solar energy, Morocco is now opening its grid to private producers. Whether your project concerns industrial self-production or the export of green energy, we facilitate your connection and access to strategic land.",
        },
        {
          title: "AgriTech & Industry 4.0",
          desc: "Facing climate challenges, Morocco is heavily investing in agricultural innovation. We connect global Tech companies with large agricultural estates and new-generation industrial zones (Kenitra, Tangier, Jorf Lasfar).",
        }
      ]
    },
    map: {
      title: "Interactive Ecosystem Map",
      subtitle: "Visualize the strategic hubs and territorial opportunities of the Kingdom.",
      regions: {
        tanger: { name: "Tangier Med", focus: "Logistics & Industry 4.0", desc: "The link between Europe and Africa, Tangier hosts the leading Mediterranean port and a world-class automotive hub." },
        kenitra: { name: "Kenitra", focus: "Electric Mobility", desc: "Cradle of the new battery Gigafactory and auto parts manufacturers, offering an ultra-connected ecosystem for tomorrow's industry." },
        casablanca: { name: "Casablanca", focus: "Finance & Tech", desc: "With Casablanca Finance City, it constitutes Africa's leading financial center and the nerve center for innovation and startups." },
        ouarzazate: { name: "Ouarzazate", focus: "Renewable Energies", desc: "Global solar capital housing the Noor mega-complex, a prime location for green engineering and industrial self-production." },
        dakhla: { name: "Dakhla", focus: "Blue Economy & Green Hub", desc: "The new major Atlantic port creates immense opportunities for sustainable aquaculture and desalination & hydrogen plants." },
      },
      selectPrompt: "Select a strategic hub on the map to discover its ecosystem.",
      btnIncentives: "Discover incentives"
    },
    services: {
      title: "Our Services",
      subtitle: "The added value of our association for your setup in Morocco.",
      list: [
        {
          title: 'Soft-Landing Support',
          desc: "Comprehensive assistance for your installation (logistics, business visas, premise search, and domiciliation)."
        },
        {
          title: "Administrative Engineering",
          desc: "Personalized guidance to benefit from the subsidies of the new Investment Charter."
        },
        {
          title: "Partner Network",
          desc: "Direct access to an ecosystem of certified local bankers, corporate lawyers, and subcontractors."
        },
        {
          title: "Market Intelligence",
          desc: "Updated sectoral reports and real-time regulatory monitoring."
        }
      ]
    },
    testimonial: {
      title: "They Trust Us",
      quote: "Thanks to the association, we reduced our setup time by 6 months. Their knowledge of the local processes in the solar sector was the key factor to our success in Ouarzazate.",
      author: "Marc D.",
      role: "CEO of a European multinational"
    },
    contact: {
      title: "Contact Us",
      name: "Full Name",
      email: "Email Address",
      sector: "Business Sector",
      message: "Your Message",
      submit: "Send Request"
    },
    footer: {
      addressLabel: "Address",
      addressValue: "Casablanca, Morocco",
      contactLabel: "Contact",
      contactValue: "contact@mia.ma",
      legal: "Non-profit association governed by the Dahir of 1958."
    }
  }
};

function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);

  const t = CONTENT[lang];

  return (
    <>
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div className="brand">
            MIA<span>.</span>
          </div>

          {/* Desktop Menu */}
          <div className="nav-links">
            <a href="#about" className="nav-link">{t.nav.about}</a>
            <a href="#sectors" className="nav-link">{t.nav.sectors}</a>
            <a href="#map" className="nav-link">{t.nav.map}</a>
            <a href="#services" className="nav-link">{t.nav.services}</a>
            <a href="#testimonial" className="nav-link">{t.nav.testimonials}</a>
            <a href="#contact" className="nav-link">{t.nav.contact}</a>
            <div className="lang-switcher">
              <span
                className={`lang-switch ${lang === 'fr' ? 'active' : ''}`}
                onClick={() => setLang('fr')}
              >FR</span>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span
                className={`lang-switch ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >EN</span>
            </div>
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#about" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</a>
            <a href="#sectors" onClick={() => setIsMenuOpen(false)}>{t.nav.sectors}</a>
            <a href="#map" onClick={() => setIsMenuOpen(false)}>{t.nav.map}</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>{t.nav.services}</a>
            <a href="#testimonial" onClick={() => setIsMenuOpen(false)}>{t.nav.testimonials}</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</a>
            <div className="mobile-lang">
              <span className={lang === 'fr' ? 'active' : ''} onClick={() => { setLang('fr'); setIsMenuOpen(false); }}>FR</span>
              <span>|</span>
              <span className={lang === 'en' ? 'active' : ''} onClick={() => { setLang('en'); setIsMenuOpen(false); }}>EN</span>
            </div>
          </div>
        )}
      </nav>

      <section id="hero" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <h1>{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <a href="#contact" className="btn btn-primary hero-btn">
            {t.hero.cta} <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </section>

      <section id="about" className="about-section bg-light">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">{t.about.title}</h2>
            <p className="about-desc">{t.about.desc}</p>
          </div>

          <div className="objective-banner">
            <div className="objective-icon">
              <Target size={48} color="var(--royal-blue-dark)" />
            </div>
            <div>
              <h3>{t.objective2030.title}</h3>
              <p>{t.objective2030.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sectors" className="sectors-section">
        <div className="container">
          <h2 className="section-title">{t.sectors.title}</h2>
          <p className="section-subtitle">{t.sectors.subtitle}</p>

          <div className="sectors-grid">
            <div className="sector-card hover-card">
              <Fish size={48} className="sector-icon" />
              <div className="sector-content">
                <h3>{t.sectors.cards[0].title}</h3>
                <p>{t.sectors.cards[0].desc}</p>
              </div>
            </div>
            <div className="sector-card hover-card">
              <Sun size={48} className="sector-icon" />
              <div className="sector-content">
                <h3>{t.sectors.cards[1].title}</h3>
                <p>{t.sectors.cards[1].desc}</p>
              </div>
            </div>
            <div className="sector-card hover-card">
              <Sprout size={48} className="sector-icon" />
              <div className="sector-content">
                <h3>{t.sectors.cards[2].title}</h3>
                <p>{t.sectors.cards[2].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="map" className="map-section">
        <div className="container">
          <h2 className="section-title text-light">{t.map.title}</h2>
          <p className="section-subtitle text-light" style={{ opacity: 0.8 }}>{t.map.subtitle}</p>

          <div className="map-container">
            <div className="map-visual">
              <div className="map-abstract-bg">
                <Map size={250} strokeWidth={1} />
              </div>

              {(Object.keys(t.map.regions) as Region[]).map((key) => (
                <div
                  key={key}
                  className={`map-pin pin-${key} ${activeRegion === key ? 'active' : ''}`}
                  onClick={() => setActiveRegion(key)}
                >
                  <div className="map-pin-icon"></div>
                  <div className="map-pin-label">{t.map.regions[key].name}</div>
                </div>
              ))}
            </div>

            <div className="map-info">
              {activeRegion ? (
                <div className="map-info-card animate-fade-in" key={activeRegion}>
                  <h3>{t.map.regions[activeRegion].name}</h3>
                  <div className="map-info-focus">{t.map.regions[activeRegion].focus}</div>
                  <p className="map-info-desc">{t.map.regions[activeRegion].desc}</p>
                  <a href="#contact" className="btn btn-outline" style={{ width: '100%' }}>
                    {t.map.btnIncentives}
                  </a>
                </div>
              ) : (
                <div className="map-empty-state">
                  <MapPin size={48} color="var(--royal-blue-light)" opacity={0.3} />
                  <p>{t.map.selectPrompt}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services-section bg-alt">
        <div className="container">
          <h2 className="section-title text-center">{t.services.title}</h2>
          <p className="section-subtitle text-center mb-5">{t.services.subtitle}</p>

          <div className="services-grid">
            <div className="service-card hover-card">
              <div className="service-icon"><Building /></div>
              <h4>{t.services.list[0].title}</h4>
              <p>{t.services.list[0].desc}</p>
            </div>
            <div className="service-card hover-card">
              <div className="service-icon"><ShieldCheck /></div>
              <h4>{t.services.list[1].title}</h4>
              <p>{t.services.list[1].desc}</p>
            </div>
            <div className="service-card hover-card">
              <div className="service-icon"><BriefcaseBusiness /></div>
              <h4>{t.services.list[2].title}</h4>
              <p>{t.services.list[2].desc}</p>
            </div>
            <div className="service-card hover-card">
              <div className="service-icon"><Globe /></div>
              <h4>{t.services.list[3].title}</h4>
              <p>{t.services.list[3].desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonial" className="testimonial-section">
        <div className="container testimonial-container">
          <h2 className="section-title text-light">{t.testimonial.title}</h2>
          <Quote size={60} className="quote-icon mx-auto" />
          <p className="testimonial-quote">"{t.testimonial.quote}"</p>
          <div className="testimonial-author">{t.testimonial.author}</div>
          <div className="testimonial-role">{t.testimonial.role}</div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-container">
          <div className="contact-form-wrapper">
            <h2 className="section-title text-left">{t.contact.title}</h2>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>{t.contact.name}</label>
                <input type="text" placeholder={t.contact.name} />
              </div>
              <div className="form-group">
                <label>{t.contact.email}</label>
                <input type="email" placeholder={t.contact.email} />
              </div>
              <div className="form-group">
                <label>{t.contact.sector}</label>
                <select>
                  <option value="">Sélectionnez / Select</option>
                  <option value="energie">Énergies Renouvelables</option>
                  <option value="peche">Économie Bleue & Pêche</option>
                  <option value="agritech">AgriTech & Industrie</option>
                  <option value="autre">Autre / Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t.contact.message}</label>
                <textarea rows={4} placeholder={t.contact.message}></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">{t.contact.submit}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>
                MIA<span style={{ color: 'var(--sand-gold)' }}>.</span>
              </div>
              <p style={{ maxWidth: '300px', opacity: 0.8 }}>
                The leading association facilitating international investment in Morocco.
              </p>
            </div>

            <div className="footer-section">
              <h4>{t.footer.addressLabel}</h4>
              <p className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--sand-gold)" /> {t.footer.addressValue}
              </p>
            </div>

            <div className="footer-section">
              <h4>{t.footer.contactLabel}</h4>
              <p className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} color="var(--sand-gold)" /> {t.footer.contactValue}
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 MIA - Moroccan Investment Association.</p>
            <p>{t.footer.legal}</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
