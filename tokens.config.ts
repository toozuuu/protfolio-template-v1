/**
 * TokiForge-inspired Design Token Configuration
 * Generates CSS custom properties for zero JS overhead (static mode)
 */

export interface ColorToken {
  light: string;
  dark: string;
}

export interface DesignTokens {
  colors: {
    primary: {
      base: ColorToken;
      light: ColorToken;
      dark: ColorToken;
      darker: ColorToken;
    };
    accent: {
      base: ColorToken;
      light: ColorToken;
      dark: ColorToken;
    };
    background: {
      base: ColorToken;
      soft: ColorToken;
      card: ColorToken;
      header: ColorToken;
      headerScrolled: ColorToken;
    };
    text: {
      primary: ColorToken;
      secondary: ColorToken;
      muted: ColorToken;
      inverse: ColorToken;
    };
    border: {
      base: ColorToken;
      light: ColorToken;
      dark: ColorToken;
    };
    scrollbar: {
      track: ColorToken;
      thumb: ColorToken;
      thumbHover: ColorToken;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  typography: {
    fontFamily: {
      primary: string;
      fallback: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
      '7xl': string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    header: ColorToken;
    headerScrolled: ColorToken;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  transitions: {
    fast: string;
    base: string;
    slow: string;
  };
  zIndex: {
    base: number;
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
    header: number;
  };
}

export const tokens: DesignTokens = {
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
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem', // 96px
  },
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem', // 72px
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
    sm: '0.125rem', // 2px
    md: '0.25rem', // 4px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
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

