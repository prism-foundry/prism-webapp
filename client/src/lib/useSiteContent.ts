import { useEffect, useState } from 'react'
import { fetchContent, type ContentMap } from './api.js'
import { useI18n, type Language } from '../i18n'

interface State {
  content: ContentMap
  loaded: boolean
  error: boolean
}

/**
 * Loads editable site content from the API and merges it over the i18n
 * defaults. Returns a `c(key, fallback)` accessor that resolves the current
 * language's override, falling back to the default i18n string.
 */
export function useSiteContent() {
  const { lang } = useI18n()
  const [state, setState] = useState<State>({ content: {}, loaded: false, error: false })

  useEffect(() => {
    let cancelled = false
    fetchContent()
      .then(({ content }) => {
        if (!cancelled) setState({ content, loaded: true, error: false })
      })
      .catch(() => {
        if (!cancelled) setState({ content: {}, loaded: true, error: true })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return {
    ...state,
    c: (key: string, fallback: string) => {
      const entry = state.content[key]
      const value = entry?.[lang as Language] || entry?.en || fallback
      return value || fallback
    },
  }
}
