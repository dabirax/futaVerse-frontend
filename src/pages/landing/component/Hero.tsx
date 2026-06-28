import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

const heroCards = [
  {
    initials: 'TK',
    name: 'Tunde Kelani',
    role: 'Software Engineer · Lagos',
    badge: 'Mentor',
    badgeClass: 'bg-[#ede9fe] text-[#7b2fbe]',
  },
  {
    initials: 'AM',
    name: 'Amaka Musa',
    role: 'CS Year 3 · Applied to internship',
    badge: 'Accepted',
    badgeClass: 'bg-[#d1fae5] text-[#065f46]',
  },
  {
    initials: 'EO',
    name: 'Emeka Obi',
    role: 'FinTech Lead · Hosting event',
    badge: 'Fri 4pm',
    badgeClass: 'bg-[#fef3c7] text-[#92400e]',
  },
]

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f7f5ff] pt-28 pb-16">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#ede9fe]/80 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Where alumni <span className="text-[#7b2fbe]">shape careers</span>{' '}
              that last.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Mentorship, internships, job openings, and events — all in one
              place, built for the FUTA community.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/signup">
                <Button variant="gradient" size="lg">
                  Join as a student
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg">
                  Join as alumni
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div>
                <p className="text-3xl font-bold text-[#7b2fbe]">500+</p>
                <p className="text-sm text-slate-500">Alumni mentors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#16a34a]">1,000+</p>
                <p className="text-sm text-slate-500">Students</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#c2410c]">50+</p>
                <p className="text-sm text-slate-500">Events yearly</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {heroCards.map((card, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ede9fe] text-sm font-bold text-[#7b2fbe]">
                    {card.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{card.name}</p>
                    <p className="text-sm text-slate-500">{card.role}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${card.badgeClass}`}
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
