import bannerBg from '../../../assets/Bg banner.png'

export type ContactCTAProps = {
  onContactsClick?: () => void
}

/**
 * CTA «Баннер» после галереи — Figma 2060:11085.
 * Фон — assets/Bg banner.png; стеклянный оверлей — blur + inner shadow из макета.
 */
export function ContactCTA({ onContactsClick }: ContactCTAProps) {
  return (
    <section
      id="contacts"
      className="flex w-full justify-center bg-surface-black scroll-mt-6"
      aria-labelledby="contact-cta-heading"
    >
      <div
        className="flex w-full max-w-[var(--size-property-container-max)]"
        style={{
          paddingTop: 'var(--spacing-banner-section-y)',
          paddingBottom: 'var(--spacing-banner-section-y)',
          paddingLeft: 'var(--spacing-banner-section-x)',
          paddingRight: 'var(--spacing-banner-section-x)',
        }}
      >
        <div
          className="flex w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            minHeight: 'var(--size-banner-card-min-h)',
            borderRadius: 'var(--radius-banner-card)',
            backgroundImage: `url(${bannerBg})`,
          }}
        >
          <div
            className="flex w-full flex-1 flex-col items-center text-center text-text-primary backdrop-blur-[var(--ue-banner-overlay-blur)]"
            style={{
              backgroundColor: 'var(--ue-banner-overlay-bg)',
              boxShadow: 'var(--ue-banner-inner-shadow)',
              paddingTop: 'var(--spacing-banner-card-pt)',
              paddingBottom: 'var(--spacing-banner-card-pb)',
              paddingLeft: 'var(--spacing-banner-card-x)',
              paddingRight: 'var(--spacing-banner-card-x)',
            }}
          >
            <p
              className="font-display text-banner-title uppercase"
              style={{
                lineHeight: 'var(--text-banner-title--line-height)',
                letterSpacing: 'var(--text-banner-title--letter-spacing)',
                fontWeight: 'var(--text-banner-title--font-weight)',
              }}
            >
              Urban Escape
            </p>

            <h2
              id="contact-cta-heading"
              className="mx-auto mt-[var(--spacing-banner-content-gap)] max-w-[var(--size-banner-message-max-w)] font-body text-banner-message text-pretty uppercase"
              style={{
                lineHeight: 'var(--text-banner-message--line-height)',
                letterSpacing: 'var(--text-banner-message--letter-spacing)',
                fontWeight: 'var(--text-banner-message--font-weight)',
              }}
            >
              Свяжитесь с нами, и мы поможем спланировать ваш идеальный отдых
            </h2>

            <button
              type="button"
              onClick={onContactsClick}
              className="ue-hover-btn m-0 mt-[var(--spacing-banner-message-to-button)] flex w-full max-w-[var(--size-banner-button-min-w)] cursor-pointer items-center justify-center border border-solid border-white bg-transparent text-text-primary uppercase opacity-90 sm:w-auto"
              style={{
                minHeight: 'var(--size-banner-button-h)',
                borderRadius: 'var(--radius-banner-button)',
                borderWidth: 'var(--size-banner-button-border)',
                paddingInline: 'var(--spacing-banner-button-px)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-banner-button)',
                lineHeight: 'var(--text-banner-button--line-height)',
                letterSpacing: 'var(--text-banner-button--letter-spacing)',
                fontWeight: 'var(--text-banner-button--font-weight)',
              }}
            >
              Контакты
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}