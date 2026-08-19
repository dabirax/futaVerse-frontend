import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import futaLogo from '@/assets/landing/futa_logo_bgless.png'
import fvLogo from '@/assets/logos/FV_logo_backgroundless.png'

const heroCards = [
  {
    initials: 'TK',
    name: 'Tunde Kelani',
    role: 'Software Engineer · Lagos',
    badge: 'Mentor',
    badgeClass: 'border-indigo text-indigo bg-indigo-soft',
    ringColor: 'border-indigo',
  },
  {
    initials: 'AM',
    name: 'Amaka Musa',
    role: 'CS Year 3 · Applied to internship',
    badge: 'Accepted',
    badgeClass: 'border-green text-green bg-green-soft',
    ringColor: 'border-green',
  },
  {
    initials: 'EO',
    name: 'Emeka Obi',
    role: 'FinTech Lead · Hosting event',
    badge: 'Fri 4pm',
    badgeClass: 'border-maroon text-maroon bg-maroon-soft',
    ringColor: 'border-maroon',
  },
]

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Federal University of Technology, Akure
            </p>
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-[1.08]">
              Where alumni <span className="text-indigo">shape careers</span>{' '}
              that last.
            </h1>
            <p className="max-w-xl text-base text-ink-soft leading-relaxed">
              Mentorship, internships, job openings, and events, all in one
              place, built for the FUTA community.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/signup/studentBasic" className="w-full sm:w-auto">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Join as a student
                </Button>
              </Link>
              <Link to="/signup/alumnusBasic" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Join as alumni
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 pt-4 sm:pt-6">
              <div>
                <p className="font-mono text-xl sm:text-2xl font-medium text-ink tabular-nums">
                  100k+
                </p>
                <p className="text-[11px] sm:text-xs text-ink-soft mt-0.5">
                  Alumni
                </p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-medium text-ink tabular-nums">
                  30k+
                </p>
                <p className="text-[11px] sm:text-xs text-ink-soft mt-0.5">
                  Students
                </p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-medium text-ink tabular-nums">
                  200+
                </p>
                <p className="text-[11px] sm:text-xs text-ink-soft mt-0.5">
                  Events yearly
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <img
                src={futaLogo}
                alt="FUTA"
                className="max-w-[80px] sm:max-w-[140px] p-1 sm:p-2"
              />
              <span className="text-gold font-display text-3xl sm:text-6xl font-bold">
                ×
              </span>
              <img
                src={fvLogo}
                alt="FUTAVerse"
                className="max-w-[60px] sm:max-w-[144px]"
              />
            </div>
            {heroCards.map((card, index) => (
              <div
                key={index}
                className="border border-line bg-surface p-3 sm:p-5 shadow-xs"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border-2 ${card.ringColor} bg-surface shadow-seal`}
                  >
                    <span className="font-display text-[10px] sm:text-xs font-semibold text-ink">
                      {card.initials}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-ink">
                      {card.name}
                    </p>
                    <p className="text-[11px] sm:text-xs text-ink-soft truncate">
                      {card.role}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-xs px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider border ${card.badgeClass}`}
                  >
                    {card.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
