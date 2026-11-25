import type { CSSProperties } from 'react'

export type ArrowDirection = 'left' | 'right'

type ArrowButtonProps = {
  direction: ArrowDirection
  onClick?: () => void
  'aria-label'?: string
  /** `corner` — как на FeatureCard (низ фото); `side` — по центру левого/правого края */
  placement?: 'corner' | 'side'
  /** `inset` — от краёв контейнера; `card` — позицию задаёт родитель (className / style) */
  sideAnchor?: 'inset' | 'card'
  className?: string
  style?: CSSProperties
  /** `diagonal` — как FeatureCard; `horizontal` — шевроны влево/вправо (PropertyCard) */
  iconVariant?: 'diagonal' | 'horizontal'
}

function HorizontalArrowIcon({ direction }: { direction: ArrowDirection }) {
  const isRight = direction === 'right'
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
      {isRight ? (
        <path d="M9 6l6 6-6 6" />
      ) : (
        <path d="M15 6l-6 6 6 6" />
      )}
    </svg>
  )
}

function ArrowIcon({ mirrored }: { mirrored: boolean }) {
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
      style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export function ArrowButton({
  direction,
  onClick,
  'aria-label': ariaLabel = 'Подробнее',
  placement = 'corner',
  sideAnchor = 'inset',
  className = '',
  style,
  iconVariant = 'diagonal',
}: ArrowButtonProps) {
  const isRight = direction === 'right'

  const isSide = placement === 'side'

  const sidePositionStyle: CSSProperties | undefined =
    isSide && sideAnchor === 'inset'
      ? isRight
        ? { right: 'var(--spacing-property-nav-arrow-photo-inset)' }
        : { left: 'var(--spacing-property-nav-arrow-photo-inset)' }
      : undefined

  const cornerPositionStyle: CSSProperties | undefined = !isSide
    ? isRight
      ? { right: 'var(--spacing-feature-arrow-inline)' }
      : { left: 'var(--spacing-feature-arrow-inline)' }
    : undefined

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`ue-hover-btn absolute z-[2] m-0 flex cursor-pointer items-center justify-center rounded-full border-0 bg-white p-0 opacity-70 ${
        isSide
          ? 'top-1/2 h-[var(--size-property-nav-arrow)] w-[var(--size-property-nav-arrow)] -translate-y-1/2'
          : 'bottom-[var(--spacing-feature-arrow-bottom)] h-[var(--size-feature-arrow)] w-[var(--size-feature-arrow)]'
      } ${className}`.trim()}
      style={{ ...sidePositionStyle, ...cornerPositionStyle, ...style }}
    >
      {iconVariant === 'horizontal' ? (
        <HorizontalArrowIcon direction={direction} />
      ) : (
        <ArrowIcon mirrored={!isRight} />
      )}
    </button>
  )
}