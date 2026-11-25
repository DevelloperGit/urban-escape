import cardBgDecor from '../../assets/card-bg-decor 2.png'
import guestHouseBg from '../../assets/guest-house-bg.png'
import guestHouse1 from '../../assets/guest-house1.png'
import guestHouse2 from '../../assets/guest-house2.png'
import guestHouse3 from '../../assets/guest-house3.png'
import guestHouse4 from '../../assets/guest-house4.png'
import type { PropertyCardProps } from '../components/PropertyCard'

/** Контент «дом 2 / Номер в гостевом доме» — Figma 2060:10920, card-bg-decor 2 (2060:10921) */
export const propertyDom2: PropertyCardProps = {
  title: 'НОМЕР В ГОСТЕВОМ ДОМЕ',
  description: 'Атмосфера тепла и заботы для зимнего отдыха',
  capacity: 'ДО 5-х человек',
  decorBackground: guestHouseBg,
  decorOverlay: cardBgDecor,
  /** Figma 2060:10922 imageTransform ~26.6% по Y */
  decorBackgroundPosition: 'center 27%',
  decorOverlayPosition: 'center 27%',
  decorSideGradient:
    'linear-gradient(90deg, rgb(0 0 0 / 0) 28%, rgb(0 0 0 / 0.58) 68%, rgb(0 0 0 / 0.82) 100%)',
  mainImage: guestHouse3,
  thumbnails: [guestHouse3, guestHouse1, guestHouse2, guestHouse4],
}