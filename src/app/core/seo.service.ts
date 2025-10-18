import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  author: string;
  image: string;
  url: string;
  type: string;
  siteName: string;
  locale: string;
  alternateLocales?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SEOService {
  private readonly isBrowser: boolean;
  private readonly baseUrl = 'https://sachindilshan.netlify.app';

  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  updateSEO(data: SEOData): void {
    if (!this.isBrowser) return;

    // Update title
    this.title.setTitle(data.title);

    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'keywords', content: data.keywords });
    this.meta.updateTag({ name: 'author', content: data.author });
    this.meta.updateTag({ name: 'robots', content: this.getRobotsContent(data) });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image });
    this.meta.updateTag({ property: 'og:url', content: data.url });
    this.meta.updateTag({ property: 'og:type', content: data.type });
    this.meta.updateTag({ property: 'og:site_name', content: data.siteName });
    this.meta.updateTag({ property: 'og:locale', content: data.locale });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image });

    // Language and alternate locales
    this.document.documentElement.setAttribute('lang', data.locale);
    if (data.alternateLocales) {
      data.alternateLocales.forEach(locale => {
        this.meta.updateTag({ property: 'og:locale:alternate', content: locale });
      });
    }

    // Canonical URL
    if (data.canonicalUrl) {
      this.updateCanonicalUrl(data.canonicalUrl);
    }
  }

  updateCanonicalUrl(url: string): void {
    if (!this.isBrowser) return;

    const canonicalUrl = `${this.baseUrl}${url}`;
    let canonicalLink = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      this.document.head.appendChild(canonicalLink);
    }
  }

  addStructuredData(data: any): void {
    if (!this.isBrowser) return;

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  private getRobotsContent(data: SEOData): string {
    const robots = [];
    if (data.noIndex) robots.push('noindex');
    if (data.noFollow) robots.push('nofollow');
    if (robots.length === 0) robots.push('index', 'follow');
    return robots.join(', ');
  }

  // Home page SEO
  setHomePageSEO(language: string = 'en'): void {
    const translations = this.getHomePageTranslations(language);
    
    this.updateSEO({
      title: translations.title,
      description: translations.description,
      keywords: translations.keywords,
      author: 'Sachin Dilshan',
      image: `${this.baseUrl}/assets/My_Photo.jpg`,
      url: `${this.baseUrl}/`,
      type: 'website',
      siteName: 'Sachin Dilshan Portfolio',
      locale: language,
      alternateLocales: ['en', 'si', 'sv', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko', 'hi'],
      canonicalUrl: '/'
    });

    // Add structured data for Person
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sachin Dilshan',
      jobTitle: 'Technical Lead - Frontend',
      description: translations.description,
      url: `${this.baseUrl}/`,
      image: `${this.baseUrl}/assets/My_Photo.jpg`,
      sameAs: [
        'https://github.com/toozuuu',
        'https://linkedin.com/in/sachindilshan',
        'https://twitter.com/sachindilshan'
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
        'UI/UX Design'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'We Make Platforms'
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'LK'
      }
    });
  }

  // Hire page SEO
  setHirePageSEO(language: string = 'en'): void {
    const translations = this.getHirePageTranslations(language);
    
    this.updateSEO({
      title: translations.title,
      description: translations.description,
      keywords: translations.keywords,
      author: 'Sachin Dilshan',
      image: `${this.baseUrl}/assets/My_Photo.jpg`,
      url: `${this.baseUrl}/hire`,
      type: 'website',
      siteName: 'Sachin Dilshan Portfolio',
      locale: language,
      canonicalUrl: '/hire'
    });

    // Add structured data for ProfessionalService
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Sachin Dilshan - Angular Consulting',
      description: translations.description,
      url: `${this.baseUrl}/hire`,
      provider: {
        '@type': 'Person',
        name: 'Sachin Dilshan',
        jobTitle: 'Technical Lead - Frontend'
      },
      areaServed: 'Global',
      serviceType: [
        'Angular Audit',
        'Performance Sprint',
        'UX Polish',
        'Coaching'
      ],
      priceRange: '$$'
    });
  }

  private getHomePageTranslations(language: string): any {
    const translations: { [key: string]: any } = {
      en: {
        title: 'Sachin Dilshan - Technical Lead & Frontend Developer',
        description: 'Technical Lead at We Make Platforms with 5+ years of experience in Frontend Development, UI/UX Design, and Cloud-based applications. Specialized in Angular, TypeScript, React, and modern web technologies.',
        keywords: 'Sachin Dilshan, Technical Lead, Frontend Developer, Angular, TypeScript, React, Node.js, UI/UX Design, Sri Lanka, We Make Platforms'
      },
      si: {
        title: 'සචින් දිල්ශාන් - තාක්ෂණික නායක සහ පෙරබිම් සංවර්ධක',
        description: 'We Make Platforms හි තාක්ෂණික නායකයෙක් වන අතර පෙරබිම් සංවර්ධනය, UI/UX නිර්මාණය සහ වලාකුළු-ආධාරිත යෙදුම් වල වසර 5+ අත්දැකීමක් ඇත. Angular, TypeScript, React සහ නවීන වෙබ් තාක්ෂණයන් වල විශේෂඥයෙක්.',
        keywords: 'සචින් දිල්ශාන්, තාක්ෂණික නායක, පෙරබිම් සංවර්ධක, Angular, TypeScript, React, Node.js, UI/UX නිර්මාණය, ශ්‍රී ලංකාව'
      },
      // Add more languages as needed
    };

    return translations[language] || translations['en'];
  }

  private getHirePageTranslations(language: string): any {
    const translations: { [key: string]: any } = {
      en: {
        title: 'Hire Sachin Dilshan - Angular Consulting & Frontend Development',
        description: 'Professional Angular consulting services including code audits, performance optimization, UX improvements, and team coaching. 5+ years experience in frontend development.',
        keywords: 'Angular consulting, Frontend development, Performance optimization, Code audit, UX design, Team coaching, Angular training, TypeScript'
      },
      si: {
        title: 'සචින් දිල්ශාන් ගෙන් සේවා ලබා ගන්න - Angular සමුලාචාර සහ පෙරබිම් සංවර්ධනය',
        description: 'කේත සමාලෝචන, කාර්ය සාධන ප්‍රශස්තකරණය, UX වැඩිදියුණු කිරීම් සහ කණ්ඩායම් පුහුණුව ඇතුළු වෘත්තීය Angular සමුලාචාර සේවා. පෙරබිම් සංවර්ධනයේ වසර 5+ අත්දැකීම.',
        keywords: 'Angular සමුලාචාර, පෙරබිම් සංවර්ධනය, කාර්ය සාධන ප්‍රශස්තකරණය, කේත සමාලෝචන, UX නිර්මාණය, කණ්ඩායම් පුහුණුව'
      }
    };

    return translations[language] || translations['en'];
  }
}
