# 🎨 Tailwind CSS Integration Guide

## Overview

This portfolio uses **Tailwind CSS** as the primary styling framework, integrated with Angular 20 for a modern, utility-first approach to styling. The integration is optimized for performance, maintainability, and developer experience.

## 🚀 Integration Architecture

### 1. **CDN Integration Strategy**

#### Dynamic Loading
```html
<!-- index.html -->
<script>
  const loadTailwind = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.onload = () => {
      if (window.tailwind) {
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: { DEFAULT: '#3b82f6', dark: '#60a5fa' },
                accent: { DEFAULT: '#10b981', dark: '#34d399' },
                bg: { DEFAULT: '#ffffff', dark: '#0f172a', soft: '#f8fafc', 'soft-dark': '#1e293b' },
                text: { DEFAULT: '#1f2937', dark: '#f1f5f9', muted: '#64748b', 'muted-dark': '#94a3b8' },
                border: { DEFAULT: '#e2e8f0', dark: '#334155' },
                card: { DEFAULT: '#ffffff', dark: '#1e293b' }
              },
              animation: {
                'fade-up': 'fade-up 600ms ease-out forwards',
                'fade-in': 'fade-in 500ms ease-out forwards',
                'typewriter': 'typewriter 5s steps(28) 0.8s 1 both',
                'blinking-cursor': 'blinkingCursor 0.5s step-end 10 0.8s both'
              },
              keyframes: {
                'fade-up': { '0%': { opacity: '0', transform: 'translateY(18px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                'typewriter': { '0%': { width: '0' }, '100%': { width: 'calc(28 * 1ch)' } },
                'blinkingCursor': { '0%': { 'border-right-color': 'rgba(15, 23, 42, 0.75)' }, '50%': { 'border-right-color': 'transparent' }, '100%': { 'border-right-color': 'transparent' } }
              }
            }
          },
          darkMode: 'class'
        };
      }
    };
    document.head.appendChild(script);
  };
  
  // Load after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTailwind);
  } else {
    loadTailwind();
  }
</script>
```

#### Critical CSS Inlining
```html
<!-- Critical CSS for immediate rendering -->
<script>
  const criticalCSS = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .min-h-screen { min-height: 100vh; }
    .bg-white { background-color: #ffffff; }
    .dark\\:bg-slate-900 { background-color: #0f172a; }
    .text-slate-900 { color: #0f172a; }
    .dark\\:text-slate-100 { color: #f1f5f9; }
  `;
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
</script>
```

## 🎨 Custom Theme Configuration

### 1. **Color Palette**

#### Primary Colors
```javascript
// Tailwind config colors
colors: {
  primary: {
    DEFAULT: '#3b82f6',  // Blue-500
    dark: '#60a5fa',    // Blue-400
    light: '#93c5fd',   // Blue-300
    darker: '#1d4ed8',  // Blue-700
    darkest: '#1e3a8a'  // Blue-800
  },
  accent: {
    DEFAULT: '#10b981',  // Emerald-500
    dark: '#34d399',     // Emerald-400
    light: '#6ee7b7',    // Emerald-300
    darker: '#059669',   // Emerald-600
    darkest: '#047857'   // Emerald-700
  }
}
```

#### Background Colors
```javascript
bg: {
  DEFAULT: '#ffffff',      // White
  dark: '#0f172a',         // Slate-900
  soft: '#f8fafc',         // Slate-50
  'soft-dark': '#1e293b',  // Slate-800
  card: '#ffffff',         // White
  'card-dark': '#1e293b'   // Slate-800
}
```

#### Text Colors
```javascript
text: {
  DEFAULT: '#1f2937',      // Slate-800
  dark: '#f1f5f9',         // Slate-100
  muted: '#64748b',        // Slate-500
  'muted-dark': '#94a3b8', // Slate-400
  primary: '#3b82f6',       // Blue-500
  accent: '#10b981'        // Emerald-500
}
```

### 2. **Typography System**

#### Font Configuration
```css
/* Global font settings */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
  font-variation-settings: normal;
}
```

#### Responsive Typography
```html
<!-- Responsive text sizing -->
<h1 class="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
  Sachin Dilshan
</h1>

<p class="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
  Technical Lead & Frontend Developer
</p>
```

### 3. **Spacing System**

#### Custom Spacing Scale
```javascript
// Tailwind spacing configuration
spacing: {
  '18': '4.5rem',   // 72px
  '88': '22rem',    // 352px
  '128': '32rem',   // 512px
  '144': '36rem'    // 576px
}
```

#### Component Spacing
```html
<!-- Consistent spacing patterns -->
<div class="px-4 sm:px-6 lg:px-8 py-12">
  <!-- Container with responsive padding -->
</div>

<section class="space-y-8 md:space-y-12 lg:space-y-16">
  <!-- Vertical spacing between sections -->
</section>
```

## 🎭 Animation System

### 1. **Custom Animations**

#### Keyframe Definitions
```javascript
// Tailwind animation configuration
animation: {
  'fade-up': 'fade-up 600ms ease-out forwards',
  'fade-in': 'fade-in 500ms ease-out forwards',
  'typewriter': 'typewriter 5s steps(28) 0.8s 1 both',
  'blinking-cursor': 'blinkingCursor 0.5s step-end 10 0.8s both',
  'float': 'float 3s ease-in-out infinite',
  'pulse': 'pulse 2s ease-in-out infinite',
  'bounce': 'bounce 0.6s ease-in-out',
  'glow': 'glow 2s ease-in-out infinite'
}
```

#### Keyframe Animations
```javascript
keyframes: {
  'fade-up': {
    '0%': { opacity: '0', transform: 'translateY(18px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  },
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  },
  'typewriter': {
    '0%': { width: '0' },
    '100%': { width: 'calc(28 * 1ch)' }
  },
  'blinkingCursor': {
    '0%': { 'border-right-color': 'rgba(15, 23, 42, 0.75)' },
    '50%': { 'border-right-color': 'transparent' },
    '100%': { 'border-right-color': 'transparent' }
  }
}
```

### 2. **Animation Usage**

#### Component Animations
```html
<!-- Fade up animation -->
<div class="animate-fade-up">
  <!-- Content with fade up animation -->
</div>

<!-- Typewriter effect -->
<div class="animate-typewriter">
  <span class="animate-blinking-cursor">Sachin Dilshan</span>
</div>

<!-- Hover animations -->
<button class="hover:scale-105 hover:shadow-lg transition-all duration-300">
  Click me
</button>
```

## 🌙 Dark Mode Integration

### 1. **Dark Mode Configuration**

#### Class-Based Dark Mode
```javascript
// Tailwind dark mode configuration
darkMode: 'class'
```

#### Theme Toggle Implementation
```typescript
// theme.service.ts
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = false;

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.updateTheme();
  }

  private updateTheme(): void {
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
```

### 2. **Dark Mode Styles**

#### Component Dark Mode
```html
<!-- Dark mode responsive design -->
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
  <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">
    Sachin Dilshan
  </h1>
  <p class="text-slate-600 dark:text-slate-400">
    Technical Lead & Frontend Developer
  </p>
</div>
```

#### Header Dark Mode
```html
<!-- Header with dark mode support -->
<header class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="text-xl font-bold text-slate-900 dark:text-slate-100">
        Sachin Dilshan
      </div>
      <nav class="hidden md:flex items-center space-x-8">
        <a href="#home" class="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </a>
        <a href="#about" class="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
          About
        </a>
      </nav>
    </div>
  </div>
</header>
```

## 📱 Responsive Design

### 1. **Breakpoint System**

#### Standard Breakpoints
```css
/* Tailwind responsive breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

#### Responsive Components
```html
<!-- Responsive grid layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive grid items -->
</div>

<!-- Responsive typography -->
<h1 class="text-3xl md:text-5xl lg:text-7xl font-bold">
  Responsive Heading
</h1>

<!-- Responsive spacing -->
<div class="px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
  <!-- Responsive container -->
</div>
```

### 2. **Mobile-First Approach**

#### Mobile Navigation
```html
<!-- Mobile-first navigation -->
<nav class="md:hidden">
  <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
    <svg class="w-6 h-6">...</svg>
  </button>
</nav>

<nav class="hidden md:flex items-center space-x-8">
  <!-- Desktop navigation -->
</nav>
```

## 🎨 Component Styling

### 1. **Button Components**

#### Primary Button
```html
<button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Primary Button
</button>
```

#### Secondary Button
```html
<button class="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Secondary Button
</button>
```

### 2. **Card Components**

#### Project Card
```html
<div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
  <img src="project.jpg" alt="Project" class="w-full h-48 object-cover">
  <div class="p-6">
    <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
      Project Title
    </h3>
    <p class="text-slate-600 dark:text-slate-400 mb-4">
      Project description...
    </p>
    <div class="flex flex-wrap gap-2">
      <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded">
        Angular
      </span>
      <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded">
        TypeScript
      </span>
    </div>
  </div>
</div>
```

### 3. **Form Components**

#### Input Fields
```html
<input type="text" 
       class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
       placeholder="Enter your name">
```

#### Select Dropdown
```html
<select class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
  <option value="">Select language</option>
  <option value="en">English</option>
  <option value="si">සිංහල</option>
</select>
```

## 🚀 Performance Optimization

### 1. **CSS Optimization**

#### Purge Configuration
```javascript
// Tailwind purge configuration
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './src/app/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: []
};
```

#### Critical CSS Generation
```typescript
// css-optimization.service.ts
@Injectable({ providedIn: 'root' })
export class CSSOptimizationService {
  generateCriticalCSS(): string {
    const criticalClasses = [
      'min-h-screen', 'bg-white', 'dark:bg-slate-900',
      'text-slate-900', 'dark:text-slate-100',
      'flex', 'items-center', 'justify-center',
      'w-full', 'h-full', 'relative'
    ];

    return criticalClasses
      .map(className => this.getCSSForClass(className))
      .join('\n');
  }
}
```

### 2. **Dynamic CSS Loading**

#### Asynchronous Loading
```html
<!-- Load Tailwind CSS asynchronously -->
<script>
  const loadTailwind = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.onload = () => {
      // Configure Tailwind after loading
      if (window.tailwind) {
        tailwind.config = {
          theme: { extend: { /* custom theme */ } },
          darkMode: 'class'
        };
      }
    };
    document.head.appendChild(script);
  };
  
  // Load after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTailwind);
  } else {
    loadTailwind();
  }
</script>
```

## 🎯 Utility Classes

### 1. **Layout Utilities**

#### Flexbox Utilities
```html
<!-- Flexbox layouts -->
<div class="flex items-center justify-between">
  <!-- Flex container -->
</div>

<div class="flex flex-col md:flex-row gap-4">
  <!-- Responsive flex direction -->
</div>
```

#### Grid Utilities
```html
<!-- CSS Grid layouts -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive grid -->
</div>
```

### 2. **Spacing Utilities**

#### Margin and Padding
```html
<!-- Spacing utilities -->
<div class="m-4 p-6">          <!-- Margin and padding -->
<div class="mx-auto px-4">      <!-- Horizontal centering -->
<div class="py-8 space-y-4">   <!-- Vertical spacing -->
```

### 3. **Typography Utilities**

#### Text Styling
```html
<!-- Typography utilities -->
<h1 class="text-3xl font-bold text-slate-900">Heading</h1>
<p class="text-base text-slate-600 leading-relaxed">Paragraph</p>
<span class="text-sm text-slate-500 uppercase tracking-wide">Label</span>
```

## 🔧 Custom Configuration

### 1. **Custom Utilities**

#### Component-Specific Utilities
```css
/* Custom utilities in app.css */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scroll-smooth {
    scroll-behavior: smooth;
  }
  
  .backdrop-blur-glass {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}
```

### 2. **Plugin Integration**

#### Custom Plugins
```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ addUtilities, addComponents, theme }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.scroll-smooth': {
          'scroll-behavior': 'smooth',
        }
      });
      
      addComponents({
        '.btn-primary': {
          'background-color': theme('colors.blue.600'),
          'color': theme('colors.white'),
          'padding': theme('spacing.3') + ' ' + theme('spacing.6'),
          'border-radius': theme('borderRadius.lg'),
          'font-weight': theme('fontWeight.medium'),
          'transition': 'all 0.2s ease',
          '&:hover': {
            'background-color': theme('colors.blue.700'),
          }
        }
      });
    })
  ]
};
```

## 📊 Performance Monitoring

### 1. **CSS Size Monitoring**

#### Bundle Analysis
```typescript
// Monitor CSS usage
export class CSSOptimizationService {
  trackUsedClasses(): void {
    const elements = document.querySelectorAll('*');
    const usedClasses = new Set<string>();
    
    elements.forEach(element => {
      if (element.className) {
        element.className.split(' ').forEach(className => {
          if (className.trim()) {
            usedClasses.add(className.trim());
          }
        });
      }
    });
    
    console.log(`Used classes: ${usedClasses.size}`);
  }
}
```

### 2. **Performance Metrics**

#### CSS Performance
```typescript
// Monitor CSS performance
export class PerformanceService {
  measureCSSPerformance(): void {
    const start = performance.now();
    
    // Measure CSS loading time
    const styleSheets = document.styleSheets;
    let totalCSSSize = 0;
    
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const sheet = styleSheets[i];
        if (sheet.href && sheet.href.includes('tailwind')) {
          // Calculate CSS size
          totalCSSSize += this.estimateCSSSize(sheet);
        }
      } catch (e) {
        console.warn('Cannot access stylesheet:', e);
      }
    }
    
    const end = performance.now();
    console.log(`CSS loading time: ${end - start}ms`);
    console.log(`Total CSS size: ${totalCSSSize} bytes`);
  }
}
```

## 🎨 Design System

### 1. **Color System**

#### Semantic Colors
```css
/* Semantic color classes */
.text-primary { color: #3b82f6; }
.text-accent { color: #10b981; }
.bg-primary { background-color: #3b82f6; }
.bg-accent { background-color: #10b981; }
```

#### Status Colors
```css
/* Status colors */
.text-success { color: #10b981; }
.text-warning { color: #f59e0b; }
.text-error { color: #ef4444; }
.text-info { color: #3b82f6; }
```

### 2. **Component Library**

#### Button Variants
```html
<!-- Button variants -->
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-outline">Outline</button>
<button class="btn-ghost">Ghost</button>
```

#### Card Variants
```html
<!-- Card variants -->
<div class="card">Basic Card</div>
<div class="card-elevated">Elevated Card</div>
<div class="card-outlined">Outlined Card</div>
```

## 🚀 Best Practices

### 1. **Class Organization**

#### Component Structure
```html
<!-- Organized class structure -->
<div class="
  flex flex-col md:flex-row
  items-center justify-between
  p-4 md:p-6 lg:p-8
  bg-white dark:bg-slate-900
  rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">
  <!-- Component content -->
</div>
```

### 2. **Performance Tips**

#### Efficient Class Usage
```html
<!-- Use utility classes efficiently -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <!-- Efficient grid layout -->
</div>

<!-- Avoid redundant classes -->
<div class="flex items-center justify-center p-4">
  <!-- Clean, minimal classes -->
</div>
```

---

This Tailwind CSS integration provides a powerful, flexible, and performant styling system for your Angular portfolio application.
