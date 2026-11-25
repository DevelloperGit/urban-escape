import Lenis from 'lenis'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type MotionContextValue = {
  lenis: Lenis | null
  scrollTo: (target: number | string | HTMLElement, options?: { duration?: number }) => void
}

const MotionContext = createContext<MotionContextValue | null>(null)

export function useMotion() {
  const ctx = useContext(MotionContext)
  if (!ctx) {
    throw new Error('useMotion must be used within MotionProvider')
  }
  return ctx
}

type MotionProviderProps = {
  children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const prefersCoarse = window.matchMedia('(pointer: coarse)').matches
    const isNarrowViewport = window.matchMedia('(max-width: 900px)').matches

    /** На touch-экранах оставляем нативный скролл — меньше рывков с тяжёлыми PNG. */
    if (prefersReduced || (prefersCoarse && isNarrowViewport)) {
      return
    }

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 0.88,
      smoothWheel: true,
      respectReducedMotion: true,
    })

    setLenis(instance)

    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const scrollTo = useCallback(
    (target: number | string | HTMLElement, options?: { duration?: number }) => {
      if (!lenis) {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' })
        } else if (typeof target === 'string') {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
        } else {
          target.scrollIntoView({ behavior: 'smooth' })
        }
        return
      }

      lenis.scrollTo(target, {
        duration: options?.duration ?? 1.35,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      })
    },
    [lenis],
  )

  const value = useMemo<MotionContextValue>(
    () => ({
      lenis,
      scrollTo,
    }),
    [lenis, scrollTo],
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}