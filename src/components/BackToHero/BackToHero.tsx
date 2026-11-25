import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotion } from '../../motion/MotionProvider'

/** Стрелка вверх — по макету (ствол + наконечник, скруглённые концы). */
function ScrollUpArrowIcon() {
  return (
    <svg
      className="text-black"
      style={{
        width: 'var(--size-back-to-hero-icon-w)',
        height: 'var(--size-back-to-hero-icon-h)',
      }}
      viewBox="0 0 20 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 24V5.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M4.25 11.25 10 5.5 15.75 11.25"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const SCROLL_SHOW_THRESHOLD = 0.42

export function BackToHero() {
  const { scrollTo, lenis } = useMotion()
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)
  const rafRef = useRef(0)
  const scrollRef = useRef(0)

  useEffect(() => {
    const threshold = () => window.innerHeight * SCROLL_SHOW_THRESHOLD

    const commitVisibility = () => {
      rafRef.current = 0
      const next = scrollRef.current > threshold()
      if (next === visibleRef.current) return
      visibleRef.current = next
      setVisible(next)
    }

    const scheduleUpdate = (scrollY: number) => {
      scrollRef.current = scrollY
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(commitVisibility)
    }

    if (lenis) {
      const onScroll = (instance: { scroll: number }) => {
        scheduleUpdate(instance.scroll)
      }
      lenis.on('scroll', onScroll)
      scheduleUpdate(lenis.scroll)
      return () => {
        lenis.off('scroll', onScroll)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }

    const onNativeScroll = () => scheduleUpdate(window.scrollY)
    window.addEventListener('scroll', onNativeScroll, { passive: true })
    scheduleUpdate(window.scrollY)
    return () => {
      window.removeEventListener('scroll', onNativeScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [lenis])

  const handleClick = useCallback(() => {
    const hero = document.getElementById('hero')
    if (hero) {
      scrollTo(hero)
      return
    }
    scrollTo(0)
  }, [scrollTo])

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Вернуться к началу страницы"
      className={`ue-back-to-hero ue-hover-btn fixed z-[var(--z-index-back-to-hero)] flex cursor-pointer items-center justify-center rounded-full border-0 bg-white p-0 shadow-[var(--shadow-back-to-hero)] transition-[opacity,transform,visibility] duration-[var(--ue-motion-duration-hover)] ease-[var(--ue-motion-ease-out)] hover:bg-white ${
        visible
          ? 'pointer-events-auto visible opacity-100'
          : 'pointer-events-none invisible opacity-0'
      }`}
      style={{
        right: 'var(--spacing-back-to-hero-inset-x)',
        bottom: 'var(--spacing-back-to-hero-inset-y)',
        width: 'var(--size-back-to-hero)',
        height: 'var(--size-back-to-hero)',
      }}
    >
      <ScrollUpArrowIcon />
    </button>
  )
}