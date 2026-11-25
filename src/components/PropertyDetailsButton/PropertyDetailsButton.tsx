type PropertyDetailsButtonProps = {
  onClick?: () => void
}

function DetailsPlusIcon() {
  return (
    <svg
      viewBox="0 0 33 33"
      fill="none"
      className="shrink-0 text-text-primary"
      style={{
        width: 'var(--size-details-plus-icon)',
        height: 'var(--size-details-plus-icon)',
      }}
      aria-hidden
    >
      <path
        d="M16.25 8v16.5M8 16.25h16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const detailsLabelTypography = {
  fontFamily: 'var(--font-offer)',
  fontSize: 'var(--text-details-button)',
  lineHeight: 'var(--text-details-button--line-height)',
  letterSpacing: 'var(--text-details-button--letter-spacing)',
  fontWeight: 'var(--text-details-button--font-weight)',
  fontStyle: 'var(--text-details-button--font-style)' as const,
}

/** CTA «Подробнее» после блока объектов — Figma переход button (2060:11053) */
export function PropertyDetailsButton({ onClick }: PropertyDetailsButtonProps) {
  return (
    <section
      id="booking"
      className="flex w-full justify-center bg-surface-black scroll-mt-6 px-[var(--spacing-gutter)]"
      aria-label="Дополнительная информация"
    >
      <div
        className="flex w-full max-w-[var(--size-property-container-max)] items-center justify-center"
        style={{
          minHeight: 'var(--size-details-section-min-h)',
          paddingTop: 'var(--spacing-details-section-y)',
          paddingBottom: 'var(--spacing-details-section-y)',
        }}
      >
        <button
          type="button"
          onClick={onClick}
          className="ue-hover-btn m-0 flex w-full max-w-full cursor-pointer items-center justify-center border border-solid border-white bg-transparent text-text-primary opacity-90 backdrop-blur-[var(--ue-details-button-blur)] sm:w-auto"
          style={{
            minHeight: 'var(--size-details-button-h)',
            minWidth: 'var(--size-details-button-min-w)',
            borderRadius: 'var(--radius-details-button)',
            borderWidth: 'var(--size-details-button-border)',
            paddingInline: 'var(--spacing-details-button-px)',
            gap: 'var(--spacing-details-button-gap)',
            ...detailsLabelTypography,
          }}
        >
          <span className="truncate">Подробнее</span>
          <DetailsPlusIcon />
        </button>
      </div>
    </section>
  )
}