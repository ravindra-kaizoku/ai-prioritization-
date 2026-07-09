export const colorPalette = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    500: '#64748b',
    700: '#334155',
    900: '#0f172a',
  },
  semantic: {
    success: '#16a34a',
    warning: '#f59e0b',
    danger: '#dc2626',
    info: '#0284c7',
  },
} as const

export const typography = {
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  display: 'text-4xl font-bold tracking-tight text-foreground md:text-5xl',
  heading1: 'text-3xl font-bold tracking-tight text-foreground',
  heading2: 'text-2xl font-semibold tracking-tight text-foreground',
  heading3: 'text-xl font-semibold text-foreground',
  body: 'text-sm leading-6 text-muted-foreground',
  label: 'text-sm font-medium text-foreground',
  caption: 'text-xs leading-5 text-muted-foreground',
} as const
