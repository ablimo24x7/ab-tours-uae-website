'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface SiteShellContextValue {
  drawerOpen: boolean
  drawerItem: string
  setDrawerItem: (item: string) => void
  drawerSent: boolean
  openQuote: (item: string) => void
  closeDrawer: () => void
  markDrawerSent: () => void
  toastMessage: string
  toastVisible: boolean
  toast: (msg: string) => void
  savedTrips: string[]
  toggleSaveTrip: (name: string) => void
}

const SiteShellContext = createContext<SiteShellContextValue | null>(null)

export function useSiteShell(): SiteShellContextValue {
  const ctx = useContext(SiteShellContext)
  if (!ctx) {
    throw new Error('useSiteShell must be used inside SiteShellProvider')
  }
  return ctx
}

export function SiteShellProvider({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerItem, setDrawerItem] = useState('')
  const [drawerSent, setDrawerSent] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [savedTrips, setSavedTrips] = useState<string[]>([])

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem('abTrip')
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            setSavedTrips(parsed.filter((x): x is string => typeof x === 'string'))
          }
        }
      } catch {
        // Ignore storage errors in private browsing
      }
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const toast = useCallback((msg: string) => {
    setToastMessage(msg)
    setToastVisible(true)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false)
    }, 3400)
  }, [])

  const openQuote = useCallback((item: string) => {
    if (document.activeElement instanceof HTMLElement) {
      lastFocusRef.current = document.activeElement
    }
    setDrawerItem(item)
    setDrawerSent(false)
    setDrawerOpen(true)
    document.body.classList.add('lock')
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    document.body.classList.remove('lock')
    const prev = lastFocusRef.current
    if (prev && typeof prev.focus === 'function') {
      requestAnimationFrame(() => prev.focus())
    }
  }, [])

  const markDrawerSent = useCallback(() => {
    setDrawerSent(true)
  }, [])

  const toggleSaveTrip = useCallback(
    (name: string) => {
      setSavedTrips((prev) => {
        const exists = prev.includes(name)
        const next = exists ? prev.filter((item) => item !== name) : [...prev, name]
        try {
          localStorage.setItem('abTrip', JSON.stringify(next))
        } catch {
          // Ignore storage errors
        }
        if (!exists) {
          toast(`Saved to your trip: ${name}`)
        }
        return next
      })
    },
    [toast],
  )

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return

      const quoteTrigger = target.closest('[data-quote]')
      if (quoteTrigger instanceof HTMLElement && quoteTrigger.dataset.quote) {
        e.preventDefault()
        openQuote(quoteTrigger.dataset.quote)
        return
      }

      const toastTrigger = target.closest('[data-toast]')
      if (toastTrigger instanceof HTMLElement && toastTrigger.dataset.toast) {
        e.preventDefault()
        toast(toastTrigger.dataset.toast)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [openQuote, toast])

  return (
    <SiteShellContext.Provider
      value={{
        drawerOpen,
        drawerItem,
        setDrawerItem,
        drawerSent,
        openQuote,
        closeDrawer,
        markDrawerSent,
        toastMessage,
        toastVisible,
        toast,
        savedTrips,
        toggleSaveTrip,
      }}
    >
      {children}
    </SiteShellContext.Provider>
  )
}
