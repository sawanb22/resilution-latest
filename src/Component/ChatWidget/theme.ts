// Theme configuration for Eden Chat Widget
// All colors, spacing, and design tokens in one place for easy customization

export const widgetTheme = {
  // Brand colors
  colors: {
    // Dark + neon-lime theme tuned to screenshot
    primary: '#c7ff7a',        // Neon-lime accent (New Chat / Send)
    primaryHover: '#b0f569',   // Hover state
    primaryLight: '#e6ffd8',   // Light variant for subtle backgrounds

    background: {
      main: '#0b1114',         // Dark panel background
      secondary: '#0f1619',    // Slightly lighter surfaces (conversation area)
      overlay: 'rgba(2,6,8,0.68)', // Dark backdrop overlay
    },

    text: {
      primary: '#e6eef3',      // Main (off-white) text
      secondary: '#9aa6ad',    // Secondary text (hint)
      tertiary: '#7f8a8f',     // Tertiary / placeholder
      inverse: '#041212',      // Text on bright buttons
    },

    message: {
      user: {
        background: '#172025', // user bubble (dark slate)
        text: '#e6eef3',
      },
      bot: {
        background: '#0f1720', // bot bubble (very dark)
        text: '#e6eef3',
      },
    },

    border: {
      default: 'rgba(255,255,255,0.04)',
      accent: 'rgba(199,255,122,0.12)',
      error: '#ef4444',
    },

    status: {
      online: '#8ef86e',       // Neon green dot
      offline: '#ef4444',      // Red dot
      typing: '#7f8a8f',       // Gray for typing indicator
    },

    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
  
  // Spacing scale
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    xxl: '2rem',     // 32px
  },
  
  // Typography
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Border radius
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',  // Fully rounded
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  
  // Layout dimensions
  layout: {
    launcher: {
      size: '56px',
      bottom: '24px',
      right: '24px',
    },
    window: {
      width: '400px',
      height: '600px',
      maxHeight: '90vh',
      borderRadius: '16px',
    },
    fullscreen: {
      maxWidth: '800px',
      height: '90vh',
    },
  },
  
  // Animation durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  // Z-index layers
  zIndex: {
    launcher: 1000,
    window: 1001,
    backdrop: 999,
    overlay: 1002,
  },
} as const;

export type WidgetTheme = typeof widgetTheme;
