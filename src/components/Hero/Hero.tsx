import { useCallback, useEffect, useRef } from 'react'
import heroBg from '../../assets/hero-bg.png'
import { useMotion } from '../../motion/MotionProvider'

function ScrollChevrons() {
  return (
    <svg
      className="h-[clamp(2.5rem,2.63vw,3.1585rem)] w-[clamp(2.1rem,2.1875vw,2.625rem)] text-text-primary"
      viewBox="0 0 42 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 14l13 13 13-13"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 27l13 13 13-13"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Hero() {
  const { lenis, scrollTo } = useMotion()
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = parallaxRef.current
    if (!layer) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let scrollY = window.scrollY
    let rafId = 0

    const paintParallax = () => {
      rafId = 0
      const offset = Math.min(scrollY * 0.22, 140)
      layer.style.setProperty('--ue-hero-parallax-y', `${offset}px`)
    }

    const scheduleParallax = (nextScrollY: number) => {
      scrollY = nextScrollY
      if (rafId) return
      rafId = requestAnimationFrame(paintParallax)
    }

    scheduleParallax(window.scrollY)

    const onScroll = (instance: { scroll: number }) => {
      scheduleParallax(instance.scroll)
    }

    if (lenis) {
      lenis.on('scroll', onScroll)
      return () => {
        lenis.off('scroll', onScroll)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }

    const onNativeScroll = () => scheduleParallax(window.scrollY)
    window.addEventListener('scroll', onNativeScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onNativeScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [lenis])

  const handleScrollDown = useCallback(() => {
    const target = document.getElementById('after-hero')
    if (target) {
      scrollTo(target)
      return
    }
    scrollTo(window.innerHeight * 0.92)
  }, [scrollTo])

  return (
    <section
      id="hero"
      className="relative flex min-h-svh w-full flex-col overflow-hidden"
    >
      <div
        ref={parallaxRef}
        className="ue-hero-parallax-layer"
        style={{
          backgroundImage: `var(--ue-gradient-hero-overlay), url(${heroBg})`,
        }}
        aria-hidden
      />
      <div className="relative z-[1] flex min-h-svh w-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-[var(--spacing-gutter)]">
          <div className="inline-flex w-full max-w-[71.875rem] flex-col items-center text-center">
            <h1
              className="font-display text-hero text-text-primary"
              style={{
                lineHeight: 'var(--text-hero--line-height)',
                letterSpacing: 'var(--text-hero--letter-spacing)',
                fontWeight: 'var(--text-hero--font-weight)',
              }}
            >
              Urban Escape
            </h1>
            <span
              className="mt-[var(--spacing-hero-title-to-line)] w-full max-w-[71.875rem] shrink-0"
              style={{
                height: 'var(--ue-hero-divider-height)',
                backgroundImage: 'var(--ue-hero-divider-gradient)',
              }}
              aria-hidden
            />
            <p
              className="mt-[var(--spacing-hero-line-to-sub)] font-display text-hero-sub text-text-primary"
              style={{
                lineHeight: 'var(--text-hero-sub--line-height)',
                letterSpacing: 'var(--text-hero-sub--letter-spacing)',
                fontWeight: 'var(--text-hero-sub--font-weight)',
              }}
            >
              Welcome to the company
            </p>
          </div>
        </div>

        <div className="grid w-full shrink-0 grid-cols-[1fr_auto_1fr] items-end px-[var(--spacing-gutter)]">
          <div aria-hidden />
          <div className="flex flex-col items-center pb-[var(--spacing-hero-footer-arrow)]">
            <button
              type="button"
              onClick={handleScrollDown}
              className="ue-hover-btn flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-text-primary"
              aria-label="Scroll down"
            >
              <ScrollChevrons />
            </button>
          </div>
          <div className="flex justify-end self-end pb-[var(--spacing-hero-footer-lang)]">
            <button
              type="button"
              className="ue-hover-btn min-h-11 min-w-11 cursor-pointer border-0 bg-transparent p-2 font-display text-label text-text-primary"
              style={{
                lineHeight: 'var(--text-label--line-height)',
                letterSpacing: 'var(--text-label--letter-spacing)',
                fontWeight: 'var(--text-hero-sub--font-weight)',
              }}
              lang="ru"
              aria-label="Switch to Russian"
            >
              RU
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}