import ownerPoster from '../../../assets/owner-poster.png'
import ownerSectionStars from '../../../assets/owner-section-stars.png'
import ownerTransitionStars from '../../../assets/owner-transition-stars.png'

const OWNER_TITLE = 'ТРАДИЦИЙ И КАЧЕСТВО В СФЕРЕ БИЗНЕСА'

const OWNER_BODY =
  'Alexey Dmitrievich — успешный предприниматель с многолетним опытом в сфере аренды недвижимости, специализирующийся на премиум загородных коттеджах. Он является основателем и руководителем компании, которая предлагает клиентам эксклюзивные решения для отдыха и проживания вдали от городской суеты. С глубоким пониманием рынка элитной недвижимости, Alexey использует инновационные технологии для оптимизации процесса аренды, обеспечивая высокий уровень обслуживания и удовлетворение потребностей своих клиентов. Его философия бизнеса основана на принципах прозрачности, надежности и внимательности к каждому клиенту. Alexey активно сотрудничает с архитекторами и дизайнерами, создавая уникальные и эстетически привлекательные объекты, которые отражают последние тенденции в мире загородной недвижимости. Его стремление к совершенству и внимание к деталям сделали его компанию одним из лидеров в своем сегменте.'

const OWNER_DISPLAY_PHRASES = ['Alexey Dmitrievich', 'Alexey'] as const

function OwnerBodyText({ text }: { text: string }) {
  const pattern = new RegExp(
    `(${OWNER_DISPLAY_PHRASES.map((part) =>
      part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    ).join('|')})`,
    'g',
  )
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, index) =>
        (OWNER_DISPLAY_PHRASES as readonly string[]).includes(part) ? (
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

function OwnerTitleDivider() {
  return (
    <span
      className="mt-[var(--spacing-owner-title-to-divider)] block w-full shrink-0"
      style={{
        maxWidth: 'var(--size-owner-divider-w)',
        height: 'var(--ue-owner-divider-height)',
        backgroundImage: 'var(--ue-owner-divider-gradient)',
      }}
      aria-hidden
    />
  )
}

/**
 * Секция «Описание» — Figma 2060:13071.
 * Переход со звёздами, текст слева, плакат владельца справа.
 */
export function OwnerDescriptionSection() {
  return (
    <section
      className="flex w-full flex-col bg-surface-black"
      aria-labelledby="owner-description-heading"
    >
      <div
        className="relative w-full shrink-0 overflow-hidden bg-surface-black"
        style={{ height: 'var(--size-owner-transition-h)' }}
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ownerTransitionStars})`,
            opacity: 0.5,
          }}
        />
      </div>

      <div
        className="flex w-full justify-center bg-surface-black bg-cover bg-center bg-no-repeat"
        style={{
          minHeight: 'var(--size-owner-section-min-h)',
          backgroundImage: `url(${ownerSectionStars})`,
        }}
      >
        <div
          className="grid w-full max-w-[var(--size-property-container-max)] grid-cols-1 items-start gap-[var(--spacing-owner-stack-gap)] px-[var(--spacing-gutter)] pb-[var(--spacing-owner-pb)] pt-[var(--spacing-owner-content-pt)] lg:grid-cols-[minmax(0,921fr)_minmax(0,679fr)] lg:items-center lg:gap-x-[var(--spacing-owner-columns-gap)] lg:px-[var(--spacing-owner-pl)] lg:pr-[var(--spacing-owner-pr)] lg:pt-[var(--spacing-owner-content-pt)]"
        >
          <div className="flex min-w-0 flex-col items-center lg:self-center">
            <h2
              id="owner-description-heading"
              className="m-0 max-w-[var(--size-owner-title-max)] text-center font-body text-owner-title text-balance text-text-primary"
              style={{
                lineHeight: 'var(--text-owner-title--line-height)',
                letterSpacing: 'var(--text-owner-title--letter-spacing)',
                fontWeight: 'var(--text-owner-title--font-weight)',
              }}
            >
              {OWNER_TITLE}
            </h2>

            <OwnerTitleDivider />

            <p
              className="m-0 mt-[var(--spacing-owner-divider-to-body)] w-full max-w-[var(--size-owner-body-max)] text-left font-body text-owner-body text-text-primary"
              style={{
                lineHeight: 'var(--text-owner-body--line-height)',
                letterSpacing: 'var(--text-owner-body--letter-spacing)',
                fontWeight: 'var(--text-owner-body--font-weight)',
              }}
            >
              <OwnerBodyText text={OWNER_BODY} />
            </p>
          </div>

          <img
            src={ownerPoster}
            alt=""
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 45rem, 100vw"
            className="h-auto w-full max-w-[var(--size-owner-poster-max)] justify-self-center object-contain lg:justify-self-end lg:self-center"
            style={{
              aspectRatio: 'var(--size-owner-poster-ratio)',
              borderRadius: 'var(--radius-owner-poster)',
            }}
          />
        </div>
      </div>
    </section>
  )
}