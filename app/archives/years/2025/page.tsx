import Footer from './components/Footer'
import HeroSection from './components/HeroSection'

export default function Exhibition2025Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <section className="flex w-full flex-col items-center gap-10">
        <HeroSection />
      </section>
      <Footer />
    </div>
  )
}
