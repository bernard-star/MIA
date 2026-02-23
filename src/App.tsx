import { useState, useEffect } from 'react';
import {
  Menu, X, Fish, Sun, Sprout, Target, Quote,
  MapPin, Mail, ArrowRight, ShieldCheck,
  Building, Globe, BriefcaseBusiness, Map, TrendingUp, ArrowUpRight,
  Linkedin, Download, CalendarCheck, ChevronDown
} from 'lucide-react';
import './App.css';
import CharteInvestissement from './CharteInvestissement';
import GigaFactory from './GigaFactory';
import HydrogeneDakhla from './HydrogeneDakhla';
import ProjectExchange from './ProjectExchange';
import { supabase } from './lib/supabase';

type Language = 'fr' | 'en' | 'es' | 'ar';
type Region = 'tanger' | 'kenitra' | 'casablanca' | 'ouarzazate' | 'dakhla';

const CONTENT = {
  fr: {
    nav: {
      association: "L'Association",
      about: 'Notre Mission',
      team: "L'Équipe",
      testimonials: 'Témoignages',
      expertise: 'Notre Expertise',
      sectors: 'Secteurs',
      map: 'Écosystèmes',
      services: 'Services',
      opportunites: 'Opportunités',
      exchange: 'Bourse de Projets',
      insightsMain: 'Insights',
      news: 'Actualités',
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
    team: {
      title: "Le Conseil d'Administration",
      subtitle: "Des experts de haut niveau dédiés à la réussite de votre implantation.",
      members: [
        { name: "Youssef Alaoui", role: "Président & Expert Financier", exp: "15 ans en Banque d'Affaires" },
        { name: "Sarah K.", role: "Directrice des Opérations", exp: "Ex-Directrice Stratégie CFC" },
        { name: "Mehdi R.", role: "Responsable Partenariats", exp: "Spécialiste Charte Investissement" }
      ]
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
    news: {
      title: "Centre d'Intelligence Économique",
      subtitle: "Dernières analyses et décryptages pour éclairer vos décisions d'investissement.",
      btnSub: "S'abonner à la Newsletter",
      articles: [
        {
          category: "Réglementation",
          title: "Nouvelle Charte de l'Investissement : Les primes territoriales décryptées",
          date: "15 Oct 2026",
          readTime: "5 min de lecture",
        },
        {
          category: "Industrie 4.0",
          title: "Comment la Giga-factory de Kénitra redessine la supply chain automobile",
          date: "02 Oct 2026",
          readTime: "8 min de lecture",
        },
        {
          category: "Énergies Vertes",
          title: "L'hydrogène vert à Dakhla : Le nouveau hub de l'Afrique de l'Ouest",
          date: "28 Sep 2026",
          readTime: "6 min de lecture",
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
      title: "Rencontrons-nous",
      subtitle: "Réservez une évaluation vidéo de 15 min avec un expert ou laissez-nous un message.",
      calendlyBtn: "Réserver un créneau (Calendly)",
      name: "Nom complet",
      email: "Adresse Email",
      phone: "Téléphone",
      organization: "Organisation / Entreprise",
      location: "Localisation (Ville / Région)",
      sector: "Secteur d'activité",
      project_size: "Taille du projet (Investissement)",
      funding: "Besoins de financement",
      partners: "Partenaires recherchés",
      yields: "Rendement attendu",
      visibility: "Visibilité de la demande",
      visibilityOptions: { public: "Public (Apparaître sur la Bourse de Projets)", private: "Privé (Réservé à MIA)" },
      display_mode: "Mode d'affichage",
      displayModeOptions: { full: "Projet complet", partial: "Teaser partiel (informations masquées)" },
      message: "Description du projet",
      submit: "Soumettre le projet",
      success: "Demande envoyée avec succès !",
      error: "Une erreur est survenue."
    },
    leadMagnet: {
      title: "Prêt à conquérir le marché marocain ?",
      subtitle: "Téléchargez notre Guide Ultime de l'Investisseur 2026 (GRATUIT)",
      placeholder: "Votre adresse email professionnelle...",
      button: "Obtenir le PDF Secteurs & Subventions"
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
      association: "The Association",
      about: 'About Us',
      team: 'Team',
      testimonials: 'Testimonials',
      expertise: 'Our Expertise',
      sectors: 'Sectors',
      map: 'Ecosystems',
      services: 'Services',
      opportunites: 'Opportunities',
      exchange: 'Project Exchange',
      insightsMain: 'Insights',
      news: 'News',
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
    team: {
      title: "Board of Directors",
      subtitle: "High-level experts dedicated to the success of your establishment.",
      members: [
        { name: "Youssef Alaoui", role: "President & Financial Expert", exp: "15 years in Investment Banking" },
        { name: "Sarah K.", role: "Director of Operations", exp: "Ex-Strategy Director CFC" },
        { name: "Mehdi R.", role: "Head of Public Partnerships", exp: "Investment Charter Specialist" }
      ]
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
    news: {
      title: "Market Intelligence Center",
      subtitle: "Latest analysis and insights to illuminate your investment decisions.",
      btnSub: "Subscribe to Newsletter",
      articles: [
        {
          category: "Regulation",
          title: "New Investment Charter: Decoding territorial subsidies",
          date: "Oct 15, 2026",
          readTime: "5 min read",
        },
        {
          category: "Industry 4.0",
          title: "How Kenitra's Gigafactory is reshaping the automotive supply chain",
          date: "Oct 02, 2026",
          readTime: "8 min read",
        },
        {
          category: "Green Energies",
          title: "Green hydrogen in Dakhla: West Africa's new hub",
          date: "Sep 28, 2026",
          readTime: "6 min read",
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
      title: "Let's Meet",
      subtitle: "Book a 15-min video assessment with an expert or leave us a message.",
      calendlyBtn: "Book a meeting (Calendly)",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      organization: "Organization / Company",
      location: "Location (City / Region)",
      sector: "Business Sector",
      project_size: "Project Size (Investment)",
      funding: "Funding Needed",
      partners: "Partner Requirements",
      yields: "Expected Yields",
      visibility: "Request Visibility",
      visibilityOptions: { public: "Public (Appear on the Project Exchange)", private: "Private (MIA Team only)" },
      display_mode: "Display Mode",
      displayModeOptions: { full: "Full Project", partial: "Partial Teaser (keep identity hidden)" },
      message: "Project Description",
      submit: "Submit Project",
      success: "Request successfully sent!",
      error: "An error occurred."
    },
    leadMagnet: {
      title: "Ready to conquer the Moroccan market?",
      subtitle: "Download our Ultimate Investor Guide 2026 (FREE)",
      placeholder: "Your professional email address...",
      button: "Get the Sectors & Subsidies PDF"
    },
    footer: {
      addressLabel: "Address",
      addressValue: "Casablanca, Morocco",
      contactLabel: "Contact",
      contactValue: "contact@mia.ma",
      legal: "Non-profit association governed by the Dahir of 1958."
    }
  },
  es: {
    nav: {
      association: "La Asociación",
      about: 'Nuestra Misión',
      team: 'Equipo',
      testimonials: 'Testimonios',
      expertise: 'Nuestra Experiencia',
      sectors: 'Sectores',
      map: 'Ecosistemas',
      services: 'Servicios',
      opportunites: 'Oportunidades',
      exchange: 'Bolsa de Proyectos',
      insightsMain: 'Insights',
      news: 'Noticias',
      contact: 'Contacto',
    },
    hero: {
      title: "Invertir en Marruecos: Su visión, nuestro arraigo.",
      subtitle: "La asociación líder que facilita el establecimiento y crecimiento de empresas internacionales en los sectores estratégicos del Reino.",
      cta: "Iniciar Mi Proyecto",
    },
    about: {
      title: "Nuestra Misión",
      desc: "De cara a 2030, Marruecos se afianza como la encrucijada ineludible entre Europa y África. MIA fue creada para ofrecer a los inversores extranjeros una interfaz ágil, independiente y experta. Nuestra misión es simple: transformar la complejidad administrativa en oportunidades fluidas y asegurar su despliegue operativo en un mercado en plena expansión."
    },
    team: {
      title: "Junta Directiva",
      subtitle: "Expertos de alto nivel dedicados al éxito de su implantación.",
      members: [
        { name: "Youssef Alaoui", role: "Presidente & Experto Financiero", exp: "15 años en Banca de Inversión" },
        { name: "Sarah K.", role: "Directora de Operaciones", exp: "Ex-Directora de Estrategia CFC" },
        { name: "Mehdi R.", role: "Resp. de Asociaciones Públicas", exp: "Especialista Ley de Inversiones" }
      ]
    },
    objective2030: {
      title: "Objetivo 2030",
      desc: "La asociación ayuda específicamente a las empresas extranjeras a posicionarse en mercados relacionados con la construcción de infraestructuras para la Copa del Mundo 2030."
    },
    sectors: {
      title: "Nuestros Sectores de Especialización",
      subtitle: "Importantes oportunidades de inversión para la internacionalización de sus actividades.",
      cards: [
        {
          title: "Economía Azul y Pesca",
          desc: "Marruecos cuenta con un litoral excepcional y una industria de transformación en plena mutación tecnológica. Le ayudamos a navegar por las nuevas normativas de 2026, el acceso a las cuotas de pesca y el desarrollo de unidades de acuicultura sostenible.",
        },
        {
          title: "Energías Renovables y Solar",
          desc: "Líder mundial en energía solar, Marruecos abre ahora su red a productores privados. Ya sea que su proyecto trate de autoproducción industrial o de la exportación de energía verde, facilitamos su conexión y el acceso a terrenos estratégicos.",
        },
        {
          title: "AgriTech & Industria 4.0",
          desc: "Frente a los desafíos climáticos, Marruecos invierte fuertemente en innovación agrícola. Conectamos empresas tecnológicas globales con grandes fincas agrícolas y zonas industriales de nueva generación (Kenitra, Tánger, Jorf Lasfar).",
        }
      ]
    },
    map: {
      title: "Mapa Interactivo de Ecosistemas",
      subtitle: "Visualice los centros estratégicos y las oportunidades territoriales del Reino.",
      regions: {
        tanger: { name: "Tánger Med", focus: "Logística e Industria 4.0", desc: "El enlace entre Europa y África, Tánger alberga el puerto principal del Mediterráneo y un centro automotriz de clase mundial." },
        kenitra: { name: "Kenitra", focus: "Movilidad Eléctrica", desc: "Cuna de la nueva Gigafactoría de baterías y fabricantes de piezas de automóviles, ofreciendo un ecosistema ultraconectado para la industria del mañana." },
        casablanca: { name: "Casablanca", focus: "Finanzas y Tech", desc: "Con Casablanca Finance City, constituye el principal centro financiero de África y el centro neurálgico para la innovación y las startups." },
        ouarzazate: { name: "Ouarzazate", focus: "Energías Renovables", desc: "Capital solar mundial que alberga el megacomplejo Noor, una ubicación privilegiada para la ingeniería verde y la autoproducción industrial." },
        dakhla: { name: "Dakhla", focus: "Economía Azul y Centro Verde", desc: "El nuevo gran puerto atlántico crea inmensas oportunidades para la acuicultura sostenible y las plantas de desalinización e hidrógeno." },
      },
      selectPrompt: "Seleccione un centro estratégico en el mapa para descubrir su ecosistema.",
      btnIncentives: "Descubrir subvenciones"
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "El valor añadido de nuestra asociación para su instalación en Marruecos.",
      list: [
        {
          title: 'Soporte "Soft-Landing"',
          desc: "Asistencia integral para su instalación (logística, visados de negocios, búsqueda de locales y domiciliación)."
        },
        {
          title: "Ingeniería Administrativa",
          desc: "Orientación personalizada para beneficiarse de los incentivos de la nueva Carta de Inversiones."
        },
        {
          title: "Red de Socios",
          desc: "Acceso directo a un ecosistema de banqueros, abogados corporativos y subcontratistas locales certificados."
        },
        {
          title: "Inteligencia de Mercado",
          desc: "Informes sectoriales actualizados y seguimiento normativo en tiempo real."
        }
      ]
    },
    news: {
      title: "Centro de Inteligencia Económica",
      subtitle: "Últimos análisis y perspectivas para iluminar sus decisiones de inversión.",
      btnSub: "Suscribirse al Boletín",
      articles: [
        {
          category: "Regulación",
          title: "Nueva Carta de Inversiones: Decodificando los subsidios territoriales",
          date: "15 Oct 2026",
          readTime: "5 min lect.",
        },
        {
          category: "Industria 4.0",
          title: "Cómo la Gigafactoría de Kenitra está remodelando la cadena de suministro automotriz",
          date: "02 Oct 2026",
          readTime: "8 min lect.",
        },
        {
          category: "Energías Verdes",
          title: "Hidrógeno verde en Dakhla: El nuevo centro de África Occidental",
          date: "28 Sep 2026",
          readTime: "6 min lect.",
        }
      ]
    },
    testimonial: {
      title: "Ellos Confían en Nosotros",
      quote: "Gracias a la asociación, hemos reducido nuestro tiempo de implantación en 6 meses. Su conocimiento de los engranajes locales en el sector solar ha sido el factor clave de nuestro éxito en Ouarzazate.",
      author: "Marc D.",
      role: "CEO de una multinacional europea"
    },
    contact: {
      title: "Reunámonos",
      subtitle: "Reserve una evaluación por video de 15 min con un experto o déjenos un mensaje.",
      calendlyBtn: "Reservar una cita (Calendly)",
      name: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono",
      organization: "Organización / Empresa",
      location: "Ubicación (Ciudad / Región)",
      sector: "Sector de Actividad",
      project_size: "Tamaño del proyecto",
      funding: "Necesidad de financiamiento",
      partners: "Socios requeridos",
      yields: "Rendimiento esperado",
      visibility: "Visibilidad de la solicitud",
      visibilityOptions: { public: "Público (Aparecer en la Bolsa de Proyectos)", private: "Privado (Solo para MIA)" },
      display_mode: "Modo de visualización",
      displayModeOptions: { full: "Proyecto completo", partial: "Teaser parcial (ocultar detalles)" },
      message: "Descripción del proyecto",
      submit: "Enviar Solicitud",
      success: "¡Solicitud enviada con éxito!",
      error: "Ocurrió un error."
    },
    leadMagnet: {
      title: "¿Listo para conquistar el mercado marroquí?",
      subtitle: "Descargue nuestra Guía Definitiva para Inversores 2026 (GRATIS)",
      placeholder: "Su correo profesional...",
      button: "Obtener PDF de Sectores y Subvenciones"
    },
    footer: {
      addressLabel: "Dirección",
      addressValue: "Casablanca, Marruecos",
      contactLabel: "Contacto",
      contactValue: "contact@mia.ma",
      legal: "Asociación sin ánimo de lucro regida por el Dahir de 1958."
    }
  },
  ar: {
    nav: {
      association: "الجمعية",
      about: 'مهمتنا',
      team: 'فريقنا',
      testimonials: 'الشهادات',
      expertise: 'خبراتنا',
      sectors: 'قطاعاتنا',
      map: 'الأنظمة البيئية',
      services: 'خدماتنا',
      opportunites: 'فرص',
      exchange: 'بورصة المشاريع',
      insightsMain: 'رؤى',
      news: 'أخبار',
      contact: 'اتصل بنا',
    },
    hero: {
      title: "الاستثمار في المغرب: رؤيتكم، انطلاقتنا.",
      subtitle: "الجمعية الرائدة في تسهيل تأسيس ونمو الشركات الدولية في القطاعات الاستراتيجية بالمملكة.",
      cta: "ابدأ مشروعي الآن",
    },
    about: {
      title: "حول مهمتنا",
      desc: "في أفق عام 2030، يرسخ المغرب مكانته كملتقى طرق أساسي بين أوروبا وإفريقيا. تم إنشاء جمعيتنا لتوفير واجهة مرنة ومستقلة وخبيرة للمستثمرين الأجانب. مهمتنا بسيطة: تحويل التعقيد الإداري إلى فرص سلسة وتأمين انتشاركم التشغيلي في سوق مزدهر للغاية."
    },
    team: {
      title: "مجلس الإدارة",
      subtitle: "خبراء رفيعو المستوى مكرسون لنجاح مشروعكم.",
      members: [
        { name: "يوسف العلوي", role: "رئيس وخبير مالي", exp: "15 عاماً في الخدمات المصرفية الاستثمارية" },
        { name: "سارة ك.", role: "مديرة العمليات", exp: "المديرة السابقة للاستراتيجية (CFC)" },
        { name: "مهدي ر.", role: "رئيس الشراكات العامة", exp: "متخصص في ميثاق الاستثمار" }
      ]
    },
    objective2030: {
      title: "هدف 2030",
      desc: "تساعد الجمعية على وجه التحديد الشركات الأجنبية على التموضع في الأسواق المتعلقة ببناء البنية التحتية لكأس العالم 2030."
    },
    sectors: {
      title: "قطاعات خبراتنا",
      subtitle: "فرص استثمارية رئيسية لتدويل أنشطتكم.",
      cards: [
        {
          title: "الاقتصاد الأزرق والصيد",
          desc: "يتمتع المغرب بشريط ساحلي استثنائي وصناعة تحويلية في خضم تطور تكنولوجي كامل. نحن ندعمك في تجاوز اللوائح الجديدة لعام 2026، والوصول إلى حصص الصيد وتطوير وحدات تربية الأحياء المائية المستدامة.",
        },
        {
          title: "الطاقات المتجددة والطاقة الشمسية",
          desc: "رائدة عالمياً في مجال الطاقة الشمسية، يفتح المغرب الآن شبكته للمنتجين الخاصين. سواء كان مشروعك يتعلق بالإنتاج الذاتي الصناعي أو تصدير الطاقة الخضراء، فإننا نسهل اتصالك والوصول إلى الأراضي الاستراتيجية.",
        },
        {
          title: "الزراعة الذكية والصناعة 4.0",
          desc: "لمواجهة التحديات المناخية، يستثمر المغرب بكثافة في الابتكار الزراعي. نحن نربط شركات التكنولوجيا العالمية بالعقارات الزراعية الكبيرة والمناطق الصناعية من الجيل الجديد.",
        }
      ]
    },
    map: {
      title: "خريطة النظم البيئية التفاعلية",
      subtitle: "تصور المراكز الاستراتيجية والفرص الإقليمية في المملكة.",
      regions: {
        tanger: { name: "طنجة المتوسط", focus: "الخدمات اللوجستية", desc: "الرابط بين أوروبا وإفريقيا، تضم طنجة ميناء البحر الأبيض المتوسط الرائد ومركزاً للسيارات ذو مستوى عالمي." },
        kenitra: { name: "القنيطرة", focus: "التنقل الكهربائي", desc: "مهد مصنع البطاريات الضخم الجديد، يقدم نظاماً بيئياً فائق الاتصال لصناعة الغد." },
        casablanca: { name: "الدار البيضاء", focus: "المالية والتكنولوجيا", desc: "تعتبر المركز المالي والتكنولوجي الأول في إفريقيا والمركز العصبي للابتكار والشركات الناشئة." },
        ouarzazate: { name: "ورزازات", focus: "الطاقات المتجددة", desc: "عاصمة الطاقة الشمسية العالمية، موقع رئيسي للهندسة الخضراء والإنتاج الذاتي الصناعي." },
        dakhla: { name: "الداخلة", focus: "الاقتصاد الأزرق", desc: "يخلق الميناء الأطلسي الكبير الجديد فرصاً هائلة للاستزراع المائي المستدام ومحطات تحلية المياه." },
      },
      selectPrompt: "حدد مركزاً استراتيجياً على الخريطة لاكتشاف نظامه البيئي.",
      btnIncentives: "اكتشف الدعم"
    },
    services: {
      title: "خدماتنا",
      subtitle: "القيمة المضافة لجمعيتنا لتأسيسك في المغرب.",
      list: [
        {
          title: "دعم الهبوط السلس",
          desc: "مساعدة شاملة لتثبيتك (الخدمات اللوجستية، وتأشيرات العمل، والبحث عن المقرات)."
        },
        {
          title: "الهندسة الإدارية",
          desc: "توجيه شخصي للاستفادة من دعم ميثاق الاستثمار الجديد."
        },
        {
          title: "شبكة الشركاء",
          desc: "الوصول المباشر إلى نظام بيئي من المصرفيين المحليين المعتمدين ومحامي الشركات."
        },
        {
          title: "استخبارات السوق",
          desc: "تقارير قطاعية محدثة ومراقبة تنظيمية في الوقت الفعلي."
        }
      ]
    },
    news: {
      title: "مركز استخبارات السوق",
      subtitle: "أحدث التحليلات والرؤى لإلقاء الضوء على قراراتك الاستثمارية.",
      btnSub: "اشترك في النشرة الإخبارية",
      articles: [
        {
          category: "تنظيم",
          title: "ميثاق الاستثمار الجديد: فك رموز الدعم الإقليمي",
          date: "15 أكتوبر 2026",
          readTime: "5 دقائق",
        },
        {
          category: "الصناعة 4.0",
          title: "كيف يعيد مصنع القنيطرة تشكيل سلسلة توريد السيارات",
          date: "02 أكتوبر 2026",
          readTime: "8 دقائق",
        },
        {
          category: "الطاقات الخضراء",
          title: "الهيدروجين الأخضر في الداخلة: المركز الجديد لغرب إفريقيا",
          date: "28 سبتمبر 2026",
          readTime: "6 دقائق",
        }
      ]
    },
    testimonial: {
      title: "هم يثقون بنا",
      quote: "بفضل الجمعية، خفضنا وقت التأسيس لدينا بمقدار 6 أشهر. كانت معرفتهم بالتروس المحلية في قطاع الطاقة الشمسية عاملاً رئيسياً لنجاحنا في ورزازات.",
      author: "مارك د.",
      role: "مدير تنفيذي لشركة أوروبية متعددة الجنسيات"
    },
    contact: {
      title: "دعونا نلتقي",
      subtitle: "احجز جلسة تقييم فيديو لمدة 15 دقيقة مع خبير أو اترك لنا رسالة.",
      calendlyBtn: "احجز موعداً",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      organization: "المنظمة / الشركة",
      location: "الموقع (المدينة / المنطقة)",
      sector: "قطاع الأعمال",
      project_size: "حجم المشروع (الاستثمار)",
      funding: "التمويل المطلوب",
      partners: "الشركاء المطلوبون",
      yields: "العائد المتوقع",
      visibility: "رؤية الطلب",
      visibilityOptions: { public: "عام (الظهور في بورصة المشاريع)", private: "خاص (لفريق MIA فقط)" },
      display_mode: "وضع العرض",
      displayModeOptions: { full: "مشروع كامل", partial: "إعلان تشويقي جزئي (إخفاء الهوية)" },
      message: "وصف المشروع",
      submit: "إرسال الطلب",
      success: "تم إرسال الطلب بنجاح!",
      error: "حدث خطأ."
    },
    leadMagnet: {
      title: "هل أنت مستعد لغزو السوق المغربي؟",
      subtitle: "قم بتنزيل الدليل النهائي للمستثمر 2026 (مجانًا)",
      placeholder: "بريدك الإلكتروني المهني...",
      button: "احصل على الدليل بصيغة PDF"
    },
    footer: {
      addressLabel: "العنوان",
      addressValue: "الدار البيضاء، المغرب",
      contactLabel: "اتصل بنا",
      contactValue: "contact@mia.ma",
      legal: "جمعية غير ربحية تخضع لظهير 1958."
    }
  }
};

function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const [currentPath, setCurrentPath] = useState(() => {
    const p = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (['/', '/association', '/expertise', '/opportunites', '/insights', '/contact'].includes(p)) {
      return p;
    }
    return '/';
  });
  const [currentPage, setCurrentPage] = useState<'home' | 'charte' | 'gigafactory' | 'hydrogene' | 'exchange'>('home');

  const [formState, setFormState] = useState({
    contact_name: '', contact_email: '', contact_phone: '', organization: '', location: '',
    project_size: '', project_sector: '', funding_needed: '', partner_needs: '', visibility: 'private', display_mode: 'full',
    expected_yields: '', description: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    const { error } = await supabase
      .from('project_requests')
      .insert([formState]);

    if (error) {
      console.error(error);
      setFormStatus('error');
    } else {
      setFormStatus('success');
      setFormState({
        contact_name: '', contact_email: '', contact_phone: '', organization: '', location: '',
        project_size: '', project_sector: '', funding_needed: '', partner_needs: '', visibility: 'private', display_mode: 'full',
        expected_yields: '', description: ''
      });
      setTimeout(() => setFormStatus('idle'), 5000); // Reset after 5s
    }
  };

  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  if (currentPage === 'charte') {
    return (
      <CharteInvestissement
        lang={lang}
        onBack={() => {
          setCurrentPage('home');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (currentPage === 'gigafactory') {
    return (
      <GigaFactory
        lang={lang}
        onBack={() => {
          setCurrentPage('home');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (currentPage === 'hydrogene') {
    return (
      <HydrogeneDakhla
        lang={lang}
        onBack={() => {
          setCurrentPage('home');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (currentPage === 'exchange') {
    return (
      <ProjectExchange
        lang={lang}
        onBack={() => {
          setCurrentPage('home');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <>
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div className="brand">
            MIA<span>.</span>
          </div>

          {/* Desktop Menu */}
          <div className="nav-links">
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
                <a href="#" className="dropdown-link" onClick={(e) => { e.preventDefault(); setCurrentPage('exchange'); window.history.pushState({}, '', '/opportunites'); setCurrentPath('/opportunites'); window.scrollTo(0, 0); }}>{t.nav.exchange}</a>
              </div>
            </div>

            <div className="nav-item">
              <a href="/insights" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('/insights'); }}>{t.nav.insightsMain} <ChevronDown size={14} /></a>
              <div className="dropdown-menu">
                <a href="#news" className="dropdown-link" onClick={(e) => { e.preventDefault(); navigateTo('/insights', 'news'); }}>{t.nav.news}</a>
              </div>
            </div>

            <div className="nav-item">
              <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('/contact', 'contact'); }}>{t.nav.contact}</a>
            </div>

            <div className="lang-switcher">
              <span className={`lang-switch ${lang === 'fr' ? 'active' : ''}`} onClick={() => setLang('fr')}>FR</span>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span className={`lang-switch ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</span>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span className={`lang-switch ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</span>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span className={`lang-switch ${lang === 'ar' ? 'active' : ''}`} onClick={() => setLang('ar')}>AR</span>
            </div>
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div style={{ fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem' }}>{t.nav.association}</div>
            <a href="#about" style={{ paddingLeft: '1rem', textTransform: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); navigateTo('/association', 'about'); }}>- {t.nav.about}</a>
            <a href="#team" style={{ paddingLeft: '1rem', textTransform: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); navigateTo('/association', 'team'); }}>- {t.nav.team}</a>
            <a href="#testimonial" style={{ paddingLeft: '1rem', textTransform: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); navigateTo('/association', 'testimonial'); }}>- {t.nav.testimonials}</a>

            <div style={{ fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem' }}>{t.nav.expertise}</div>
            <a href="#sectors" style={{ paddingLeft: '1rem', textTransform: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); navigateTo('/expertise', 'sectors'); }}>- {t.nav.sectors}</a>
            <a href="#map" style={{ paddingLeft: '1rem', textTransform: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); navigateTo('/expertise', 'map'); }}>- {t.nav.map}</a>
            <a href="#services" style={{ paddingLeft: '1rem', textTransform: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); navigateTo('/expertise', 'services'); }}>- {t.nav.services}</a>

            <div style={{ fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem' }}>{t.nav.opportunites}</div>
            <a href="#" style={{ paddingLeft: '1rem', textTransform: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setCurrentPage('exchange'); window.history.pushState({}, '', '/opportunites'); setCurrentPath('/opportunites'); window.scrollTo(0, 0); }}>- {t.nav.exchange}</a>

            <div style={{ fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem' }}>{t.nav.insightsMain}</div>
            <a href="#news" style={{ paddingLeft: '1rem', textTransform: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); navigateTo('/insights', 'news'); }}>- {t.nav.news}</a>

            <div style={{ fontWeight: 800, color: 'var(--royal-blue)', padding: '0.5rem 0', marginTop: '0.5rem' }}>{t.nav.contact}</div>
            <a href="#contact" style={{ paddingLeft: '1rem', textTransform: 'none', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); navigateTo('/contact', 'contact'); }}>- {t.nav.contact}</a>

            <div className="mobile-lang">
              <span className={lang === 'fr' ? 'active' : ''} onClick={() => { setLang('fr'); setIsMenuOpen(false); }}>FR</span>
              <span>|</span>
              <span className={lang === 'en' ? 'active' : ''} onClick={() => { setLang('en'); setIsMenuOpen(false); }}>EN</span>
              <span>|</span>
              <span className={lang === 'es' ? 'active' : ''} onClick={() => { setLang('es'); setIsMenuOpen(false); }}>ES</span>
              <span>|</span>
              <span className={lang === 'ar' ? 'active' : ''} onClick={() => { setLang('ar'); setIsMenuOpen(false); }}>AR</span>
            </div>
          </div>
        )}
      </nav>

      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "arabic-text" : ""}>
        {(currentPath === '/') && (
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
        )}

        {(currentPath === '/' || currentPath === '/association') && (
          <>
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

            <section id="team" className="team-section">
              <div className="container">
                <h2 className="section-title">{t.team.title}</h2>
                <p className="section-subtitle">{t.team.subtitle}</p>

                <div className="team-grid">
                  {t.team.members.map((member, idx) => (
                    <div className="team-card hover-card" key={idx}>
                      <div className="team-avatar">
                        {/* Placeholder for real headshot */}
                      </div>
                      <div className="team-info">
                        <h3>{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        <p className="team-exp">{member.exp}</p>
                        <a href="#linkedin" className="team-social">
                          <Linkedin size={20} /> LinkedIn
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {(currentPath === '/' || currentPath === '/expertise') && (
          <>
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
          </>
        )}

        {(currentPath === '/' || currentPath === '/insights') && (
          <section id="news" className="news-section">
            <div className="container">
              <div className="news-header">
                <div>
                  <h2 className="section-title text-left">{t.news.title}</h2>
                  <p className="section-subtitle text-left mb-5" style={{ marginInline: 0 }}>{t.news.subtitle}</p>
                </div>
                <a href="#contact" className="btn btn-outline desk-only">{t.news.btnSub}</a>
              </div>

              <div className="news-grid">
                {t.news.articles.map((article, idx) => (
                  <a
                    href="#news"
                    className="news-card hover-card"
                    key={idx}
                    onClick={(e) => {
                      if (idx === 0) { // First article is the charter
                        e.preventDefault();
                        setCurrentPage('charte');
                        window.scrollTo(0, 0);
                      } else if (idx === 1) { // Second article is the GigaFactory
                        e.preventDefault();
                        setCurrentPage('gigafactory');
                        window.scrollTo(0, 0);
                      } else if (idx === 2) { // Third article is Hydrogen
                        e.preventDefault();
                        setCurrentPage('hydrogene');
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    <div className="news-image-placeholder">
                      <TrendingUp size={40} color="var(--royal-blue-light)" opacity={0.5} />
                    </div>
                    <div className="news-content">
                      <div className="news-meta">
                        <span className="news-category">{article.category}</span>
                        <span className="news-date">{article.date}</span>
                      </div>
                      <h3 className="news-title">{article.title}</h3>
                      <div className="news-read-more">
                        <span>{article.readTime}</span>
                        <ArrowUpRight size={20} className="arrow-icon" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {(currentPath === '/' || currentPath === '/association') && (
          <section id="testimonial" className="testimonial-section">
            <div className="container testimonial-container">
              <h2 className="section-title text-light">{t.testimonial.title}</h2>
              <Quote size={60} className="quote-icon mx-auto" />
              <p className="testimonial-quote">"{t.testimonial.quote}"</p>
              <div className="testimonial-author">{t.testimonial.author}</div>
              <div className="testimonial-role">{t.testimonial.role}</div>
            </div>
          </section>
        )}

        {(currentPath === '/' || currentPath === '/contact') && (
          <>
            <section id="lead-magnet" className="lead-magnet-section">
              <div className="container">
                <div className="lead-magnet-box">
                  <div className="lead-magnet-content">
                    <h2>{t.leadMagnet.title}</h2>
                    <p>{t.leadMagnet.subtitle}</p>
                    <form className="lead-magnet-form" onSubmit={(e) => e.preventDefault()}>
                      <input type="email" placeholder={t.leadMagnet.placeholder} required />
                      <button type="submit" className="btn btn-primary">
                        <Download size={18} className="mr-2" style={{ marginRight: '8px' }} /> {t.leadMagnet.button}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" className="contact-section">
              <div className="container contact-container">
                <div className="contact-form-wrapper">
                  <div className="contact-header">
                    <h2 className="section-title text-left">{t.contact.title}</h2>
                    <p className="section-subtitle text-left mb-5" style={{ marginInline: 0 }}>{t.contact.subtitle}</p>
                  </div>

                  <div className="contact-split">
                    {/* Calendly booking CTA mock */}
                    <div className="calendly-box">
                      <CalendarCheck size={48} color="var(--sand-gold)" style={{ marginBottom: '1rem' }} />
                      <h3>Fast Track</h3>
                      <p>Gagnez du temps et discutez directement de vos enjeux avec nos experts locaux.</p>
                      <a href="#calendly" className="btn btn-primary w-full mt-4" style={{ marginTop: '1.5rem' }}>
                        {t.contact.calendlyBtn}
                      </a>
                    </div>

                    {/* Standard Form */}
                    <form className="contact-form shadow-form" onSubmit={handleFormSubmit}>
                      {formStatus === 'success' && <div style={{ color: 'green', marginBottom: '1rem', fontWeight: 600 }}>{t.contact.success || 'Success!'}</div>}
                      {formStatus === 'error' && <div style={{ color: 'red', marginBottom: '1rem', fontWeight: 600 }}>{t.contact.error || 'Error!'}</div>}

                      <div className="form-group">
                        <label>{t.contact.name}</label>
                        <input type="text" placeholder={t.contact.name} required value={formState.contact_name} onChange={(e) => setFormState({ ...formState, contact_name: e.target.value })} />
                      </div>
                      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label>{t.contact.email}</label>
                          <input type="email" placeholder={t.contact.email} required value={formState.contact_email} onChange={(e) => setFormState({ ...formState, contact_email: e.target.value })} />
                        </div>
                        <div>
                          <label>{t.contact.phone}</label>
                          <input type="text" placeholder={t.contact.phone || 'Phone'} value={formState.contact_phone} onChange={(e) => setFormState({ ...formState, contact_phone: e.target.value })} />
                        </div>
                      </div>
                      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label>{t.contact.organization}</label>
                          <input type="text" placeholder={t.contact.organization || 'Company'} value={formState.organization} onChange={(e) => setFormState({ ...formState, organization: e.target.value })} />
                        </div>
                        <div>
                          <label>{t.contact.project_size}</label>
                          <input type="text" placeholder="ex: 50M MAD" value={formState.project_size} onChange={(e) => setFormState({ ...formState, project_size: e.target.value })} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>{t.contact.sector}</label>
                        <select required value={formState.project_sector} onChange={(e) => setFormState({ ...formState, project_sector: e.target.value })}>
                          <option value="">Sélectionnez / Select</option>
                          <option value="energie">Énergies Renouvelables</option>
                          <option value="peche">Économie Bleue & Pêche</option>
                          <option value="agritech">AgriTech & Industrie</option>
                          <option value="autre">Autre / Other</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label>{t.contact.funding}</label>
                          <input type="text" placeholder="ex: 80%" value={formState.funding_needed} onChange={(e) => setFormState({ ...formState, funding_needed: e.target.value })} />
                        </div>
                        <div>
                          <label>{t.contact.partners}</label>
                          <input type="text" placeholder="ex: Joint venture" value={formState.partner_needs} onChange={(e) => setFormState({ ...formState, partner_needs: e.target.value })} />
                        </div>
                        <div>
                          <label>{t.contact.yields}</label>
                          <input type="text" placeholder="ex: 12% IRR" value={formState.expected_yields} onChange={(e) => setFormState({ ...formState, expected_yields: e.target.value })} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>{t.contact.message}</label>
                        <textarea rows={4} required placeholder={t.contact.message} value={formState.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })}></textarea>
                      </div>

                      <button className="btn btn-primary w-full" type="submit" disabled={formStatus === 'loading'}>
                        <Mail size={18} className="mr-2" style={{ marginRight: '8px' }} /> {formStatus === 'loading' ? '...' : t.contact.submit}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

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
      </div>
    </>
  )
}

export default App
