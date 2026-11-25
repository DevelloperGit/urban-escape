import { AboutSection } from './components/AboutSection'
import { CompanyFutureSection } from './components/CompanyFutureSection'
import { Footer } from './components/Footer/Footer'
import { OwnerDescriptionSection } from './components/OwnerDescriptionSection'
import { FeatureCard } from './components/FeatureCard'
import { BackToHero } from './components/BackToHero'
import { Hero } from './components/Hero'
import { PropertyCard } from './components/PropertyCard'
import { ContactCTA } from './components/ContactCTA'
import { PhotoGallery } from './components/PhotoGallery'
import { PropertyDetailsButton } from './components/PropertyDetailsButton'
import { PropertySectionDecor } from './components/PropertySectionDecor'
import { TextOffer } from './components/TextOffer'
import { VideoSection } from './components/VideoSection'
import { Reveal } from './components/Reveal'
import bgDecor1 from '../assets/Bg decor 1.png'
import bgDecor2 from '../assets/Bg decor 2.png'
import { propertyDom1 } from './content/propertyDom1'
import { propertyDom2 } from './content/propertyDom2'
import { propertyDom3 } from './content/propertyDom3'
import { propertyDom4 } from './content/propertyDom4'

function App() {
  return (
    <main className="min-h-svh w-full min-w-0 overflow-x-clip">
      <Hero />
      <div id="after-hero" className="w-full min-w-0" aria-hidden />
      <Reveal>
        <TextOffer
          variant="montserrat"
          text={'Идеальное место, чтобы отключить\nуведомления и включить чувства'}
        />
      </Reveal>
      <Reveal delay={1}>
        <FeatureCard variant="relaxation" />
      </Reveal>
      <Reveal delay={1}>
        <FeatureCard variant="premium" reversed />
      </Reveal>
      <Reveal>
        <TextOffer
          variant="cuprum"
          text="Ваш идеальный отдых начинается здесь"
        />
      </Reveal>
      <Reveal>
        <VideoSection />
      </Reveal>
      <Reveal>
        <TextOffer
          variant="alternates"
          text="Вдохновляющие локации для незабываемых моментов"
        />
      </Reveal>
      <section id="cottages" className="flex w-full min-w-0 flex-col scroll-mt-6">
        <Reveal>
          <PropertyCard {...propertyDom1} />
        </Reveal>
        <PropertySectionDecor />
        <Reveal>
          <PropertyCard {...propertyDom2} />
        </Reveal>
        <PropertySectionDecor imageSrc={bgDecor2} />
        <Reveal>
          <PropertyCard {...propertyDom3} />
        </Reveal>
        <PropertySectionDecor imageSrc={bgDecor1} />
        <Reveal>
          <PropertyCard {...propertyDom4} />
        </Reveal>
        <Reveal>
          <PropertyDetailsButton />
        </Reveal>
      </section>
      <section id="restaurant" className="flex w-full min-w-0 flex-col scroll-mt-6">
        <Reveal>
          <TextOffer
            variant="jura"
            text="Изысканные вкусы, которые вдохновляют, откройте для себя кулинарное искусство в нашем премиум ресторане."
          />
        </Reveal>
        <Reveal>
          <VideoSection variant="promo2" />
        </Reveal>
        <Reveal>
          <TextOffer
            variant="offer4"
            text="ВЫСОКОКЛАССНАЯ КУХНЯ - ЗАЛОГ НАШЕГО УСПЕХА"
            subtitle="Только специалисты высшей кухни"
          />
        </Reveal>
        <Reveal>
          <PhotoGallery />
        </Reveal>
      </section>
      <Reveal>
        <ContactCTA />
      </Reveal>
      <Reveal>
        <TextOffer variant="offer5" text="Компания Urban Escape" />
      </Reveal>
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <OwnerDescriptionSection />
      </Reveal>
      <Reveal>
        <CompanyFutureSection />
      </Reveal>
      <Footer />
      <BackToHero />
    </main>
  )
}

export default App