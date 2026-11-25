import { useEffect, useRef, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Пошаговая задержка (1–4) для каскадного появления */
  delay?: 0 | 1 | 2 | 3 | 4
}

const REVEAL_MS = 900
const REVEAL_DELAY_STEP_MS = 80

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let activeTimer: ReturnType<typeof setTimeout> | undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        el.classList.add('is-visible', 'ue-reveal--active')
        const delayMs = delay > 0 ? delay * REVEAL_DELAY_STEP_MS : 0
        activeTimer = window.setTimeout(() => {
          el.classList.remove('ue-reveal--active')
        }, delayMs + REVEAL_MS + 40)

        observer.disconnect()
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (activeTimer) window.clearTimeout(activeTimer)
    }
  }, [delay])

  const delayClass = delay > 0 ? `ue-reveal--delay-${delay}` : ''

  return (
    <div
      ref={ref}
      className={`ue-reveal w-full min-w-0 ${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  )
}