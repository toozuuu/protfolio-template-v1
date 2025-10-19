import { Injectable, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { EuropeanOptimizationService } from './european-optimization.service';

export interface EuropeanSEOConfig {
  region: string;
  language: string;
  hreflang: string;
  searchEngines: string[];
  keywords: string[];
  structuredData: any;
  metaTags: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
}

@Injectable({ providedIn: 'root' })
export class EuropeanSEOService {
  private readonly isBrowser: boolean;
  private readonly _currentConfig = signal<EuropeanSEOConfig | null>(null);
  
  // Computed signals
  readonly currentConfig = this._currentConfig.asReadonly();
  readonly isEuropeanSEO = computed(() => this._currentConfig() !== null);
  
  // European SEO configurations
  private readonly seoConfigs: { [key: string]: EuropeanSEOConfig } = {
    'de': {
      region: 'DE',
      language: 'de',
      hreflang: 'de-DE',
      searchEngines: ['google.de', 'bing.com'],
      keywords: [
        'Angular Entwickler',
        'Frontend Entwickler',
        'TypeScript Entwickler',
        'Webentwicklung',
        'UI/UX Design',
        'Technischer Leiter',
        'Software Entwickler',
        'React Entwickler',
        'Node.js Entwickler',
        'Freelancer Entwickler'
      ],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Sachin Dilshan',
        'jobTitle': 'Technical Lead - Frontend',
        'description': 'Technical Lead bei We Make Platforms mit über 5 Jahren Erfahrung in Frontend-Entwicklung, UI/UX-Design und Cloud-basierter Anwendungsentwicklung.',
        'url': 'https://sachindilshan.netlify.app/',
        'image': 'https://sachindilshan.netlify.app/assets/My_Photo.jpg',
        'sameAs': [
          'https://github.com/toozuuu',
          'https://linkedin.com/in/sachindilshan',
          'https://twitter.com/sachindilshan'
        ],
        'knowsAbout': [
          'Angular',
          'TypeScript',
          'React',
          'Node.js',
          'Ionic',
          'Flutter',
          'AWS',
          'Frontend-Entwicklung',
          'UI/UX Design'
        ],
        'worksFor': {
          '@type': 'Organization',
          'name': 'We Make Platforms'
        },
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'LK'
        }
      },
      metaTags: {
        title: 'Sachin Dilshan - Technical Lead & Frontend Entwickler',
        description: 'Technical Lead bei We Make Platforms mit über 5 Jahren Erfahrung in Frontend-Entwicklung, UI/UX-Design und Cloud-basierter Anwendungsentwicklung. Spezialisiert auf Angular, TypeScript, React und moderne Web-Technologien.',
        keywords: 'Sachin Dilshan, Technical Lead, Frontend Entwickler, Angular, TypeScript, React, Node.js, UI/UX Design, Sri Lanka, We Make Platforms, Flutter, AWS',
        ogTitle: 'Sachin Dilshan - Technical Lead & Frontend Entwickler',
        ogDescription: 'Technical Lead bei We Make Platforms mit über 5 Jahren Erfahrung in Frontend-Entwicklung, UI/UX-Design und Cloud-basierter Anwendungsentwicklung.',
        twitterTitle: 'Sachin Dilshan - Technical Lead & Frontend Entwickler',
        twitterDescription: 'Technical Lead bei We Make Platforms mit über 5 Jahren Erfahrung in Frontend-Entwicklung, UI/UX-Design und Cloud-basierter Anwendungsentwicklung.'
      }
    },
    'fr': {
      region: 'FR',
      language: 'fr',
      hreflang: 'fr-FR',
      searchEngines: ['google.fr', 'bing.com'],
      keywords: [
        'Développeur Angular',
        'Développeur Frontend',
        'Développeur TypeScript',
        'Développement Web',
        'Design UI/UX',
        'Lead Technique',
        'Développeur Logiciel',
        'Développeur React',
        'Développeur Node.js',
        'Freelance Développeur'
      ],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Sachin Dilshan',
        'jobTitle': 'Lead Technique - Frontend',
        'description': 'Lead Technique chez We Make Platforms avec plus de 5 ans d\'expérience en Développement Frontend, Design UI/UX et développement d\'applications basées sur le cloud.',
        'url': 'https://sachindilshan.netlify.app/',
        'image': 'https://sachindilshan.netlify.app/assets/My_Photo.jpg',
        'sameAs': [
          'https://github.com/toozuuu',
          'https://linkedin.com/in/sachindilshan',
          'https://twitter.com/sachindilshan'
        ],
        'knowsAbout': [
          'Angular',
          'TypeScript',
          'React',
          'Node.js',
          'Ionic',
          'Flutter',
          'AWS',
          'Développement Frontend',
          'Design UI/UX'
        ],
        'worksFor': {
          '@type': 'Organization',
          'name': 'We Make Platforms'
        },
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'LK'
        }
      },
      metaTags: {
        title: 'Sachin Dilshan - Lead Technique & Développeur Frontend',
        description: 'Lead Technique chez We Make Platforms avec plus de 5 ans d\'expérience en Développement Frontend, Design UI/UX et développement d\'applications basées sur le cloud. Spécialisé en Angular, TypeScript, React et technologies web modernes.',
        keywords: 'Sachin Dilshan, Lead Technique, Développeur Frontend, Angular, TypeScript, React, Node.js, Design UI/UX, Sri Lanka, We Make Platforms, Flutter, AWS',
        ogTitle: 'Sachin Dilshan - Lead Technique & Développeur Frontend',
        ogDescription: 'Lead Technique chez We Make Platforms avec plus de 5 ans d\'expérience en Développement Frontend, Design UI/UX et développement d\'applications basées sur le cloud.',
        twitterTitle: 'Sachin Dilshan - Lead Technique & Développeur Frontend',
        twitterDescription: 'Lead Technique chez We Make Platforms avec plus de 5 ans d\'expérience en Développement Frontend, Design UI/UX et développement d\'applications basées sur le cloud.'
      }
    },
    'es': {
      region: 'ES',
      language: 'es',
      hreflang: 'es-ES',
      searchEngines: ['google.es', 'bing.com'],
      keywords: [
        'Desarrollador Angular',
        'Desarrollador Frontend',
        'Desarrollador TypeScript',
        'Desarrollo Web',
        'Diseño UI/UX',
        'Líder Técnico',
        'Desarrollador de Software',
        'Desarrollador React',
        'Desarrollador Node.js',
        'Freelance Desarrollador'
      ],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Sachin Dilshan',
        'jobTitle': 'Líder Técnico - Frontend',
        'description': 'Líder Técnico en We Make Platforms con más de 5 años de experiencia en Desarrollo Frontend, Diseño UI/UX y desarrollo de aplicaciones basadas en la nube.',
        'url': 'https://sachindilshan.netlify.app/',
        'image': 'https://sachindilshan.netlify.app/assets/My_Photo.jpg',
        'sameAs': [
          'https://github.com/toozuuu',
          'https://linkedin.com/in/sachindilshan',
          'https://twitter.com/sachindilshan'
        ],
        'knowsAbout': [
          'Angular',
          'TypeScript',
          'React',
          'Node.js',
          'Ionic',
          'Flutter',
          'AWS',
          'Desarrollo Frontend',
          'Diseño UI/UX'
        ],
        'worksFor': {
          '@type': 'Organization',
          'name': 'We Make Platforms'
        },
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'LK'
        }
      },
      metaTags: {
        title: 'Sachin Dilshan - Líder Técnico & Desarrollador Frontend',
        description: 'Líder Técnico en We Make Platforms con más de 5 años de experiencia en Desarrollo Frontend, Diseño UI/UX y desarrollo de aplicaciones basadas en la nube. Especializado en Angular, TypeScript, React y tecnologías web modernas.',
        keywords: 'Sachin Dilshan, Líder Técnico, Desarrollador Frontend, Angular, TypeScript, React, Node.js, Diseño UI/UX, Sri Lanka, We Make Platforms, Flutter, AWS',
        ogTitle: 'Sachin Dilshan - Líder Técnico & Desarrollador Frontend',
        ogDescription: 'Líder Técnico en We Make Platforms con más de 5 años de experiencia en Desarrollo Frontend, Diseño UI/UX y desarrollo de aplicaciones basadas en la nube.',
        twitterTitle: 'Sachin Dilshan - Líder Técnico & Desarrollador Frontend',
        twitterDescription: 'Líder Técnico en We Make Platforms con más de 5 años de experiencia en Desarrollo Frontend, Diseño UI/UX y desarrollo de aplicaciones basadas en la nube.'
      }
    },
    'pt': {
      region: 'PT',
      language: 'pt',
      hreflang: 'pt-PT',
      searchEngines: ['google.pt', 'bing.com'],
      keywords: [
        'Desenvolvedor Angular',
        'Desenvolvedor Frontend',
        'Desenvolvedor TypeScript',
        'Desenvolvimento Web',
        'Design UI/UX',
        'Líder Técnico',
        'Desenvolvedor de Software',
        'Desenvolvedor React',
        'Desenvolvedor Node.js',
        'Freelance Desenvolvedor'
      ],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Sachin Dilshan',
        'jobTitle': 'Líder Técnico - Frontend',
        'description': 'Líder Técnico na We Make Platforms com mais de 5 anos de experiência em Desenvolvimento Frontend, Design UI/UX e desenvolvimento de aplicações baseadas em nuvem.',
        'url': 'https://sachindilshan.netlify.app/',
        'image': 'https://sachindilshan.netlify.app/assets/My_Photo.jpg',
        'sameAs': [
          'https://github.com/toozuuu',
          'https://linkedin.com/in/sachindilshan',
          'https://twitter.com/sachindilshan'
        ],
        'knowsAbout': [
          'Angular',
          'TypeScript',
          'React',
          'Node.js',
          'Ionic',
          'Flutter',
          'AWS',
          'Desenvolvimento Frontend',
          'Design UI/UX'
        ],
        'worksFor': {
          '@type': 'Organization',
          'name': 'We Make Platforms'
        },
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'LK'
        }
      },
      metaTags: {
        title: 'Sachin Dilshan - Líder Técnico & Desenvolvedor Frontend',
        description: 'Líder Técnico na We Make Platforms com mais de 5 anos de experiência em Desenvolvimento Frontend, Design UI/UX e desenvolvimento de aplicações baseadas em nuvem. Especializado em Angular, TypeScript, React e tecnologias web modernas.',
        keywords: 'Sachin Dilshan, Líder Técnico, Desenvolvedor Frontend, Angular, TypeScript, React, Node.js, Design UI/UX, Sri Lanka, We Make Platforms, Flutter, AWS',
        ogTitle: 'Sachin Dilshan - Líder Técnico & Desenvolvedor Frontend',
        ogDescription: 'Líder Técnico na We Make Platforms com mais de 5 anos de experiência em Desenvolvimento Frontend, Design UI/UX e desenvolvimento de aplicações baseadas em nuvem.',
        twitterTitle: 'Sachin Dilshan - Líder Técnico & Desenvolvedor Frontend',
        twitterDescription: 'Líder Técnico na We Make Platforms com mais de 5 anos de experiência em Desenvolvimento Frontend, Design UI/UX e desenvolvimento de aplicações baseadas em nuvem.'
      }
    },
    'sv': {
      region: 'SE',
      language: 'sv',
      hreflang: 'sv-SE',
      searchEngines: ['google.se', 'bing.com'],
      keywords: [
        'Angular Utvecklare',
        'Frontend Utvecklare',
        'TypeScript Utvecklare',
        'Webutveckling',
        'UI/UX Design',
        'Teknisk Ledare',
        'Mjukvaruutvecklare',
        'React Utvecklare',
        'Node.js Utvecklare',
        'Freelance Utvecklare'
      ],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Sachin Dilshan',
        'jobTitle': 'Teknisk Ledare - Frontend',
        'description': 'Teknisk Ledare på We Make Platforms med över 5 års erfarenhet inom Frontend-utveckling, UI/UX-design och molnbaserad applikationsutveckling.',
        'url': 'https://sachindilshan.netlify.app/',
        'image': 'https://sachindilshan.netlify.app/assets/My_Photo.jpg',
        'sameAs': [
          'https://github.com/toozuuu',
          'https://linkedin.com/in/sachindilshan',
          'https://twitter.com/sachindilshan'
        ],
        'knowsAbout': [
          'Angular',
          'TypeScript',
          'React',
          'Node.js',
          'Ionic',
          'Flutter',
          'AWS',
          'Frontend-utveckling',
          'UI/UX Design'
        ],
        'worksFor': {
          '@type': 'Organization',
          'name': 'We Make Platforms'
        },
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'LK'
        }
      },
      metaTags: {
        title: 'Sachin Dilshan - Teknisk Ledare & Frontend Utvecklare',
        description: 'Teknisk Ledare på We Make Platforms med över 5 års erfarenhet inom Frontend-utveckling, UI/UX-design och molnbaserad applikationsutveckling. Specialiserad på Angular, TypeScript, React och moderna webbteknologier.',
        keywords: 'Sachin Dilshan, Teknisk Ledare, Frontend Utvecklare, Angular, TypeScript, React, Node.js, UI/UX Design, Sri Lanka, We Make Platforms, Flutter, AWS',
        ogTitle: 'Sachin Dilshan - Teknisk Ledare & Frontend Utvecklare',
        ogDescription: 'Teknisk Ledare på We Make Platforms med över 5 års erfarenhet inom Frontend-utveckling, UI/UX-design och molnbaserad applikationsutveckling.',
        twitterTitle: 'Sachin Dilshan - Teknisk Ledare & Frontend Utvecklare',
        twitterDescription: 'Teknisk Ledare på We Make Platforms med över 5 års erfarenhet inom Frontend-utveckling, UI/UX-design och molnbaserad applikationsutveckling.'
      }
    }
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title,
    private europeanOptimization: EuropeanOptimizationService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeEuropeanSEO();
  }

  private async initializeEuropeanSEO(): Promise<void> {
    if (!this.isBrowser) return;
    
    try {
      const userRegion = this.europeanOptimization.userRegion();
      if (userRegion) {
        const seoConfig = this.seoConfigs[userRegion.language];
        if (seoConfig) {
          this._currentConfig.set(seoConfig);
          this.applyEuropeanSEO(seoConfig);
        }
      }
    } catch (error) {
      console.warn('Failed to initialize European SEO:', error);
    }
  }

  private applyEuropeanSEO(config: EuropeanSEOConfig): void {
    // Apply meta tags
    this.applyMetaTags(config.metaTags);
    
    // Apply structured data
    this.applyStructuredData(config.structuredData);
    
    // Apply hreflang
    this.applyHreflang(config.hreflang);
    
    // Apply region-specific optimizations
    this.applyRegionOptimizations(config);
  }

  private applyMetaTags(metaTags: any): void {
    // Set title
    this.title.setTitle(metaTags.title);
    
    // Set meta description
    this.meta.updateTag({ name: 'description', content: metaTags.description });
    
    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: metaTags.keywords });
    
    // Set Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: metaTags.ogTitle });
    this.meta.updateTag({ property: 'og:description', content: metaTags.ogDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://sachindilshan.netlify.app/' });
    this.meta.updateTag({ property: 'og:image', content: 'https://sachindilshan.netlify.app/assets/My_Photo.jpg' });
    
    // Set Twitter tags
    this.meta.updateTag({ name: 'twitter:title', content: metaTags.twitterTitle });
    this.meta.updateTag({ name: 'twitter:description', content: metaTags.twitterDescription });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://sachindilshan.netlify.app/assets/My_Photo.jpg' });
  }

  private applyStructuredData(structuredData: any): void {
    // Add structured data to the page
    if (this.isBrowser) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }

  private applyHreflang(hreflang: string): void {
    // Add hreflang meta tag
    this.meta.updateTag({ name: 'hreflang', content: hreflang });
  }

  private applyRegionOptimizations(config: EuropeanSEOConfig): void {
    // Apply region-specific SEO optimizations
    if (this.isBrowser) {
      // Set language attribute
      document.documentElement.setAttribute('lang', config.language);
      
      // Add region-specific meta tags
      this.meta.updateTag({ name: 'geo.region', content: config.region });
      this.meta.updateTag({ name: 'geo.country', content: config.region });
      
      // Add search engine specific optimizations
      this.applySearchEngineOptimizations(config.searchEngines);
    }
  }

  private applySearchEngineOptimizations(searchEngines: string[]): void {
    // Apply search engine specific optimizations
    searchEngines.forEach(engine => {
      if (engine.includes('google')) {
        // Google-specific optimizations
        this.meta.updateTag({ name: 'google-site-verification', content: 'your-google-verification-code' });
      }
      
      if (engine.includes('bing')) {
        // Bing-specific optimizations
        this.meta.updateTag({ name: 'msvalidate.01', content: 'your-bing-verification-code' });
      }
    });
  }

  // Public methods for accessing SEO data
  getCurrentKeywords(): string[] {
    return this._currentConfig()?.keywords || [];
  }

  getCurrentRegion(): string | null {
    return this._currentConfig()?.region || null;
  }

  getCurrentLanguage(): string | null {
    return this._currentConfig()?.language || null;
  }

  getCurrentHreflang(): string | null {
    return this._currentConfig()?.hreflang || null;
  }

  // Method to update SEO for specific page
  updatePageSEO(page: string, customMeta?: any): void {
    const config = this._currentConfig();
    if (!config) return;
    
    // Apply page-specific SEO
    const pageMeta = this.getPageSpecificMeta(page, config);
    if (pageMeta) {
      this.applyMetaTags(pageMeta);
    }
    
    // Apply custom meta if provided
    if (customMeta) {
      this.applyMetaTags(customMeta);
    }
  }

  private getPageSpecificMeta(page: string, config: EuropeanSEOConfig): any {
    // Return page-specific meta tags based on the page and language
    switch (page) {
      case 'hire':
        return {
          title: `${config.metaTags.title} - ${this.getHireTitle(config.language)}`,
          description: `${config.metaTags.description} ${this.getHireDescription(config.language)}`,
          keywords: `${config.metaTags.keywords}, ${this.getHireKeywords(config.language)}`,
          ogTitle: `${config.metaTags.ogTitle} - ${this.getHireTitle(config.language)}`,
          ogDescription: `${config.metaTags.ogDescription} ${this.getHireDescription(config.language)}`,
          twitterTitle: `${config.metaTags.twitterTitle} - ${this.getHireTitle(config.language)}`,
          twitterDescription: `${config.metaTags.twitterDescription} ${this.getHireDescription(config.language)}`
        };
      default:
        return config.metaTags;
    }
  }

  private getHireTitle(language: string): string {
    const titles: { [key: string]: string } = {
      'de': 'Angular Beratung & Frontend Entwicklung',
      'fr': 'Consultation Angular & Développement Frontend',
      'es': 'Consultoría Angular & Desarrollo Frontend',
      'pt': 'Consultoria Angular & Desenvolvimento Frontend',
      'sv': 'Angular Konsultation & Frontend Utveckling'
    };
    return titles[language] || 'Angular Consulting & Frontend Development';
  }

  private getHireDescription(language: string): string {
    const descriptions: { [key: string]: string } = {
      'de': 'Professionelle Angular-Beratungsdienste einschließlich Code-Audits, Leistungsoptimierung, UX-Verbesserungen und Team-Coaching.',
      'fr': 'Services de consultation Angular professionnels incluant audits de code, optimisation des performances, améliorations UX et coaching d\'équipe.',
      'es': 'Servicios de consultoría Angular profesionales incluyendo auditorías de código, optimización de rendimiento, mejoras UX y coaching de equipo.',
      'pt': 'Serviços de consultoria Angular profissionais incluindo auditorias de código, otimização de performance, melhorias UX e coaching de equipe.',
      'sv': 'Professionella Angular-konsultationstjänster inklusive kodrevisioner, prestandaoptimering, UX-förbättringar och teamcoaching.'
    };
    return descriptions[language] || 'Professional Angular consulting services including code audits, performance optimization, UX improvements, and team coaching.';
  }

  private getHireKeywords(language: string): string {
    const keywords: { [key: string]: string } = {
      'de': 'Angular Beratung, Frontend Entwicklung, Leistungsoptimierung, Code Audit, UX Design, Team Coaching',
      'fr': 'Consultation Angular, Développement Frontend, Optimisation Performance, Audit Code, Design UX, Coaching Équipe',
      'es': 'Consultoría Angular, Desarrollo Frontend, Optimización Rendimiento, Auditoría Código, Diseño UX, Coaching Equipo',
      'pt': 'Consultoria Angular, Desenvolvimento Frontend, Otimização Performance, Auditoria Código, Design UX, Coaching Equipe',
      'sv': 'Angular Konsultation, Frontend Utveckling, Prestandaoptimering, Kodrevision, UX Design, Team Coaching'
    };
    return keywords[language] || 'Angular consulting, Frontend development, Performance optimization, Code audit, UX design, Team coaching';
  }
}
