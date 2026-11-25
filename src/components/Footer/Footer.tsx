import { useCallback, type CSSProperties, type MouseEvent } from 'react'
import { useMotion } from '../../motion/MotionProvider'
import footerStars from '../../../assets/footer-stars.png'
import footerTransitionStars from '../../../assets/footer-transition-stars.png'

const FOOTER_NAV = [
  { label: 'КОМПАНИЯ', href: '#about' },
  { label: 'РЕСТОРАН', href: '#restaurant' },
  { label: 'КОТЕДЖИ', href: '#cottages' },
  { label: 'КОНТАКТЫ', href: '#contacts' },
  { label: 'БРОНИРОВАНИЕ', href: '#booking' },
] as const

const legalTypography = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-footer-legal)',
  lineHeight: 'var(--text-footer-legal--line-height)',
  letterSpacing: 'var(--text-footer-legal--letter-spacing)',
  fontWeight: 'var(--text-footer-legal--font-weight)',
} as const

/** Линии у заголовка — та же логика, что Offer4FadeLine в оффере 5 */
function FooterTitleRule({ side }: { side: 'left' | 'right' }) {
  const shiftX =
    side === 'left'
      ? 'var(--spacing-footer-title-line-shift-x-left)'
      : 'var(--spacing-footer-title-line-shift-x)'

  return (
    <span
      className="offer-fade-line block min-h-0 min-w-0 flex-1"
      style={{
        minWidth: 'var(--size-offer-4-line-min-w)',
        maxWidth: 'var(--size-footer-title-rule-w)',
        height: 'var(--ue-footer-title-rule-height)',
        transform: `translateY(var(--spacing-footer-title-line-offset-y)) translateX(${shiftX})`,
        marginRight:
          side === 'left'
            ? 'calc(-1 * var(--spacing-footer-title-line-pull-left))'
            : undefined,
        marginLeft:
          side === 'right'
            ? 'calc(-1 * var(--spacing-footer-title-line-pull))'
            : undefined,
        backgroundImage:
          side === 'left'
            ? 'var(--ue-footer-title-line-left)'
            : 'var(--ue-footer-title-line-right)',
      }}
      aria-hidden
    />
  )
}

/**
 * Футер — Figma 2060:19544 / 2060:19818 (1920×450).
 * Логотип с линиями, навигация без панелей, нижняя юридическая строка.
 */
export function Footer() {
  const { scrollTo } = useMotion()

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return

      const targetId = href.slice(1)
      const target = document.getElementById(targetId)
      if (!target) return

      event.preventDefault()
      scrollTo(target)
    },
    [scrollTo],
  )

  return (
    <footer className="flex w-full flex-col bg-surface-black">
      <div
        className="w-full shrink-0 overflow-hidden bg-surface-black bg-cover bg-center bg-no-repeat"
        style={{
          height: 'var(--size-footer-transition-h)',
          backgroundImage: `url(${footerTransitionStars})`,
        }}
        aria-hidden
      />

      <div
        className="flex w-full flex-col bg-surface-black bg-cover bg-center bg-no-repeat"
        style={{
          minHeight: 'var(--size-footer-main-min-h)',
          backgroundImage: `url(${footerStars})`,
        }}
      >
        <div
          className="mx-auto flex w-full max-w-[var(--size-property-container-max)] flex-1 flex-col px-[var(--spacing-footer-inset-x)]"
          style={{ paddingTop: 'var(--spacing-footer-title-pt)' }}
        >
          <div
            className="flex w-full items-center justify-center"
            style={{ gap: 'var(--spacing-offer-4-title-line-gap)' }}
          >
            <FooterTitleRule side="left" />
            <p
              className="m-0 max-w-full shrink-0 text-center font-display text-footer-title text-balance uppercase text-text-primary"
              style={{
                lineHeight: 'var(--text-footer-title--line-height)',
                letterSpacing: 'var(--text-footer-title--letter-spacing)',
                fontWeight: 'var(--text-footer-title--font-weight)',
              }}
            >
              Urban Escape
            </p>
            <FooterTitleRule side="right" />
          </div>

          <nav
            className="flex flex-col items-center uppercase text-text-primary"
            style={{
              marginTop: 'var(--spacing-footer-rule-to-nav)',
              gap: 'var(--spacing-footer-nav-gap)',
            }}
            aria-label="Навигация в подвале"
          >
            {FOOTER_NAV.map((item, index) => {
              const navFade =
                FOOTER_NAV.length <= 1 ? 0 : index / (FOOTER_NAV.length - 1)
              const linkStyle: CSSProperties = {
                lineHeight: 'var(--text-footer-nav--line-height)',
                letterSpacing: 'var(--text-footer-nav--letter-spacing)',
                fontWeight: 'var(--text-footer-nav--font-weight)',
                ['--ue-footer-nav-fade' as string]: navFade,
                color:
                  'rgb(255 255 255 / calc((1 - var(--ue-footer-nav-fade)) * var(--opacity-footer-nav-top) + var(--ue-footer-nav-fade) * var(--opacity-footer-nav-bottom)))',
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className="font-body text-footer-nav no-underline transition-[color] duration-200 hover:!text-text-primary"
                  style={linkStyle}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div
            className="min-h-0 flex-1"
            style={{ minHeight: 'var(--spacing-footer-nav-to-legal)' }}
            aria-hidden
          />
        </div>

        <div
          className="flex w-full flex-col"
          style={{ paddingBottom: 'var(--spacing-footer-legal-py)' }}
        >
          <span
            className="mx-auto block w-full max-w-[var(--size-footer-legal-rule-w)] shrink-0 px-[var(--spacing-footer-inset-x)]"
            style={{
              height: 'var(--ue-footer-legal-divider-height)',
              backgroundImage: 'var(--ue-footer-legal-divider-gradient)',
            }}
            aria-hidden
          />

          <div
            className="mx-auto flex w-full max-w-[var(--size-property-container-max)] flex-col items-center gap-[var(--spacing-footer-legal-gap)] px-[var(--spacing-footer-inset-x)]"
            style={{ paddingTop: 'var(--spacing-footer-legal-py)' }}
          >
            <div className="flex w-full flex-col gap-[var(--spacing-footer-legal-gap)] sm:flex-row sm:items-end sm:justify-between">
              <p
                className="m-0 w-full text-center text-text-primary sm:w-auto sm:flex-1 sm:text-left"
                style={legalTypography}
              >
                все права защищены
              </p>

              <div className="flex w-full flex-col items-center text-center text-text-primary sm:w-auto sm:flex-1">
                <p className="m-0" style={legalTypography}>
                  Разработка сайта
                </p>
                <p
                  className="m-0 mt-1 font-display uppercase"
                  style={{
                    fontSize: 'var(--text-footer-credit-display)',
                    lineHeight:
                      'var(--text-footer-credit-display--line-height)',
                    letterSpacing:
                      'var(--text-footer-credit-display--letter-spacing)',
                    fontWeight:
                      'var(--text-footer-credit-display--font-weight)',
                  }}
                >
                  Arseniy
                </p>
              </div>

              <p
                className="m-0 w-full text-center uppercase text-text-primary sm:w-auto sm:flex-1 sm:text-right"
                style={legalTypography}
              >
                ООО URBAN ESCAPE
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}