import cardTextBg1 from '../../../assets/bg card1.png'
import cardTextBg2 from '../../../assets/Bg card2.png'
import cardPhoto1 from '../../../assets/Card 1.png'
import cardPhoto2 from '../../../assets/card 2.png'
import { ArrowButton } from './ArrowButton'

export type FeatureCardVariant = 'relaxation' | 'premium'

type FeatureCardProps = {
  variant: FeatureCardVariant
  reversed?: boolean
  onActionClick?: () => void
}

const CARD_CONTENT: Record<
  FeatureCardVariant,
  {
    title: string
    description: string
    decorSrc: string
    photoSrc: string
    bodyFontFamily: string
    bodySize: 'lg' | 'sm'
    textMaxWidthVar: string
    dividerMaxWidthVar: string
  }
> = {
  relaxation: {
    title: 'The atmosphere of relaxation',
    description:
      'Современный ритм диктует свои правила. Верните себе расслабление в близь природы, проводя время под открытым небом и чувствуя слияние с природой',
    decorSrc: cardTextBg1,
    photoSrc: cardPhoto1,
    bodyFontFamily: 'var(--font-ui)',
    bodySize: 'lg',
    textMaxWidthVar: '--size-feature-text-w',
    dividerMaxWidthVar: '--size-feature-divider-w',
  },
  premium: {
    title: 'Premium comfort',
    description:
      'Мы поддерживаем концепцию Luxury comfort отдыха, у нас вы не найдёте строгих правил. Здесь каждый сам выбирает свой путь к здоровью и счастью, наслаждаясь временем вместе с близкими. мы готовы предоставить весь спектр услуг.',
    decorSrc: cardTextBg2,
    photoSrc: cardPhoto2,
    bodyFontFamily: 'var(--font-body)',
    bodySize: 'sm',
    textMaxWidthVar: '--size-feature-text-w-wide',
    dividerMaxWidthVar: '--size-feature-divider-w-wide',
  },
}

type FeatureDividerProps = {
  maxWidthVar: string
}

function FeatureDivider({ maxWidthVar }: FeatureDividerProps) {
  return (
    <span
      className="block w-full shrink-0"
      style={{
        maxWidth: `var(${maxWidthVar})`,
        height: 'var(--ue-feature-divider-height)',
        backgroundImage: 'var(--ue-feature-divider-gradient)',
      }}
      aria-hidden
    />
  )
}

export function FeatureCard({
  variant,
  reversed = false,
  onActionClick,
}: FeatureCardProps) {
  const {
    title,
    description,
    decorSrc,
    photoSrc,
    bodyFontFamily,
    bodySize,
    textMaxWidthVar,
    dividerMaxWidthVar,
  } = CARD_CONTENT[variant]

  const bodyTypography =
    bodySize === 'lg'
      ? {
          fontSize: 'var(--text-feature-body-lg)',
          lineHeight: 'var(--text-feature-body-lg--line-height)',
          letterSpacing: 'var(--text-feature-body-lg--letter-spacing)',
          fontWeight: 'var(--text-feature-body-lg--font-weight)',
        }
      : {
          fontSize: 'var(--text-feature-body-sm)',
          lineHeight: 'var(--text-feature-body-sm--line-height)',
          letterSpacing: 'var(--text-feature-body-sm--letter-spacing)',
          fontWeight: 'var(--text-feature-body-sm--font-weight)',
        }

  const overlapClass = reversed
    ? 'max-lg:mx-0 lg:-mr-[var(--size-feature-overlap-reversed)]'
    : 'max-lg:mx-0 lg:-ml-[var(--size-feature-overlap)]'

  return (
    <section className="flex w-full flex-col items-center bg-surface-black px-[var(--spacing-feature-inset-x)] py-[var(--spacing-feature-y)] max-lg:px-[var(--spacing-gutter)]">
      <div
        className={`flex w-full max-w-[120rem] min-w-0 flex-col gap-[var(--spacing-feature-stack-gap)] max-lg:items-stretch lg:flex-row lg:items-start lg:gap-0 ${
          reversed ? 'lg:flex-row-reverse' : ''
        }`}
      >
        <div className="flex w-full min-w-0 shrink-0 lg:w-[var(--size-feature-decor-w)] lg:max-w-[var(--size-feature-decor-w)]">
          <div
            className={`flex w-full min-w-0 flex-col justify-start overflow-hidden bg-[length:100%_100%] bg-center bg-no-repeat opacity-80 max-lg:min-h-[14rem] max-lg:pb-[var(--spacing-feature-stack-gap)] lg:h-[var(--size-feature-media-h)] ${
              reversed
                ? 'pl-[var(--spacing-feature-text-pl)] lg:pl-[var(--spacing-feature-text-pl-reversed)]'
                : 'pl-[var(--spacing-feature-text-pl)]'
            }`}
            style={{
              backgroundImage: `url(${decorSrc})`,
              maxWidth: 'var(--size-feature-decor-w)',
              borderRadius: 'var(--radius-feature-decor)',
              paddingTop: 'var(--spacing-feature-text-pt)',
            }}
          >
            <div
              className="flex min-w-0 flex-col"
              style={{
                width: '100%',
                maxWidth: `var(${textMaxWidthVar})`,
              }}
            >
              <h3
                className="m-0 max-w-full text-text-primary break-words whitespace-normal [overflow-wrap:anywhere]"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'var(--text-feature-eyebrow)',
                  lineHeight: 'var(--text-feature-eyebrow--line-height)',
                  letterSpacing: 'var(--text-feature-eyebrow--letter-spacing)',
                  fontWeight: 'var(--text-feature-eyebrow--font-weight)',
                }}
              >
                {title}
              </h3>
              <div className="mt-[var(--spacing-feature-title-to-divider)]">
                <FeatureDivider maxWidthVar={dividerMaxWidthVar} />
              </div>
              <p
                className="m-0 mt-[var(--spacing-feature-divider-to-body)] max-w-full text-text-primary break-words whitespace-normal [overflow-wrap:anywhere]"
                style={{
                  fontFamily: bodyFontFamily,
                  ...bodyTypography,
                }}
                lang="ru"
              >
                {description}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`relative flex w-full min-w-0 shrink-0 flex-col lg:w-[var(--size-feature-photo-w)] lg:max-w-[var(--size-feature-photo-w)] ${overlapClass} z-[1]`}
        >
          <div
            className="ue-hover-card-media relative w-full min-w-0 overflow-hidden max-lg:aspect-[4/3] lg:h-[var(--size-feature-media-h)]"
            style={{ borderRadius: 'var(--radius-feature-photo)' }}
          >
            <img
              src={photoSrc}
              alt=""
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 42.5rem, 100vw"
              className="ue-hover-card-media__img block h-full w-full min-w-0 object-cover object-center"
            />
            <ArrowButton
              direction={reversed ? 'left' : 'right'}
              onClick={onActionClick}
            />
          </div>
        </div>
      </div>
    </section>
  )
}