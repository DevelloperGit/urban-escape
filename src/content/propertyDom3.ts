import cardBgDecor from '../../assets/card-bg-decor 3.png'
import cottage1 from '../../assets/cottage-1.png'
import cottage2 from '../../assets/cottage-2.png'
import cottage3 from '../../assets/cottage-3.png'
import cottage4 from '../../assets/cottage-4.png'
import type { PropertyCardProps } from '../components/PropertyCard'

/** Контент «дом 3 / Коттедж» — Figma 2060:10953, card-bg-decor 3 (2060:10954) */
export const propertyDom3: PropertyCardProps = {
  title: 'КОТТЕДЖ',
  description:
    'Идеально подойдёт для большой семьи\nили компании друзей',
  capacity: 'ДО 4/10/14/24-х человек',
  decorBackground: cottage1,
  decorOverlay: cardBgDecor,
  /** Figma 2060:10955 imageTransform ~53% по Y */
  decorBackgroundPosition: 'center 53%',
  decorOverlayPosition: 'center 53%',
  decorSideGradient:
    'linear-gradient(90deg, rgb(0 0 0 / 0) 28%, rgb(0 0 0 / 0.58) 68%, rgb(0 0 0 / 0.82) 100%)',
  mainImage: cottage1,
  thumbnails: [cottage1, cottage2, cottage3, cottage4],
}