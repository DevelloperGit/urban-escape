import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

type SlideLayer = {
  id: number
  src: string
}

type OpacityCrossfadeProps = {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  sizes?: string
}

const FADE_MS = 550

/** Двухслойный crossfade по opacity (галерея, карточки объектов). */
export function OpacityCrossfade({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  sizes,
}: OpacityCrossfadeProps) {
  const imgClasses = `ue-gallery-fade__img ${imgClassName}`.trim()
  const idRef = useRef(0)
  const displayedSrc = useRef(src)
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [top, setTop] = useState<SlideLayer>({ id: 0, src })
  const [back, setBack] = useState<SlideLayer | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const reduceMotion = useRef(false)
  const transitionRef = useRef({ back: false, isAnimating: false })

  transitionRef.current = { back: back !== null, isAnimating }

  const finishTransition = useCallback(() => {
    if (fallbackTimer.current) {
      clearTimeout(fallbackTimer.current)
      fallbackTimer.current = null
    }
    setBack(null)
    setIsAnimating(false)
  }, [])

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }, [])

  useEffect(() => {
    if (src === displayedSrc.current) return

    const previousSrc = displayedSrc.current
    displayedSrc.current = src

    if (reduceMotion.current) {
      idRef.current += 1
      setTop({ id: idRef.current, src })
      setBack(null)
      setIsAnimating(false)
      return
    }

    idRef.current += 1
    const nextId = idRef.current
    setBack({ id: nextId - 1, src: previousSrc })
    setTop({ id: nextId, src })
    setIsAnimating(false)
  }, [src])

  useLayoutEffect(() => {
    if (!back || isAnimating) return

    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setIsAnimating(true)
        fallbackTimer.current = setTimeout(finishTransition, FADE_MS)
      })
    })

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [back, top, isAnimating, finishTransition])

  useEffect(
    () => () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current)
    },
    [],
  )

  return (
    <div
      className={`ue-gallery-fade relative h-full w-full ${className}`.trim()}
    >
      {back ? (
        <img
          key={back.id}
          src={back.src}
          alt=""
          aria-hidden
          className={imgClasses}
          data-phase={isAnimating ? 'out' : 'hold'}
          draggable={false}
          loading="lazy"
          decoding="async"
          sizes={sizes}
        />
      ) : null}
      <img
        key={top.id}
        src={top.src}
        alt={alt}
        className={imgClasses}
        data-phase={back ? (isAnimating ? 'in' : 'waiting') : 'hold'}
        draggable={false}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return
          if (e.propertyName !== 'opacity') return
          const { back: hasBack, isAnimating: running } = transitionRef.current
          if (!hasBack || !running) return
          finishTransition()
        }}
      />
    </div>
  )
}