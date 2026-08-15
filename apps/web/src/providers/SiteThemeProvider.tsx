'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

/* ─────────────────────────────────────────────────────────────────
   SiteThemeContext — global light / dark toggle
   • Sets data-theme attribute on <html> (switches all CSS variables)
   • Persists preference to localStorage ('tryvion-theme')
   • Defaults to 'light' if no stored value
───────────────────────────────────────────────────────────────── */

export type SiteTheme = 'light' | 'dark'

interface SiteThemeContextValue {
  theme: SiteTheme
  setTheme: (t: SiteTheme) => void
}

const SiteThemeContext = createContext<SiteThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
})

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>(() => {
  if (typeof window === 'undefined') return 'light'

  try {
    const stored = localStorage.getItem('tryvion-theme')

    if (stored === 'dark' || stored === 'light') {
      return stored
    }
  } catch {
    // Ignore unavailable localStorage
  }

  return 'light'
})

useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme)
}, [theme])

  const setTheme = (t: SiteTheme) => {
    setThemeState(t)
    localStorage.setItem('tryvion-theme', t)
    document.documentElement.setAttribute('data-theme', t)
  }

  return (
    <SiteThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </SiteThemeContext.Provider>
  )
}

export function useSiteTheme() {
  return useContext(SiteThemeContext)
}
