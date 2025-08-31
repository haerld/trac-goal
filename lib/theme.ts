import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';
 
export const THEME = {
  light: {
    background: 'hsl(0 0% 100%)',          // white
    foreground: 'hsl(140 25% 12%)',        // dark green text
    card: 'hsl(0 0% 100%)',                // white cards
    cardForeground: 'hsl(140 25% 12%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(140 25% 12%)',

    primary: 'hsl(145 45% 35%)',           // rich medium green
    primaryForeground: 'hsl(0 0% 100%)',

    secondary: 'hsl(145 30% 92%)',         // pale minty green
    secondaryForeground: 'hsl(145 40% 20%)',

    muted: 'hsl(145 20% 95%)',
    mutedForeground: 'hsl(145 15% 40%)',

    accent: 'hsl(48 100% 50%)',            // casino gold
    accentForeground: 'hsl(140 30% 15%)',

    destructive: 'hsl(0 70% 50%)',         // red
    destructiveForeground: 'hsl(0 0% 98%)',

    border: 'hsl(145 20% 85%)',
    input: 'hsl(145 20% 85%)',
    ring: 'hsl(145 50% 40%)',

    radius: '0.625rem',

    // Chart colors
    chart1: 'hsl(145 45% 35%)',   // green
    chart2: 'hsl(48 100% 50%)',   // gold
    chart3: 'hsl(0 70% 50%)',     // red
    chart4: 'hsl(200 70% 45%)',   // blue
    chart5: 'hsl(280 65% 60%)',   // purple
  },

  dark: {
    background: 'hsl(0 0% 5%)',           // almost pure black
    foreground: 'hsl(0 0% 98%)',          // off-white
    card: 'hsl(0 0% 7%)',                 // black card
    cardForeground: 'hsl(0 0% 98%)',
    popover: 'hsl(0 0% 7%)',
    popoverForeground: 'hsl(0 0% 98%)',

    primary: 'hsl(145 80% 50%)',          // bright neon green (glow)
    primaryForeground: 'hsl(0 0% 0%)',    // black text on neon

    secondary: 'hsl(145 30% 15%)',        // deep green
    secondaryForeground: 'hsl(0 0% 98%)',

    muted: 'hsl(145 15% 12%)',
    mutedForeground: 'hsl(145 10% 65%)',

    accent: 'hsl(48 100% 55%)',           // glowing gold
    accentForeground: 'hsl(0 0% 0%)',

    destructive: 'hsl(0 70% 55%)',        // strong red
    destructiveForeground: 'hsl(0 0% 98%)',

    border: 'hsl(145 20% 15%)',
    input: 'hsl(145 20% 15%)',
    ring: 'hsl(145 80% 50%)',

    radius: '0.625rem',

    // Chart colors
    chart1: 'hsl(145 80% 50%)',   // neon green
    chart2: 'hsl(48 100% 55%)',   // gold
    chart3: 'hsl(0 70% 55%)',     // red
    chart4: 'hsl(200 80% 50%)',   // bright cyan/blue
    chart5: 'hsl(280 70% 65%)',   // glowing purple
  },
}


 
export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};