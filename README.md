# 🚀 Portfolio Template v1

A modern, responsive portfolio website built with Angular 20, featuring dynamic theming, performance optimizations, and clean architecture.

## ✨ Features

### 🎯 **Single Language**
- **English** - Clean, focused content
- **No Translation Overhead** - Faster loading and simpler maintenance
- **SEO Optimized** - Single language for better search rankings

### 🎨 **Dynamic Theming**
- **Light/Dark Mode**: Toggle between themes
- **System Theme Detection**: Automatic theme based on OS preference
- **Smooth Transitions**: Animated theme changes
- **Header Scroll Effects**: Dynamic color changes on scroll

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive tablet layouts
- **Desktop Enhancement**: Full desktop experience
- **Touch-Friendly**: Mobile-optimized interactions

### ⚡ **Performance Optimized**
- **Lazy Loading**: Route-based code splitting
- **SSR Support**: Server-side rendering
- **Bundle Analysis**: Performance monitoring
- **Image Optimization**: Optimized asset loading

### 🎭 **Modern Animations**
- **Scroll Animations**: Intersection Observer API
- **Header Effects**: Dynamic scroll-based styling
- **Smooth Transitions**: CSS transitions and animations
- **Performance Monitoring**: Reduced motion support

## 🛠️ Tech Stack

- **Angular 20** - Latest Angular framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **RxJS** - Reactive programming
- **Angular SSR** - Server-side rendering
- **Angular Signals** - Reactive state management

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (^20.19.0 || ^22.12.0 || >=23)
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd protfolio-template-v1

# Install dependencies
npm install

# Start development server
npm start
```

### Development Commands

```bash
# Development server
npm start

# Production build
npm run build

# Build with analysis
npm run build:analyze

# Watch mode
npm run watch

# Run tests
npm test

# Lighthouse audit
npm run lighthouse
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── shared/         # Header, Footer
│   │   ├── social-buttons/ # Social media buttons
│   │   └── project-card/   # Project card component
│   ├── core/               # Core services
│   │   ├── theme.service.ts
│   │   ├── language.service.ts
│   │   └── performance.service.ts
│   ├── pages/              # Page components
│   │   ├── home/           # Home page
│   │   └── hire/           # Hire page
│   └── app.config.ts       # App configuration
├── assets/
│   ├── icons/              # Icon assets
│   └── My_Photo.jpg        # Profile photo
└── index.html              # Main HTML file
```

## 🎯 Content Management

### Static Content
- **Direct Text**: All content is written directly in templates
- **No Translation Files**: Simplified content management
- **Easy Updates**: Change text directly in components
- **Better Performance**: No translation overhead

### Content Structure
```typescript
// Example: Service plans in home component
readonly plans = [
  {
    id: 'audit',
    title: 'Angular Audit',
    subtitle: 'Code review & architecture recommendations',
    price: 'US$499 fixed',
    // ... more properties
  }
];
```

## 🎨 Theming

### Light Mode
- Clean white backgrounds
- Subtle shadows
- High contrast text
- Blue accent colors

### Dark Mode  
- Dark slate backgrounds
- Enhanced shadows
- Light text colors
- Blue accent highlights

### Header Scroll Effects
- **Not Scrolled**: Subtle background with minimal shadows
- **Scrolled**: Blue-tinted gradients with enhanced shadows
- **Logo**: Changes to blue color
- **Navigation**: Bolder, more contrasted text
- **Buttons**: Blue gradient with lift effects

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Mobile Optimizations
- Touch-friendly buttons
- Optimized spacing
- Reduced motion support
- Enhanced backdrop blur

## ⚡ Performance Features

### Bundle Optimization
- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Unused code elimination
- **Bundle Analysis**: Performance monitoring
- **Asset Optimization**: Compressed images and fonts

### Runtime Performance
- **Intersection Observer**: Efficient scroll animations
- **Change Detection**: OnPush strategy
- **Memory Management**: Proper cleanup
- **Lazy Loading**: Deferred component loading

## 🔧 Configuration

### Angular Configuration
- **Standalone Components**: Modern Angular architecture
- **SSR Support**: Server-side rendering
- **Route Guards**: Navigation protection
- **Service Workers**: Offline support

### Build Configuration
- **Production Builds**: Optimized for production
- **Bundle Analysis**: Performance insights
- **Lighthouse Audits**: Performance monitoring
- **TypeScript**: Strict type checking

## 📊 Performance Metrics

### Bundle Sizes
- **Initial Bundle**: ~352KB (gzipped: ~95KB)
- **Home Page**: ~48KB (gzipped: ~12KB)
- **Hire Page**: ~10KB (gzipped: ~3KB)

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🚀 Deployment

### Netlify (Recommended)
```bash
# Build for production
npm run build

# Deploy to Netlify
# Connect your repository to Netlify
# Build command: npm run build
# Publish directory: dist/protfolio-template-v1/browser
```

### Other Platforms
- **Vercel**: Angular SSR support
- **Firebase**: Static hosting
- **GitHub Pages**: Static deployment
- **AWS S3**: Cloud hosting

## 📚 Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Mobile Responsiveness](docs/MOBILE_RESPONSIVENESS_GUIDE.md)
- [Performance Optimization](docs/OPTIMIZATION_GUIDE.md)
- [Tailwind Integration](docs/TAILWIND_INTEGRATION_GUIDE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Sachin Dilshan**
- **Email**: sachindilshan040@gmail.com
- **LinkedIn**: [Sachin Dilshan](https://linkedin.com/in/sachindilshan)
- **GitHub**: [@toozuuu](https://github.com/toozuuu)

---

Built with ❤️ using Angular 20 and modern web technologies.