import About from './component/About'
import Header from './Header'
import Hero from './component/Hero'
import HowItWorks from './component/HowItWorks'
import Features from './component/Features'
import UserRoles from './component/UserRoles'
import CTA from './component/CTA'
import Footer from './component/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Features />
        <UserRoles />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
