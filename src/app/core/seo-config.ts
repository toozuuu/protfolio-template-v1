export const SEO_CONFIG = {
  // Base URL for the website
  baseUrl: 'https://sachindilshan.netlify.app',

  // Default language
  defaultLanguage: 'en',

  // Supported languages
  supportedLanguages: [
    { code: 'en', name: 'English', locale: 'en_US' },
    { code: 'si', name: 'සිංහල', locale: 'si_LK' },
    { code: 'sv', name: 'Svenska', locale: 'sv_SE' },
    { code: 'es', name: 'Español', locale: 'es_ES' },
    { code: 'fr', name: 'Français', locale: 'fr_FR' },
    { code: 'de', name: 'Deutsch', locale: 'de_DE' },
    { code: 'pt', name: 'Português', locale: 'pt_PT' },
    { code: 'zh', name: '中文', locale: 'zh_CN' },
    { code: 'ja', name: '日本語', locale: 'ja_JP' },
    { code: 'ko', name: '한국어', locale: 'ko_KR' },
    { code: 'hi', name: 'हिन्दी', locale: 'hi_IN' },
  ],

  // Social media profiles
  socialProfiles: {
    github: 'https://github.com/toozuuu',
    linkedin: 'https://linkedin.com/in/sachindilshan',
    twitter: 'https://twitter.com/sachindilshan',
    email: 'sachindilshan040@gmail.com',
  },

  // SEO metadata
  metadata: {
    author: 'Sachin Dilshan',
    siteName: 'Sachin Dilshan Portfolio',
    themeColor: '#3b82f6',
    image: '/assets/My_Photo.jpg',
    type: 'website',
  },

  // Page-specific SEO data
  pages: {
    home: {
      title: 'Sachin Dilshan - Technical Lead & Frontend Developer',
      description:
        'Technical Lead at We Make Platforms with 5+ years of experience in Frontend Development, UI/UX Design, and Cloud-based applications. Specialized in Angular, TypeScript, React, and modern web technologies.',
      keywords:
        'Sachin Dilshan, Technical Lead, Frontend Developer, Angular, TypeScript, React, Node.js, UI/UX Design, Sri Lanka, We Make Platforms, Flutter, AWS',
      priority: 1.0,
      changefreq: 'weekly',
    },
    hire: {
      title: 'Hire Sachin Dilshan - Angular Consulting & Frontend Development',
      description:
        'Professional Angular consulting services including code audits, performance optimization, UX improvements, and team coaching. 5+ years experience in frontend development.',
      keywords:
        'Angular consulting, Frontend development, Performance optimization, Code audit, UX design, Team coaching, Angular training, TypeScript',
      priority: 0.8,
      changefreq: 'monthly',
    },
  },

  // Structured data templates
  structuredData: {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sachin Dilshan',
      jobTitle: 'Technical Lead - Frontend',
      description:
        'Technical Lead at We Make Platforms with 5+ years of experience in Frontend Development, UI/UX Design, and Cloud-based applications.',
      url: 'https://sachindilshan.netlify.app/',
      image: 'https://sachindilshan.netlify.app/assets/My_Photo.jpg',
      sameAs: [
        'https://github.com/toozuuu',
        'https://linkedin.com/in/sachindilshan',
        'https://twitter.com/sachindilshan',
      ],
      knowsAbout: [
        'Angular',
        'TypeScript',
        'React',
        'Node.js',
        'Ionic',
        'Flutter',
        'AWS',
        'Frontend Development',
        'UI/UX Design',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'We Make Platforms',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'LK',
      },
    },
    professionalService: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Sachin Dilshan - Angular Consulting',
      description:
        'Professional Angular consulting services including code audits, performance optimization, UX improvements, and team coaching.',
      url: 'https://sachindilshan.netlify.app/hire',
      provider: {
        '@type': 'Person',
        name: 'Sachin Dilshan',
        jobTitle: 'Technical Lead - Frontend',
      },
      areaServed: 'Global',
      serviceType: ['Angular Audit', 'Performance Sprint', 'UX Polish', 'Coaching'],
      priceRange: '$$',
    },
  },
};
