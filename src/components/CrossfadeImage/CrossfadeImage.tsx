import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from 'react'

export type CrossfadeSlideDirection = 1 | -1

type CrossfadeImageProps = {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  /** Мягкий переход ~500ms (карусели) */
  soft?: boolean
  /** Режим Photo Gallery — fade + лёгкий slide */
  gallery?: boolean
  /** Направление слайда: 1 — вперёд, -1 — назад */
  slideDirection?: CrossfadeSlideDirection
} & Pick<ImgHTMLAttributes<HTMLImageElement>, 'sizes' | 'decoding' | 'draggable'>

type CrossfadeState = {
  current: string
  previous: string | null
  animate: boolean
}

function slideShift(direction: CrossfadeSlideDirection, sign: 1 | -1): string {
  const amount = `var(--ue-motion-carousel-shift, 3%)`
  if (direction === 1) {
    return sign === 1 ? amount : `calc(-1 * ${amount})`
  }
  return sign === 1 ? `calc(-1 * ${amount})` : amount
}

export function CrossfadeImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  sizes,
  decoding = 'async',
  draggable,
  soft = false,
  gallery = false,
  slideDirection = 1,
}: CrossfadeImageProps) {
  const [state, setState] = useState<CrossfadeState>({
    current: src,
    previous: null,
    animate: false,
  })
  const displayedSrc = useRef(src)
  const directionAtTransition = useRef<CrossfadeSlideDirection>(slideDirection)
  const reduceMotion = useRef(false)
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }, [])

  useEffect(() => {
    if (src === displayedSrc.current) return

    const prev = displayedSrc.current
    displayedSrc.current = src
    directionAtTransition.current = slideDirection

    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current)
      clearTimerRef.current = null
    }

    if (reduceMotion.current) {
      setState({ current: src, previous: null, animate: false })
      return
    }

    setState({ current: src, previous: prev, animate: false })
  }, [src, slideDirection])

  useLayoutEffect(() => {
    if (!state.previous || state.animate) return
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setState((s) => ({ ...s, animate: true }))
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [state.previous, state.current, state.animate])

  useEffect(() => {
    return () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    }
  }, [])

  const clearPrevious = () => {
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current)
      clearTimerRef.current = null
    }
    setState((s) => ({ ...s, previous: null, animate: false }))
  }

  const scheduleClearPrevious = () => {
    if (clearTimerRef.current) return
    clearTimerRef.current = setTimeout(() => {
      clearTimerRef.current = null
      clearPrevious()
    }, 520)
  }

  const dir = directionAtTransition.current
  const useShift =
    Boolean(state.previous) && !reduceMotion.current && (soft || gallery)

  const enteringOpacity =
    state.previous && !state.animate ? 'opacity-0' : 'opacity-100'
  const leavingOpacity = state.animate ? 'opacity-0' : 'opacity-100'

  const enteringTransform: CSSProperties | undefined = useShift
    ? {
        transform:
          state.animate || !state.previous
            ? 'translate3d(0, 0, 0)'
            : `translate3d(${slideShift(dir, 1)}, 0, 0)`,
      }
    : undefined

  const leavingTransform: CSSProperties | undefined =
    useShift && state.animate
      ? { transform: `translate3d(${slideShift(dir, -1)}, 0, 0)` }
      : useShift
        ? { transform: 'translate3d(0, 0, 0)' }
        : undefined

  const toneClass = gallery
    ? 'ue-crossfade--gallery'
    : soft
      ? 'ue-crossfade--soft'
      : ''

  return (
    <div
      className={`ue-crossfade relative h-full w-full ${toneClass} ${className}`.trim()}
    >
      {state.previous ? (
        <img
          src={state.previous}
          alt=""
          aria-hidden
          className={`ue-crossfade__layer z-0 ${imgClassName} ${leavingOpacity}`}
          style={leavingTransform}
          sizes={sizes}
          loading="lazy"
          decoding={decoding}
          draggable={draggable}
        />
      ) : null}
      <img
        src={state.current}
        alt={alt}
        className={`ue-crossfade__layer z-[1] ${imgClassName} ${enteringOpacity}`}
        style={enteringTransform}
        sizes={sizes}
        loading="lazy"
        decoding={decoding}
        draggable={draggable}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return
          if (e.propertyName !== 'opacity') return
          if (!state.previous || !state.animate) return
          clearPrevious()
        }}
        onTransitionStart={() => {
          if (state.previous && state.animate) scheduleClearPrevious()
        }}
      />
    </div>
  )
}