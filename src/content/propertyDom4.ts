import cardBgDecor from '../../assets/card-bg-decor 4.png'
import camping1 from '../../assets/camping-1.png'
import camping2 from '../../assets/camping-2.png'
import camping3 from '../../assets/camping-3.png'
import camping4 from '../../assets/camping-4.png'
import type { PropertyCardProps } from '../components/PropertyCard'

/** Контент «дом 4 / Кэмпинг» — Figma 2060:11019, card-bg-decor 4 (2060:11020) */
export const propertyDom4: PropertyCardProps = {
  title: 'КЭМПИНГ',
  description:
    'Для любителей настоящей свободы\nи\u00a0единения с\u00a0природой',
  capacity: 'ДО 15-х человек',
  decorBackground: camping2,
  decorOverlay: cardBgDecor,
  /** Figma 2060:11021 imageTransform ~54.5% по Y */
  decorBackgroundPosition: 'center 55%',
  decorOverlayPosition: 'center 55%',
  decorSideGradient:
    'linear-gradient(90deg, rgb(0 0 0 / 0) 28%, rgb(0 0 0 / 0.58) 68%, rgb(0 0 0 / 0.82) 100%)',
  mainImage: camping1,
  thumbnails: [camping1, camping2, camping3, camping4],
}