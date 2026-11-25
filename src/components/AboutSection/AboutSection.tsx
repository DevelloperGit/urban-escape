import aboutPhoto from '../../../assets/company.png'
import aboutStars from '../../../assets/about-stars.png'

const ABOUT_BODY =
  '"URBAN ESCAPE\u201d — ваш идеальный выбор для премиум аренды загородных коттеджей. Мы предлагаем уникальные пространства, где каждый деталь продумана для вашего комфорта и уединения. Насладитесь роскошью природы, современными удобствами и безмятежной атмосферой вдали от городской суеты. Откройте для себя идеальное место для отдыха, встреч с близкими или вдохновения для новых идей. URBAN ESCAPE — это не просто аренда, это ваш личный уголок рая. Мы работаем уже 15 лет и мы гарантируем качество наших услуг, и только лучшее обслуживание'

const ABOUT_BRAND = 'URBAN ESCAPE'

function AboutBodyText({ text }: { text: string }) {
  const parts = text.split(new RegExp(`(${ABOUT_BRAND})`, 'g'))

  return (
    <>
      {parts.map((part, index) =>
        part === ABOUT_BRAND ? (
          <span key={index} className="font-display">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

/**
 * Секция «О компании» — Figma 7:647 «Описание компаний».
 * Фото слева, заголовок и описание справа; на узком экране стек.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      className="flex w-full justify-center bg-surface-black bg-cover bg-center bg-no-repeat scroll-mt-6"
      style={{ backgroundImage: `url(${aboutStars})` }}
      aria-labelledby="about-heading"
    >
      <div className="grid w-full max-w-[120rem] grid-cols-1 items-start gap-[var(--spacing-about-stack-gap)] px-[var(--spacing-gutter)] py-[var(--spacing-about-py)] lg:grid-cols-[minmax(0,912fr)_minmax(0,734fr)] lg:gap-x-[var(--spacing-about-photo-to-text)] lg:gap-y-0 lg:py-[var(--spacing-about-py)] lg:pr-[var(--spacing-about-pr)] lg:pl-[var(--spacing-about-pl)]">
        <img
          src={aboutPhoto}
          alt="URBAN ESCAPE — вид на побережье"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 57rem, 100vw"
          className="h-auto w-full object-cover"
          style={{
            aspectRatio: 'var(--size-about-photo-ratio)',
            borderRadius: 'var(--radius-about-photo)',
            objectPosition: 'var(--ue-about-photo-position)',
          }}
        />

        <div className="flex min-w-0 flex-col lg:pt-[var(--spacing-about-title-offset)]">
          <div
            className="about-title-row flex w-full items-center justify-center"
            style={{
              gap: 'var(--spacing-about-title-line-gap)',
              minHeight:
                'calc(var(--text-about-title) * var(--text-about-title--line-height))',
            }}
          >
            <div
              aria-hidden
              className="about-title-rule h-px shrink-0"
              style={{
                width: 'var(--size-about-title-line-w)',
                marginRight:
                  'calc(var(--spacing-about-title-line-pull-left) * -1)',
                transform: 'translateY(var(--spacing-about-title-line-drop))',
                backgroundImage: 'var(--ue-offer-4-line-gradient-left)',
              }}
            />
            <h2
              id="about-heading"
              className="m-0 max-w-full shrink text-center font-display text-about-title leading-none text-balance text-text-primary not-italic sm:whitespace-nowrap"
              style={{
                letterSpacing: 'var(--text-about-title--letter-spacing)',
                marginRight:
                  'calc(var(--text-about-title--letter-spacing) * -1)',
                fontWeight: 'var(--text-about-title--font-weight)',
              }}
            >
              URBAN ESCAPE
            </h2>
            <div
              aria-hidden
              className="about-title-rule h-px shrink-0"
              style={{
                width: 'var(--size-about-title-line-w)',
                marginLeft:
                  'calc(var(--spacing-about-title-line-pull-right) * -1)',
                transform: 'translateY(var(--spacing-about-title-line-drop))',
                backgroundImage: 'var(--ue-offer-4-line-gradient-right)',
              }}
            />
          </div>

          <p
            className="m-0 mt-[var(--spacing-about-title-to-body)] max-w-[var(--size-about-text-max)] text-left font-body text-about-body text-text-primary"
            style={{
              lineHeight: 'var(--text-about-body--line-height)',
              letterSpacing: 'var(--text-about-body--letter-spacing)',
              fontWeight: 'var(--text-about-body--font-weight)',
            }}
          >
            <AboutBodyText text={ABOUT_BODY} />
          </p>
        </div>
      </div>
    </section>
  )
}
