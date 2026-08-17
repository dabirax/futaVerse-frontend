import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import studentsIllustration from '@/assets/landing/students-illustration.png'

const stats = [
  { value: '500+', label: 'Mentors' },
  { value: '1K+', label: 'Students' },
  { value: '95%', label: 'Success rate' },
]

const CTA = () => {
  return (
    <section className="py-16 lg:py-24 bg-surface border-t border-line">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative overflow-hidden border border-line bg-surface-2 aspect-[4/3] lg:aspect-auto lg:h-full">
            <img
              src={studentsIllustration}
              alt="Students learning together"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-px bg-gold" />
              <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                Join the Network
              </p>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
              Your next opportunity starts here.
            </h2>
            <p className="max-w-xl text-base text-ink-soft leading-relaxed">
              Match with experienced alumni, discover internships, and build
              real career momentum from day one.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/signup/studentBasic" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Sign Up as Student
                </Button>
              </Link>
              <Link to="/signup/alumnusBasic" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign Up as Alumni
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-line bg-background px-4 py-4 text-center"
                >
                  <p className="font-mono text-xl font-medium text-ink tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs text-ink-soft mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
