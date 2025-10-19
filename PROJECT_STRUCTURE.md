# Portfolio Project Structure

## 📁 Project Layout

```
protfolio-template-v1/
├── 📁 src/                          # Source code
│   ├── 📁 app/                      # Angular application
│   │   ├── 📁 components/           # Reusable components
│   │   │   ├── 📁 shared/           # Shared components
│   │   │   │   ├── 📁 header/       # Header component
│   │   │   │   └── 📁 footer/       # Footer component
│   │   │   ├── 📁 social-buttons/   # Social media buttons
│   │   │   └── 📁 project-card/      # Project card component
│   │   ├── 📁 core/                 # Core services
│   │   │   ├── theme.service.ts     # Theme management
│   │   │   ├── performance.service.ts # Performance optimization
│   │   │   ├── analytics.service.ts # Analytics tracking
│   │   │   └── seo.service.ts       # SEO management
│   │   ├── 📁 pages/                # Page components
│   │   │   ├── 📁 home/             # Home page
│   │   │   └── 📁 hire/             # Hire page
│   │   ├── app.config.ts            # App configuration
│   │   ├── app.routes.ts            # Routing configuration
│   │   ├── app.ts                   # Main app component
│   │   ├── app.html                 # App template
│   │   └── app.css                  # Global styles
│   ├── 📁 assets/                   # Static assets
│   │   ├── 📁 icons/                # Icon assets
│   │   ├── My_Photo.jpg             # Profile photo
│   │   └── name_voice.mp3           # Audio file
│   ├── index.html                   # Main HTML file
│   ├── main.ts                      # Bootstrap file
│   └── main.server.ts               # Server bootstrap
├── 📁 public/                       # Public assets
│   ├── favicon.ico                  # Favicon
│   └── profile1.ico                 # Profile icon
├── 📁 dist/                         # Build output
├── 📁 node_modules/                 # Dependencies
├── angular.json                     # Angular configuration
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

## 🎯 Key Features

### 🎯 Single Language
- **English Only**: Clean, focused content
- **No Translation Overhead**: Faster loading and simpler maintenance
- **SEO Optimized**: Single language for better search rankings
- **Direct Content**: All text written directly in components

### 🎨 Theme System
- **Light/Dark Mode**: Toggle between themes
- **System Theme Detection**: Automatic theme based on OS preference
- **Smooth Transitions**: Animated theme changes
- **Persistent Settings**: Theme preference saved

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive tablet layouts
- **Desktop Enhancement**: Full desktop experience
- **Touch-Friendly**: Mobile-optimized interactions

### ⚡ Performance Optimization
- **Lazy Loading**: Route-based code splitting
- **Image Optimization**: Optimized asset loading
- **Bundle Analysis**: Performance monitoring
- **SSR Support**: Server-side rendering

### 🎭 Animations & Effects
- **Scroll Animations**: Intersection Observer API
- **Header Effects**: Dynamic scroll-based styling
- **Smooth Transitions**: CSS transitions and animations
- **Performance Monitoring**: Reduced motion support

## 🚀 Development Commands

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

## 📦 Dependencies

### Core Dependencies
- **Angular 20**: Latest Angular framework
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming
- **Angular Router**: Client-side routing

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Angular Forms**: Form handling
- **CSS Grid/Flexbox**: Modern layout

### State Management
- **Angular Signals**: Reactive state management
- **RxJS**: Reactive programming patterns
- **Component State**: Local component state management

### Performance
- **Angular SSR**: Server-side rendering
- **Lazy Loading**: Route-based splitting
- **Bundle Analysis**: Performance monitoring

## 🔧 Configuration Files

- **angular.json**: Angular CLI configuration
- **tsconfig.json**: TypeScript configuration
- **package.json**: Dependencies and scripts
- **app.config.ts**: Application configuration
- **app.routes.ts**: Routing configuration

## 📊 Build Output

- **Browser Bundle**: Client-side application
- **Server Bundle**: SSR application
- **Assets**: Static files and media
- **Chunks**: Optimized code splitting
- **Analysis**: Bundle size reports
