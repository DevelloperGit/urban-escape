import cardBgDecor from '../../assets/card-bg-decor 1.png'
import propertyMain1 from '../../assets/property-main-1.png'
import propertyMain2 from '../../assets/property-main-2.png'
import propertyMain3 from '../../assets/property-main-3.png'
import propertyMain4 from '../../assets/property-main-4.png'
import type { PropertyCardProps } from '../components/PropertyCard'

/** Контент «Дом 1 / Барнхаус» — Figma 2060:10890, оригиналы property-main-*.png */
export const propertyDom1: PropertyCardProps = {
  title: 'Барнхаус',
  description:
    'для тех, кто ценит современный комфорт\nи\u00a0близость к\u00a0природе',
  capacity: 'ДО 10-х человек',
  decorBackground: propertyMain2,
  decorOverlay: cardBgDecor,
  mainImage: propertyMain1,
  thumbnails: [propertyMain1, propertyMain2, propertyMain3, propertyMain4],
}