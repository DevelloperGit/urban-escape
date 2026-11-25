import offer5TransitionBg from '../../../assets/offer-5-bg-transition.png'

type TextOfferVariant =
  | 'montserrat'
  | 'cuprum'
  | 'alternates'
  | 'jura'
  | 'offer4'
  | 'offer5'

type TextOfferLayout = {
  maxWidthVar: string
  paddingXVar?: string
  paddingYVar: string
  minHeightVar?: string
  fontFamilyVar: string
  fontSizeVar: string
  fontStyleVar: string
  lineHeightVar: string
  letterSpacingVar: string
  fontWeightVar: string
}

const LAYOUT_BY_VARIANT: Record<
  Exclude<TextOfferVariant, 'offer4' | 'offer5'>,
  TextOfferLayout
> = {
  montserrat: {
    maxWidthVar: '--spacing-offer-max-w',
    paddingYVar: '--spacing-offer-y',
    minHeightVar: '--spacing-offer-min-h',
    fontFamilyVar: '--font-offer',
    fontSizeVar: '--text-offer',
    fontStyleVar: '--text-offer--font-style',
    lineHeightVar: '--text-offer--line-height',
    letterSpacingVar: '--text-offer--letter-spacing',
    fontWeightVar: '--text-offer--font-weight',
  },
  cuprum: {
    maxWidthVar: '--spacing-offer-max-w-cuprum',
    paddingXVar: '--spacing-offer-cuprum-x',
    paddingYVar: '--spacing-offer-cuprum-y',
    fontFamilyVar: '--font-editorial',
    fontSizeVar: '--text-offer-cuprum',
    fontStyleVar: '--text-offer-cuprum--font-style',
    lineHeightVar: '--text-offer-cuprum--line-height',
    letterSpacingVar: '--text-offer-cuprum--letter-spacing',
    fontWeightVar: '--text-offer-cuprum--font-weight',
  },
  alternates: {
    maxWidthVar: '--spacing-offer-max-w-alternates',
    paddingXVar: '--spacing-offer-alternates-x',
    paddingYVar: '--spacing-offer-alternates-text-pt',
    fontFamilyVar: '--font-quote',
    fontSizeVar: '--text-offer-alternates',
    fontStyleVar: '--text-offer-alternates--font-style',
    lineHeightVar: '--text-offer-alternates--line-height',
    letterSpacingVar: '--text-offer-alternates--letter-spacing',
    fontWeightVar: '--text-offer-alternates--font-weight',
  },
  jura: {
    maxWidthVar: '--spacing-offer-max-w-jura',
    paddingXVar: '--spacing-offer-jura-x',
    paddingYVar: '--spacing-offer-jura-y',
    minHeightVar: '--spacing-offer-jura-min-h',
    fontFamilyVar: '--font-section',
    fontSizeVar: '--text-offer-jura',
    fontStyleVar: '--text-offer-jura--font-style',
    lineHeightVar: '--text-offer-jura--line-height',
    letterSpacingVar: '--text-offer-jura--letter-spacing',
    fontWeightVar: '--text-offer-jura--font-weight',
  },
}

const TEXT_STYLE = (layout: TextOfferLayout) =>
  ({
    fontFamily: `var(${layout.fontFamilyVar})`,
    fontSize: `var(${layout.fontSizeVar})`,
    fontStyle: `var(${layout.fontStyleVar})`,
    lineHeight: `var(${layout.lineHeightVar})`,
    letterSpacing: `var(${layout.letterSpacingVar})`,
    fontWeight: `var(${layout.fontWeightVar})`,
  }) as const

function OfferAlternatesDivider() {
  return (
    <span
      className="block w-full shrink-0"
      style={{
        height: 'var(--ue-offer-alternates-divider-height)',
        backgroundImage: 'var(--ue-offer-alternates-divider-gradient)',
      }}
      aria-hidden
    />
  )
}

const ALTERNATES_LINE_ONE = 'Вдохновляющие локации'
const ALTERNATES_LINE_TWO = 'для незабываемых моментов'

const OFFER4_TITLE_DEFAULT =
  'ВЫСОКОЛАССНАЯ КУХНЯ - ЗАЛОГ НАШЕГО УСПЕХА'
const OFFER4_SUBTITLE_DEFAULT = 'Только специалисты высшей кухни'
const OFFER5_TEXT_DEFAULT = 'Компания Urban Escape'

const offer5Typography = {
  fontSize: 'var(--text-offer-5)',
  lineHeight: 'var(--text-offer-5--line-height)',
  letterSpacing: 'var(--text-offer-5--letter-spacing)',
} as const

const offer4TitleTypography = {
  fontFamily: 'var(--font-editorial)',
  fontSize: 'var(--text-offer-4-title)',
  lineHeight: 'var(--text-offer-4-title--line-height)',
  letterSpacing: 'var(--text-offer-4-title--letter-spacing)',
  fontWeight: 'var(--text-offer-4-title--font-weight)',
  fontStyle: 'var(--text-offer-4-title--font-style)' as const,
}

function Offer4FadeLine({
  side,
  lineOffsetVar = '--spacing-offer-4-line-offset-y',
  lineShiftXVar,
}: {
  side: 'left' | 'right'
  lineOffsetVar?: string
  lineShiftXVar?: string
}) {
  const shiftX = lineShiftXVar ? ` translateX(var(${lineShiftXVar}))` : ''

  return (
    <span
      className="offer-fade-line block min-h-0 min-w-0 flex-1"
      style={{
        minWidth: 'var(--size-offer-4-line-min-w)',
        height: 'var(--ue-offer-4-line-height)',
        transform: `translateY(var(${lineOffsetVar}))${shiftX}`,
        marginRight:
          side === 'left'
            ? 'calc(-1 * var(--spacing-offer-4-line-pull-left))'
            : undefined,
        backgroundImage:
          side === 'left'
            ? 'var(--ue-offer-4-line-gradient-left)'
            : 'var(--ue-offer-4-line-gradient-right)',
      }}
      aria-hidden
    />
  )
}

/** Figma 2104:79 — линии по бокам от «В» / «А», flex-1 к краям */
function Offer4TitleRow({ title }: { title: string }) {
  return (
    <div
      className="flex w-full max-w-full items-center justify-center"
      style={{ gap: 'var(--spacing-offer-4-title-line-gap)' }}
    >
      <Offer4FadeLine side="left" />
      <p
        className="m-0 max-w-full shrink-0 text-center uppercase text-text-primary text-pretty sm:whitespace-nowrap"
        style={offer4TitleTypography}
        lang="ru"
      >
        {title}
      </p>
      <Offer4FadeLine side="right" />
    </div>
  )
}

const offer4SubTypography = {
  fontFamily: 'var(--font-offer)',
  fontSize: 'var(--text-offer-4-sub)',
  lineHeight: 'var(--text-offer-4-sub--line-height)',
  letterSpacing: 'var(--text-offer-4-sub--letter-spacing)',
  fontWeight: 'var(--text-offer-4-sub--font-weight)',
  fontStyle: 'var(--text-offer-4-sub--font-style)' as const,
}

function alternatesLines(text: string): [string, string] {
  const normalized = text.trim()
  if (normalized.includes('\n')) {
    const [first, ...rest] = normalized.split('\n')
    return [first.trim(), rest.join(' ').trim()]
  }
  const match = normalized.match(/^Вдохновляющие локации\s+(.+)$/i)
  if (match) {
    return [ALTERNATES_LINE_ONE, match[1].trim()]
  }
  return [ALTERNATES_LINE_ONE, ALTERNATES_LINE_TWO]
}

function offer4Lines(
  text: string,
  subtitle?: string,
): [string, string] {
  const normalized = text.trim()
  if (subtitle !== undefined) {
    return [
      normalized || OFFER4_TITLE_DEFAULT,
      subtitle.trim() || OFFER4_SUBTITLE_DEFAULT,
    ]
  }
  if (normalized.includes('\n')) {
    const [first, ...rest] = normalized.split('\n')
    return [first.trim(), rest.join(' ').trim()]
  }
  return [
    normalized || OFFER4_TITLE_DEFAULT,
    OFFER4_SUBTITLE_DEFAULT,
  ]
}

export type TextOfferProps = {
  text: string
  /** Вторая строка для `variant="offer4"` (подзаголовок) */
  subtitle?: string
  variant?: TextOfferVariant
  className?: string
}

export function TextOffer({
  text,
  subtitle,
  variant = 'montserrat',
  className = '',
}: TextOfferProps) {
  if (variant === 'offer5') {
    const label = text.trim() || OFFER5_TEXT_DEFAULT

    return (
      <section
        className={`flex w-full flex-col bg-surface-black ${className}`.trim()}
        aria-label={label}
      >
        <div
          className="w-full shrink-0 bg-surface-black"
          style={{ height: 'var(--spacing-offer-5-top-spacer)' }}
          aria-hidden
        />

        <div
          className="flex w-full items-center justify-center bg-cover bg-bottom bg-no-repeat"
          style={{
            minHeight: 'var(--size-offer-5-transition-h)',
            paddingLeft: 'var(--spacing-offer-5-inset-x)',
            paddingRight: 'var(--spacing-offer-5-inset-x)',
            paddingBottom: 'var(--spacing-offer-5-content-lift)',
            backgroundImage: `var(--ue-offer-5-transition-gradient), url(${offer5TransitionBg})`,
          }}
        >
          <div
            className="flex w-full max-w-[var(--size-property-container-max)] items-center justify-center"
            style={{ gap: 'var(--spacing-offer-4-title-line-gap)' }}
          >
            <Offer4FadeLine
              side="left"
              lineOffsetVar="--spacing-offer-5-line-offset-y"
              lineShiftXVar="--spacing-offer-5-line-shift-x"
            />
            <p
              className="m-0 max-w-full shrink-0 text-center text-text-primary text-pretty sm:whitespace-nowrap"
              style={offer5Typography}
              lang="ru"
            >
              <span
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 'var(--text-offer-5-company--font-weight)',
                }}
              >
                Компания{' '}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--text-offer-5-brand--font-weight)',
                }}
              >
                Urban Escape
              </span>
            </p>
            <Offer4FadeLine
              side="right"
              lineOffsetVar="--spacing-offer-5-line-offset-y"
              lineShiftXVar="--spacing-offer-5-line-shift-x"
            />
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'offer4') {
    const [title, subtitleLine] = offer4Lines(text, subtitle)

    return (
      <section
        className={`flex w-full flex-col bg-surface-black ${className}`.trim()}
      >
        <div
          className="flex w-full items-center justify-center bg-surface-black px-[var(--spacing-gutter)]"
          style={{
            minHeight: 'var(--spacing-offer-4-text-block-min-h)',
            paddingTop: 'var(--spacing-offer-4-title-pt)',
          }}
        >
          <Offer4TitleRow title={title} />
        </div>

        <div
          className="flex w-full items-center justify-center bg-surface-black"
          style={{
            paddingTop: 'var(--spacing-offer-4-sub-section-py)',
            paddingBottom: 'var(--spacing-offer-4-sub-section-py)',
            paddingLeft: 'var(--spacing-offer-4-sub-inset-x)',
            paddingRight: 'var(--spacing-offer-4-sub-inset-x)',
          }}
        >
          <p
            className="m-0 text-center text-text-primary max-sm:text-pretty sm:whitespace-nowrap"
            style={{
              ...offer4SubTypography,
              maxWidth: 'var(--spacing-offer-max-w-4-sub)',
            }}
            lang="ru"
          >
            {subtitleLine}
          </p>
        </div>
      </section>
    )
  }

  const layout = LAYOUT_BY_VARIANT[variant]
  const textStyle = TEXT_STYLE(layout)

  const sectionPx = layout.paddingXVar
    ? `var(${layout.paddingXVar})`
    : 'var(--spacing-gutter)'

  if (variant === 'alternates') {
    const [lineOne, lineTwo] = alternatesLines(text)

    return (
      <section
        className={`flex w-full flex-col bg-surface-black ${className}`.trim()}
      >
        <div
          className="w-full shrink-0 bg-surface-black"
          style={{ height: 'var(--spacing-offer-alternates-spacer-top)' }}
          aria-hidden
        />

        <div
          className="flex w-full flex-col items-center justify-center bg-surface-black"
          style={{
            paddingTop: 'var(--spacing-offer-alternates-text-pt)',
            paddingBottom: 'var(--spacing-offer-alternates-text-pb)',
            paddingLeft: sectionPx,
            paddingRight: sectionPx,
          }}
        >
          <div
            className="flex w-full flex-col items-center"
            style={{ maxWidth: 'var(--spacing-offer-max-w-alternates)' }}
          >
            <div
              className="flex w-fit max-w-full flex-col items-stretch"
              style={{ gap: 'var(--spacing-offer-alternates-line-to-divider)' }}
            >
              <p
                className="m-0 text-center text-text-primary"
                style={textStyle}
                lang="ru"
              >
                {lineOne}
              </p>
              <OfferAlternatesDivider />
            </div>

            <p
              className="m-0 w-full text-center text-text-primary"
              style={{
                ...textStyle,
                marginTop: 'var(--spacing-offer-alternates-divider-to-line)',
              }}
              lang="ru"
            >
              {lineTwo}
            </p>
          </div>
        </div>

        <div
          className="w-full shrink-0 bg-surface-black"
          style={{ height: 'var(--spacing-offer-alternates-spacer-bottom)' }}
          aria-hidden
        />
      </section>
    )
  }

  return (
    <section
      className={`flex w-full flex-col items-center justify-center bg-surface-black ${className}`.trim()}
      style={{
        paddingTop: `var(${layout.paddingYVar})`,
        paddingBottom: `var(${layout.paddingYVar})`,
        paddingLeft: sectionPx,
        paddingRight: sectionPx,
        minHeight: layout.minHeightVar
          ? `var(${layout.minHeightVar})`
          : undefined,
      }}
    >
      <p
        className="m-0 w-full text-center text-pretty text-text-primary"
        style={{
          ...textStyle,
          maxWidth: `var(${layout.maxWidthVar})`,
          whiteSpace: 'pre-line',
        }}
        lang="ru"
      >
        {text}
      </p>
    </section>
  )
}