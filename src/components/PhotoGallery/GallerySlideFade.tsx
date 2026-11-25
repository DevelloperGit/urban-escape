import { OpacityCrossfade } from '../OpacityCrossfade'

type GallerySlideFadeProps = {
  src: string
  alt: string
}

export function GallerySlideFade({ src, alt }: GallerySlideFadeProps) {
  return <OpacityCrossfade src={src} alt={alt} />
}