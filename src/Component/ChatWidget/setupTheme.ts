// setupTheme.ts - apply widgetTheme tokens as CSS variables on :root
import { widgetTheme } from './theme'

const VAR_PREFIX = '--eden-'

function setVar(name: string, value: string) {
  try {
    if (typeof window === 'undefined' || !document?.documentElement) return
    document.documentElement.style.setProperty(name, value)
  } catch (e) {
    // ignore in non-browser environments
  }
}

function applyObject(obj: any, path: string[] = []) {
  for (const key of Object.keys(obj)) {
    const val = obj[key]
    const newPath = path.concat([key])
    if (val && typeof val === 'object') {
      applyObject(val, newPath)
    } else {
      const varName = VAR_PREFIX + newPath.join('-')
      setVar(varName, String(val))
    }
  }
}

export function applyTheme(theme = widgetTheme) {
  applyObject(theme)
}

// Apply by default when module loads so importing the widget activates the theme
applyTheme(widgetTheme)

export default applyTheme