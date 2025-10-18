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
│   │   │   ├── language.service.ts  # i18n management
│   │   │   └── performance.service.ts # Performance optimization
│   │   ├── 📁 pages/                # Page components
│   │   │   ├── 📁 home/             # Home page
│   │   │   └── 📁 hire/             # Hire page
│   │   ├── app.config.ts            # App configuration
│   │   ├── app.routes.ts            # Routing configuration
│   │   ├── app.ts                   # Main app component
│   │   ├── app.html                 # App template
│   │   └── app.css                  # Global styles
│   ├── 📁 assets/                   # Static assets
│   │   ├── 📁 i18n/                 # Translation files
│   │   │   ├── en.json              # English
│   │   │   ├── si.json              # Sinhala
│   │   │   ├── sv.json              # Swedish
│   │   │   ├── es.json              # Spanish
│   │   │   ├── fr.json              # French
│   │   │   ├── de.json              # German
│   │   │   ├── pt.json              # Portuguese
│   │   │   ├── zh.json              # Chinese
│   │   │   ├── ja.json              # Japanese
│   │   │   ├── ko.json              # Korean
│   │   │   └── hi.json              # Hindi
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

### 🌍 Internationalization (i18n)
- **11 Languages Supported**: English, Sinhala, Swedish, Spanish, French, German, Portuguese, Chinese, Japanese, Korean, Hindi
- **Dynamic Language Switching**: Real-time language changes
- **Browser Language Detection**: Automatic language detection
- **Local Storage**: Language preference persistence

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

### Internationalization
- **@ngx-translate**: Translation management
- **@ngx-translate/http-loader**: HTTP translation loading

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
- **Assets**: Static files and translations
- **Chunks**: Optimized code splitting
- **Analysis**: Bundle size reports
