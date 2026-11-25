import aboutStars from '../../../assets/about-stars.png'
import futureCompanyCollage from '../../../assets/future company.png'
import ownerTransitionStars from '../../../assets/owner-transition-stars.png'

const FUTURE_TITLE = 'БУДУЩЕЕ КОМПАНИЙ'

const FUTURE_BODY =
  'На горизонте замаячит новая эпоха, когда аренда станет не просто сделкой, а настоящим искусством. С помощью виртуальной реальности клиенты смогут «прогуляться» по коттеджам, выбрать именно тот, который станет их временным убежищем. А на местах – заботливый персонал, готовый выполнить любое желание, чтобы каждый гость почувствовал себя VIP-клиентом.\nС учетом растущего интереса к природе и устойчивому образу жизни, компании планируют развивать экотуризм, предлагая уникальные маршруты по местным достопримечательностям и активные мероприятия на свежем воздухе. Здоровый отдых в гармонии с природой станет более чем просто трендом — это будет философия их бизнеса. В центре внимание окажется персонализированный подход, который позволит каждому клиенту создать своё идеальное пространство. «Думайте о себе как о бесконечном источнике вдохновения», — именно так будут звучать девизы компаний. Они намерены открывать новые горизонты, сотрудничая с дизайнерами, художниками и местными мастерами, чтобы каждая аренда становилась не просто отдыхом, а настоящим опытом.'

function FutureTitleDivider() {
  return (
    <span
      className="mt-[var(--spacing-desc2-title-to-divider)] block w-full shrink-0"
      style={{
        height: 'var(--ue-owner-divider-height)',
        backgroundImage: 'var(--ue-owner-divider-gradient)',
      }}
      aria-hidden
    />
  )
}

/**
 * Секция «Описание 2» — Figma 2060:17128 (1920×1057).
 * Переход 3, коллаж коттеджей, заголовок и текст о будущем компании.
 */
export function CompanyFutureSection() {
  return (
    <section
      className="flex w-full flex-col bg-surface-black"
      aria-labelledby="company-future-heading"
    >
      <div
        className="relative w-full shrink-0 overflow-hidden bg-surface-black"
        style={{ height: 'var(--size-desc2-transition-h)' }}
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
        style={{ backgroundImage: `url(${aboutStars})` }}
      >
        <div
          className="flex w-full max-w-[var(--size-property-container-max)] flex-col items-center px-[var(--spacing-gutter)] pb-[var(--spacing-desc2-pb)] pt-[var(--spacing-desc2-pt)] lg:px-[var(--spacing-desc2-px)]"
        >
          <img
            src={futureCompanyCollage}
            alt=""
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 78.75rem, 100vw"
            className="h-auto w-full max-w-[var(--size-desc2-collage-max)] object-cover"
            style={{
              aspectRatio: 'var(--size-desc2-collage-ratio)',
              borderRadius: 'var(--radius-desc2-collage)',
              boxShadow: 'var(--ue-desc2-collage-shadow)',
            }}
          />

          <div className="mt-[var(--spacing-desc2-collage-to-title)] flex w-fit max-w-full flex-col items-stretch">
            <h2
              id="company-future-heading"
              className="m-0 max-w-full text-center font-body text-desc2-title text-balance text-text-primary italic"
              style={{
                lineHeight: 'var(--text-desc2-title--line-height)',
                letterSpacing: 'var(--text-desc2-title--letter-spacing)',
                marginRight:
                  'calc(var(--text-desc2-title--letter-spacing) * -1)',
                fontWeight: 'var(--text-desc2-title--font-weight)',
              }}
            >
              {FUTURE_TITLE}
            </h2>
            <FutureTitleDivider />
          </div>

          <p
            className="m-0 mt-[var(--spacing-desc2-divider-to-body)] w-full max-w-[var(--size-desc2-body-max)] text-center font-body text-desc2-body text-text-primary italic whitespace-pre-line"
            style={{
              lineHeight: 'var(--text-desc2-body--line-height)',
              letterSpacing: 'var(--text-desc2-body--letter-spacing)',
              fontWeight: 'var(--text-desc2-body--font-weight)',
            }}
          >
            {FUTURE_BODY}
          </p>
        </div>
      </div>
    </section>
  )
}