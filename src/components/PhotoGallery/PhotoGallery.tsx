import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { GallerySlideFade } from './GallerySlideFade'
import {
  photoGallerySlides,
  photoGalleryTopCards,
} from './photoGalleryContent'

const SWIPE_THRESHOLD_PX = 36
const DRAG_RESISTANCE = 0.38
const AUTOPLAY_MS = 6000

const labelTypography: CSSProperties = {
  fontFamily: 'var(--font-deco)',
  fontSize: 'var(--text-gallery-label)',
  lineHeight: 'var(--text-gallery-label--line-height)',
  letterSpacing: 'var(--text-gallery-label--letter-spacing)',
  fontWeight: 'var(--text-gallery-label--font-weight)',
  fontStyle: 'var(--text-gallery-label--font-style)',
}

function slideSizeVars(distance: number): CSSProperties {
  const abs = Math.abs(distance)
  if (abs === 0) {
    return {
      width: 'var(--size-gallery-slide-active-w)',
      height: 'var(--size-gallery-slide-active-h)',
    }
  }
  if (abs === 1) {
    return {
      width: 'var(--size-gallery-slide-adjacent-w)',
      height: 'var(--size-gallery-slide-adjacent-h)',
    }
  }
  return {
    width: 'var(--size-gallery-slide-outer-w)',
    height: 'var(--size-gallery-slide-outer-h)',
  }
}

function CarouselChevron({ direction }: { direction: 'left' | 'right' }) {
  const isRight = direction === 'right'
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
      style={{
        width: 'var(--size-gallery-nav-arrow)',
        height: 'var(--size-gallery-nav-arrow)',
        color: 'var(--color-gallery-dot)',
      }}
      aria-hidden
    >
      <path
        d={isRight ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GalleryCarousel() {
  const slideCount = photoGallerySlides.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [isCompact, setIsCompact] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const dragStartX = useRef<number | null>(null)
  const regionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex

  const goTo = useCallback(
    (index: number) => {
      const current = activeIndexRef.current
      if (index === current) return
      setActiveIndex(index)
    },
    [slideCount],
  )

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slideCount) % slideCount)
  }, [slideCount])

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slideCount)
  }, [slideCount])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || isHovered || isDragging) return

    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slideCount)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [isHovered, isDragging, slideCount])

  const visibleOffsets = isCompact ? [0] : [-2, -1, 0, 1, 2]

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX
    setIsDragging(true)
    setDragX(0)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    const max = isCompact ? 120 : 88
    const damped =
      Math.sign(delta) *
      Math.min(Math.abs(delta) * DRAG_RESISTANCE, max)
    setDragX(damped)
  }

  const finishDrag = (clientX: number) => {
    if (dragStartX.current === null) return
    const delta = clientX - dragStartX.current
    dragStartX.current = null
    setIsDragging(false)
    setDragX(0)

    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return
    if (delta < 0) goNext()
    else goPrev()
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    finishDrag(e.clientX)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrev()
    }
  }

  return (
    <div
      className="flex w-full flex-col max-lg:mx-auto max-lg:max-w-[var(--size-gallery-viewport-max-w)] lg:contents"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget as Node)) {
          setIsHovered(false)
        }
      }}
    >
      <div
        ref={regionRef}
        className="relative min-w-0 px-[var(--spacing-gallery-carousel-px)] max-lg:mx-auto max-lg:w-full max-lg:max-w-[var(--size-gallery-viewport-max-w)] lg:col-start-2 lg:row-start-1 lg:w-full lg:max-w-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Галерея фотографий"
      >
        <div
          className="relative touch-pan-y overflow-hidden"
          style={{
            WebkitMaskImage: 'var(--ue-gallery-edge-mask)',
            maskImage: 'var(--ue-gallery-edge-mask)',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragStartX.current = null
            setIsDragging(false)
            setDragX(0)
          }}
          onKeyDown={onKeyDown}
          tabIndex={0}
        >
          <div
            className={`ue-carousel-track flex w-full touch-pan-y items-center justify-center ${
              isDragging ? 'is-dragging' : ''
            }`}
            style={{
              gap: 'var(--gap-gallery-slides)',
              transform: `translate3d(${dragX}px, 0, 0)`,
            }}
          >
            {visibleOffsets.map((offset) => {
              const index =
                (activeIndex + offset + slideCount * 4) % slideCount
              const slide = photoGallerySlides[index]
              const sideClass =
                offset === 0
                  ? 'ue-carousel-slide--center'
                  : 'ue-carousel-slide--side'

              return (
                <figure
                  key={offset}
                  className={`ue-carousel-slide relative m-0 shrink-0 overflow-hidden ${sideClass}`}
                  style={{
                    ...slideSizeVars(offset),
                    borderRadius: 'var(--radius-gallery-card)',
                  }}
                  aria-hidden={offset !== 0}
                >
                  {offset === 0 ? (
                    <GallerySlideFade src={slide.src} alt={slide.alt} />
                  ) : (
                    <img
                      src={slide.src}
                      alt=""
                      className="block h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 768px) 28rem, 85vw"
                      draggable={false}
                    />
                  )}
                </figure>
              )
            })}
          </div>
        </div>
      </div>

      <nav
        className="mt-[var(--spacing-gallery-carousel-nav-gap)] flex items-center justify-center max-lg:mx-auto max-lg:max-w-[var(--size-gallery-viewport-max-w)] lg:col-start-2 lg:row-start-2 lg:mt-[var(--spacing-gallery-carousel-nav-gap)] lg:w-full"
        style={{ gap: 'var(--spacing-gallery-nav-gap)' }}
        aria-label="Навигация по слайдам"
      >
        <button
          type="button"
          onClick={goPrev}
          className="ue-hover-btn m-0 flex cursor-pointer items-center justify-center border-0 bg-transparent p-2"
          style={{
            width: 'var(--size-gallery-nav-hit)',
            height: 'var(--size-gallery-nav-hit)',
          }}
          aria-label="Предыдущий слайд"
        >
          <CarouselChevron direction="left" />
        </button>

        <div
          className="flex items-center justify-center"
          style={{ gap: 'var(--gap-gallery-dots)' }}
        >
          {photoGallerySlides.map((_, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                className="m-0 cursor-pointer border-0 bg-transparent p-1 transition-opacity duration-[var(--ue-motion-duration-carousel)] ease-[var(--ue-motion-ease-carousel)]"
                style={{ opacity: isActive ? 1 : 0.5 }}
                aria-label={`Слайд ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className="block rounded-full transition-[width,height,background-color] duration-[var(--ue-motion-duration-carousel)] ease-[var(--ue-motion-ease-carousel)]"
                  style={{
                    width: isActive
                      ? 'var(--size-gallery-dot-active)'
                      : 'var(--size-gallery-dot)',
                    height: isActive
                      ? 'var(--size-gallery-dot-active)'
                      : 'var(--size-gallery-dot)',
                    backgroundColor: isActive
                      ? 'var(--color-gallery-dot-active)'
                      : 'var(--color-gallery-dot)',
                  }}
                />
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="ue-hover-btn m-0 flex cursor-pointer items-center justify-center border-0 bg-transparent p-2"
          style={{
            width: 'var(--size-gallery-nav-hit)',
            height: 'var(--size-gallery-nav-hit)',
          }}
          aria-label="Следующий слайд"
        >
          <CarouselChevron direction="right" />
        </button>
      </nav>
    </div>
  )
}

/** Карточка с каруселью — Figma 2060:11075 */
export function PhotoGallery() {
  return (
    <section
      className="w-full bg-surface-black"
      aria-labelledby="photo-gallery-heading"
    >
      <h2 id="photo-gallery-heading" className="sr-only">
        Photo Gallery
      </h2>

      <div
        className="mx-auto w-full max-w-[var(--size-gallery-container-max)] px-[var(--spacing-gallery-inset-x)] pt-[var(--spacing-gallery-pt)] pb-[var(--spacing-gallery-pb)]"
      >
        <ul
          className="m-0 flex list-none flex-col items-center gap-[var(--gap-gallery-top-row)] p-0 max-md:gap-[var(--spacing-feature-stack-gap)] md:flex-row md:justify-center"
        >
          {photoGalleryTopCards.map((card) => (
            <li
              key={card.src}
              className="w-full max-md:max-w-[var(--size-gallery-card-w)]"
              style={{ maxWidth: 'var(--size-gallery-card-w)' }}
            >
              <img
                src={card.src}
                alt={card.alt}
                className="block h-[var(--size-gallery-card-h)] w-full object-cover"
                style={{ borderRadius: 'var(--radius-gallery-card)' }}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 768px) 26.5rem, 100vw"
              />
            </li>
          ))}
        </ul>

        <div className="mt-[var(--spacing-gallery-top-to-carousel)] w-full max-lg:flex max-lg:flex-col max-lg:gap-[var(--spacing-feature-stack-gap)] lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-[clamp(0.5rem,2vw,2rem)]">
          <span
            className="pointer-events-none hidden shrink-0 select-none text-text-primary lg:col-start-1 lg:row-start-1 lg:flex lg:items-center lg:self-stretch"
            style={labelTypography}
            aria-hidden
          >
            Photo
          </span>

          <GalleryCarousel />

          <span
            className="pointer-events-none hidden shrink-0 select-none text-transparent lg:col-start-3 lg:row-start-1 lg:flex lg:items-center lg:justify-end lg:self-stretch"
            style={{
              ...labelTypography,
              WebkitTextStroke: 'var(--size-gallery-label-stroke) #ffffff',
            }}
            aria-hidden
          >
            Gallery
          </span>

          <div
            className="pointer-events-none flex items-center justify-between px-1 lg:hidden"
            aria-hidden
          >
            <span className="select-none text-text-primary" style={labelTypography}>
              Photo
            </span>
            <span
              className="select-none text-transparent"
              style={{
                ...labelTypography,
                WebkitTextStroke: 'var(--size-gallery-label-stroke) #ffffff',
              }}
            >
              Gallery
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}