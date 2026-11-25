import defaultDecorSrc from '../../../assets/property-section-decor.png'

type PropertySectionDecorProps = {
  imageSrc?: string
}

/** Переход между карточками объектов — Figma BG decor / Bg decor 3 (2060:10982) */
export function PropertySectionDecor({
  imageSrc = defaultDecorSrc,
}: PropertySectionDecorProps) {
  return (
    <div className="flex w-full justify-center bg-surface-black" aria-hidden>
      <div
        className="w-full max-w-[var(--size-property-container-max)] bg-cover bg-center bg-no-repeat"
        style={{
          height: 'var(--size-property-section-decor-h)',
          backgroundImage: `url(${imageSrc})`,
        }}
      />
    </div>
  )
}