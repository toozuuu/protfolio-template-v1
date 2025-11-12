/**
 * TokiForge-inspired Token Generator (ESM)
 * Generates CSS custom properties from design tokens
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Design tokens (inline for now - in production, import from tokens.config.ts)
const tokens = {
  colors: {
    primary: {
      base: { light: '#3b82f6', dark: '#60a5fa' },
      light: { light: '#93c5fd', dark: '#93c5fd' },
      dark: { light: '#2563eb', dark: '#3b82f6' },
      darker: { light: '#1d4ed8', dark: '#2563eb' },
    },
    accent: {
      base: { light: '#10b981', dark: '#34d399' },
      light: { light: '#6ee7b7', dark: '#6ee7b7' },
      dark: { light: '#059669', dark: '#10b981' },
    },
    background: {
      base: { light: '#ffffff', dark: '#0f172a' },
      soft: { light: '#f8fafc', dark: '#1e293b' },
      card: { light: '#ffffff', dark: '#1e293b' },
      header: { light: 'rgba(255, 255, 255, 0.95)', dark: 'rgba(15, 23, 42, 0.95)' },
      headerScrolled: {
        light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
        dark: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
      },
    },
    text: {
      primary: { light: '#1f2937', dark: '#f1f5f9' },
      secondary: { light: '#4b5563', dark: '#cbd5e1' },
      muted: { light: '#64748b', dark: '#94a3b8' },
      inverse: { light: '#ffffff', dark: '#0f172a' },
    },
    border: {
      base: { light: '#e2e8f0', dark: '#334155' },
      light: { light: '#f1f5f9', dark: '#475569' },
      dark: { light: '#cbd5e1', dark: '#64748b' },
    },
    scrollbar: {
      track: { light: '#f1f5f9', dark: '#1e293b' },
      thumb: { light: '#cbd5e1', dark: '#475569' },
      thumbHover: { light: '#94a3b8', dark: '#64748b' },
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    header: {
      light: '0 1px 3px rgba(0, 0, 0, 0.1)',
      dark: '0 1px 3px rgba(0, 0, 0, 0.3)',
    },
    headerScrolled: {
      light: '0 8px 32px rgba(59, 130, 246, 0.1), 0 4px 16px rgba(0, 0, 0, 0.1)',
      dark: '0 8px 32px rgba(59, 130, 246, 0.2), 0 4px 16px rgba(0, 0, 0, 0.3)',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  transitions: {
    fast: '150ms ease',
    base: '300ms ease',
    slow: '500ms ease',
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    header: 9999,
  },
};

function generateCSSVariables(tokens) {
  // Use minimal comments to reduce file size
  let css = '/* Design Tokens - Auto-generated */\n\n';
  
  // Generate light mode variables
  css += ':root{';
  css += generateColorVariables(tokens.colors, 'light');
  css += generateSpacingVariables(tokens.spacing);
  css += generateTypographyVariables(tokens.typography);
  css += generateShadowVariables(tokens.shadows, 'light');
  css += generateBorderRadiusVariables(tokens.borderRadius);
  css += generateTransitionVariables(tokens.transitions);
  css += generateZIndexVariables(tokens.zIndex);
  css += '}';
  
  // Generate dark mode variables
  css += '.dark{';
  css += generateColorVariables(tokens.colors, 'dark');
  css += generateShadowVariables(tokens.shadows, 'dark');
  css += '}';
  
  return css;
}

function generateColorVariables(colors, mode) {
  let css = '';
  
  function processColor(obj, path = '') {
    for (const [key, value] of Object.entries(obj)) {
      // Skip if value is null or undefined
      if (value == null) continue;
      
      const currentPath = path ? `${path}-${key}` : key;
      
      // Check if this is a ColorToken (has light and dark properties that are strings) - leaf node
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        // Check if it has light and dark properties that are strings (not objects)
        const hasLight = 'light' in value && typeof value.light === 'string';
        const hasDark = 'dark' in value && typeof value.dark === 'string';
        
        if (hasLight && hasDark) {
          // This is a leaf node with light/dark string values
          const colorValue = mode === 'dark' ? value.dark : value.light;
          css += `--color-${currentPath}:${colorValue};`;
        } else {
          // Recursively process nested objects (container objects)
          processColor(value, currentPath);
        }
      }
    }
  }
  
  processColor(colors);
  return css;
}

function generateSpacingVariables(spacing) {
  let css = '';
  for (const [key, value] of Object.entries(spacing)) {
    css += `--spacing-${key}:${value};`;
  }
  return css;
}

function generateTypographyVariables(typography) {
  let css = '';
  css += `--font-family-primary:${typography.fontFamily.primary};`;
  css += `--font-family-fallback:${typography.fontFamily.fallback};`;
  
  for (const [key, value] of Object.entries(typography.fontSize)) {
    css += `--font-size-${key}:${value};`;
  }
  
  for (const [key, value] of Object.entries(typography.fontWeight)) {
    css += `--font-weight-${key}:${value};`;
  }
  
  for (const [key, value] of Object.entries(typography.lineHeight)) {
    css += `--line-height-${key}:${value};`;
  }
  
  return css;
}

function generateShadowVariables(shadows, mode) {
  let css = '';
  for (const [key, value] of Object.entries(shadows)) {
    if (typeof value === 'object' && value && 'light' in value && 'dark' in value) {
      const shadowValue = mode === 'dark' ? value.dark : value.light;
      if (typeof shadowValue === 'string') {
        css += `--shadow-${key}:${shadowValue};`;
      }
    } else if (typeof value === 'string') {
      css += `--shadow-${key}:${value};`;
    }
  }
  return css;
}

function generateBorderRadiusVariables(borderRadius) {
  let css = '';
  for (const [key, value] of Object.entries(borderRadius)) {
    css += `--radius-${key}:${value};`;
  }
  return css;
}

function generateTransitionVariables(transitions) {
  let css = '';
  for (const [key, value] of Object.entries(transitions)) {
    css += `--transition-${key}:${value};`;
  }
  return css;
}

function generateZIndexVariables(zIndex) {
  let css = '';
  for (const [key, value] of Object.entries(zIndex)) {
    css += `--z-${key}:${value};`;
  }
  return css;
}

// Main execution
function main() {
  const css = generateCSSVariables(tokens);
  const outputPath = join(__dirname, '../src/styles/tokens.css');
  const outputDir = dirname(outputPath);
  
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  writeFileSync(outputPath, css, 'utf8');
  console.log(`✅ Generated design tokens CSS: ${outputPath}`);
}

main();

