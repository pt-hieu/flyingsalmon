const fallbackLocale = 'en-US'

export function resolveLocale(locale: string | undefined): string {
  if (locale) {
    return locale
  }

  if (typeof document !== 'undefined' && document.documentElement.lang) {
    return document.documentElement.lang
  }

  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language
  }

  return fallbackLocale
}
