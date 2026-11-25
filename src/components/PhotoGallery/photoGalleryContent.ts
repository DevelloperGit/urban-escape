import galleryCard1 from '../../../assets/gallery-card-1.png'
import galleryCard2 from '../../../assets/gallery-card-2.png'
import galleryCard3 from '../../../assets/gallery-card-3.png'
import gallerySlide1 from '../../../assets/gallery-slide-1.png'
import gallerySlide2 from '../../../assets/gallery-slide-2.png'
import gallerySlide3 from '../../../assets/gallery-slide-3.png'
import gallerySlide4 from '../../../assets/gallery-slide-4.png'
import gallerySlide5 from '../../../assets/gallery-slide-5.png'

export const photoGalleryTopCards = [
  { src: galleryCard1, alt: 'Интерьер ресторана' },
  { src: galleryCard2, alt: 'Зал с панорамным видом' },
  { src: galleryCard3, alt: 'Веранда для мероприятий' },
] as const

export const photoGallerySlides = [
  { src: gallerySlide1, alt: 'Блюдо шеф-повара' },
  { src: gallerySlide2, alt: 'Сервировка стола' },
  { src: gallerySlide3, alt: 'Авторский десерт' },
  { src: gallerySlide4, alt: 'Коктейльная карта' },
  { src: gallerySlide5, alt: 'Ужин при свечах' },
] as const