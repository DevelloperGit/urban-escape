import { useCallback, useRef, useState } from 'react'
import { ArrowButton } from '../FeatureCard/ArrowButton'
import { OpacityCrossfade } from '../OpacityCrossfade'

export type PropertyCardProps = {
  title: string
  description: string
  capacity: string
  mainImage: string
  thumbnails: string[]
  decorBackground: string
  /** Текстура/геометрия поверх фото (Figma card-bg-decor) */
  decorOverlay?: string
  /** Figma crop card-bg-decor — переопределяет --ue-property-bg-position */
  decorBackgroundPosition?: string
  /** Позиция оверлея card-bg-decor (по умолчанию center) */
  decorOverlayPosition?: string
  /** Усиление правого градиента для читаемости текста */
  decorSideGradient?: string
  onBookClick?: () => void
  onDetailsClick?: () => void
}

function PropertyDivider() {
  return (
    <span
      className="block w-full shrink-0"
      style={{
        maxWidth: 'var(--size-property-divider-w)',
        height: 'var(--ue-property-divider-height)',
        backgroundImage: 'var(--ue-property-divider-gradient)',
      }}
      aria-hidden
    />
  )
}

function CapacityIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 text-text-primary"
      style={{
        width: 'var(--size-property-capacity-icon)',
        height: 'var(--size-property-capacity-icon)',
      }}
      aria-hidden
    >
      <path
        d="M8 1.5a3.25 3.25 0 0 1 3.25 3.25v1.5H4.75V4.75A3.25 3.25 0 0 1 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M3.25 8.25c0-1.38 2.02-2.25 4.75-2.25s4.75.87 4.75 2.25V14H3.25V8.25Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CtaArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-black"
      aria-hidden
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

const textBlockTypography = {
  title: {
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--text-property-title)',
    lineHeight: 'var(--text-property-title--line-height)',
    letterSpacing: 'var(--text-property-title--letter-spacing)',
    fontWeight: 'var(--text-property-title--font-weight)',
  },
  body: {
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--text-property-body)',
    lineHeight: 'var(--text-property-body--line-height)',
    letterSpacing: 'var(--text-property-body--letter-spacing)',
    fontWeight: 'var(--text-property-body--font-weight)',
  },
  capacity: {
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--text-property-capacity)',
    lineHeight: 'var(--text-property-capacity--line-height)',
    letterSpacing: 'var(--text-property-capacity--letter-spacing)',
    fontWeight: 'var(--text-property-capacity--font-weight)',
  },
  cta: {
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--text-property-cta)',
    lineHeight: 'var(--text-property-cta--line-height)',
    letterSpacing: 'var(--text-property-cta--letter-spacing)',
    fontWeight: 'var(--text-property-cta--font-weight)',
  },
} as const

function PropertyTextBlock({
  title,
  description,
  capacity,
  onBookClick,
  onDetailsClick,
}: Pick<
  PropertyCardProps,
  'title' | 'description' | 'capacity' | 'onBookClick' | 'onDetailsClick'
>) {
  return (
    <div
      className="flex min-w-0 flex-col"
      style={{ maxWidth: 'var(--size-property-text-max-w)' }}
    >
      <h3 className="m-0 text-text-primary" style={textBlockTypography.title}>
        {title}
      </h3>
      <div className="mt-[var(--spacing-property-title-to-divider)]">
        <PropertyDivider />
      </div>
      <p
        className="m-0 mt-[var(--spacing-property-divider-to-body)] text-text-primary whitespace-pre-line"
        style={textBlockTypography.body}
        lang="ru"
      >
        {description}
      </p>
      <div className="mt-[var(--spacing-property-body-to-capacity)] flex items-center gap-[var(--spacing-property-capacity-gap)]">
        <CapacityIcon />
        <span className="text-text-primary" style={textBlockTypography.capacity}>
          {capacity}
        </span>
      </div>
      <div className="mt-[var(--spacing-property-capacity-to-cta)] flex flex-wrap items-center gap-[var(--spacing-property-cta-gap)]">
        <button
          type="button"
          onClick={onBookClick}
          className="ue-hover-btn m-0 flex min-h-[var(--size-property-cta-h)] min-w-[var(--size-property-cta-min-w)] cursor-pointer items-center justify-center border border-solid border-white bg-transparent px-[clamp(1.5rem,1.864583vw,2.25rem)] text-text-primary opacity-90"
          style={{
            borderRadius: 'var(--radius-property-cta)',
            ...textBlockTypography.cta,
          }}
        >
          БРОНЬ НОМЕРА
        </button>
        <button
          type="button"
          onClick={onDetailsClick}
          aria-label="Подробнее об объекте"
          className="ue-hover-btn m-0 flex h-[var(--size-property-cta-arrow)] w-[var(--size-property-cta-arrow)] shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-white p-0 opacity-80"
        >
          <CtaArrowIcon />
        </button>
      </div>
    </div>
  )
}

function PropertyGallery({
  images,
  activeIndex,
  onSelect,
}: {
  images: string[]
  activeIndex: number
  onSelect: (index: number) => void
}) {
  return (
    <div
      className="grid w-full min-w-0 max-w-full grid-cols-2 gap-[var(--spacing-property-thumb-gap)] min-[420px]:grid-cols-4"
      role="list"
      aria-label="Миниатюры"
    >
      {images.map((src, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={`${src}-${index}`}
            type="button"
            role="listitem"
            onClick={() => onSelect(index)}
            aria-label={`Фото ${index + 1}`}
            aria-current={isActive ? 'true' : undefined}
            className={`ue-gallery-thumb relative m-0 min-w-0 w-full cursor-pointer overflow-hidden border-0 bg-surface-rock p-0 ${
              isActive
                ? 'opacity-100 outline outline-1 outline-white/40 outline-offset-0'
                : 'opacity-90 hover:opacity-100'
            }`}
            style={{
              height: 'var(--size-property-thumb-h)',
              borderRadius: 'var(--radius-property-thumb)',
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="block h-full w-full object-cover object-center"
              decoding="async"
              sizes="(min-width: 1024px) 15rem, 4.5rem"
            />
          </button>
        )
      })}
    </div>
  )
}

export function PropertyCard({
  title,
  description,
  capacity,
  mainImage,
  thumbnails,
  decorBackground,
  decorOverlay,
  decorBackgroundPosition,
  decorOverlayPosition = 'center',
  decorSideGradient,
  onBookClick,
  onDetailsClick,
}: PropertyCardProps) {
  const images = thumbnails.length > 0 ? thumbnails : [mainImage]

  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex

  const currentImage = images[activeIndex] ?? images[0] ?? mainImage

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const selectImage = useCallback((index: number) => {
    const current = activeIndexRef.current
    if (index === current) return
    setActiveIndex(index)
  }, [])

  const sectionDecorStyle = {
    ...(decorBackgroundPosition
      ? { '--ue-property-bg-position': decorBackgroundPosition }
      : null),
    ...(decorSideGradient
      ? { '--ue-property-bg-gradient-side': decorSideGradient }
      : null),
  } as React.CSSProperties

  const backgroundLayers = (
    <>
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${decorBackground})`,
          backgroundPosition:
            decorBackgroundPosition ?? 'var(--ue-property-bg-position)',
        }}
      />
      {decorOverlay ? (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${decorOverlay})`,
            backgroundPosition: decorOverlayPosition,
            opacity: 'var(--ue-property-bg-overlay-opacity)',
          }}
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--ue-property-bg-dim)' }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'var(--ue-property-bg-gradient-edge)' }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: 'var(--ue-property-bg-gradient)' }}
      />
      <div
        className="absolute inset-0 max-lg:hidden opacity-50"
        style={{ backgroundImage: 'var(--ue-property-bg-gradient-side)' }}
      />
    </>
  )

  return (
    <section
      className="grid w-full py-[var(--spacing-property-y)]"
      aria-label={title}
      style={sectionDecorStyle}
    >
      <div
        className="property-card__bleed pointer-events-none col-start-1 row-start-1 w-full max-w-full min-w-0 justify-self-stretch overflow-hidden max-lg:min-h-0 lg:min-h-[var(--size-property-card-h)]"
        aria-hidden
      >
        {backgroundLayers}
      </div>

      <div
        className="property-card__stage relative isolate col-start-1 row-start-1 overflow-visible max-lg:min-h-0 lg:min-h-[var(--size-property-card-h)]"
      >
        <div className="relative z-[1] w-full min-w-0 max-lg:flex max-lg:flex-col max-lg:gap-[var(--spacing-property-stack-gap)] max-lg:px-[var(--spacing-gutter)] max-lg:py-[var(--spacing-property-main-top)] lg:min-h-[var(--size-property-card-h)]">
          <div
            className="relative z-[1] w-full min-w-0 max-lg:w-full lg:absolute lg:top-[var(--spacing-property-main-top)] lg:left-[var(--spacing-property-main-left)]"
            style={{
              width: 'var(--size-property-main-w)',
              maxWidth: 'var(--size-property-main-w)',
            }}
          >
            <div
              className="ue-hover-card-media relative isolate w-full overflow-hidden"
              style={{
                height: 'var(--size-property-main-h)',
                borderRadius: 'var(--radius-property-main)',
              }}
            >
              <OpacityCrossfade
                src={currentImage}
                alt=""
                imgClassName="ue-hover-card-media__img"
                sizes="(min-width: 1024px) 55.625rem, 100vw"
              />
              <ArrowButton
                direction="left"
                placement="side"
                iconVariant="horizontal"
                onClick={goPrev}
                aria-label="Предыдущее фото"
                className="z-[3] lg:hidden"
              />
              <ArrowButton
                direction="right"
                placement="side"
                iconVariant="horizontal"
                onClick={goNext}
                aria-label="Следующее фото"
                className="z-[3] lg:hidden"
              />
            </div>
          </div>

          <ArrowButton
            direction="left"
            placement="side"
            sideAnchor="card"
            iconVariant="horizontal"
            onClick={goPrev}
            aria-label="Предыдущее фото"
            className="z-[5] max-lg:hidden lg:!left-[calc(var(--spacing-property-main-left)+var(--spacing-property-nav-arrow-photo-inset))] lg:!right-auto"
          />
          <ArrowButton
            direction="right"
            placement="side"
            sideAnchor="card"
            iconVariant="horizontal"
            onClick={goNext}
            aria-label="Следующее фото"
            className="z-[5] max-lg:hidden lg:!left-[calc(var(--spacing-property-main-left)+var(--size-property-main-w)-var(--size-property-nav-arrow)-var(--spacing-property-nav-arrow-photo-inset))] lg:!right-auto"
          />

          <div
            className="relative z-[2] min-w-0 max-lg:w-full max-lg:max-w-full lg:absolute lg:top-[var(--spacing-property-text-pt)] lg:left-[var(--spacing-property-text-left)] lg:max-w-[min(var(--size-property-text-max-w),calc(100%-var(--spacing-property-text-left)-var(--spacing-property-gallery-right)))]"
          >
            <PropertyTextBlock
              title={title}
              description={description}
              capacity={capacity}
              onBookClick={onBookClick}
              onDetailsClick={onDetailsClick}
            />
          </div>

          <div
            className="relative z-[2] min-w-0 max-lg:w-full max-lg:pt-[var(--spacing-property-gallery-pt)] lg:absolute lg:right-[var(--spacing-property-gallery-right)] lg:bottom-[var(--spacing-property-gallery-bottom)] lg:left-[var(--spacing-property-gallery-left)]"
          >
            <PropertyGallery
              images={images}
              activeIndex={activeIndex}
              onSelect={selectImage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}