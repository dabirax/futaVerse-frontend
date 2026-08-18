import { Calendar, UserCheck, UserPlus, Video } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Register as Student or Alumni',
    description:
      'Create your profile and join the FUTAVerse community in minutes.',
    ringColor: 'border-indigo',
    iconColor: 'text-indigo',
    iconBg: 'bg-indigo-soft',
  },
  {
    icon: UserCheck,
    number: '02',
    title: 'Get Matched for Mentorship or Internships',
    description:
      'Our smart matching connects you with the perfect mentorship or internship opportunity.',
    ringColor: 'border-maroon',
    iconColor: 'text-maroon',
    iconBg: 'bg-maroon-soft',
  },
  {
    icon: Video,
    number: '03',
    title: 'Schedule Sessions',
    description:
      'Book online sessions via Google Meet or arrange in-person meetings.',
    ringColor: 'border-gold',
    iconColor: 'text-gold',
    iconBg: 'bg-gold-soft',
  },
  {
    icon: Calendar,
    number: '04',
    title: 'Attend Events & Track Progress',
    description:
      'Participate in events, monitor your growth, and build your network.',
    ringColor: 'border-green',
    iconColor: 'text-green',
    iconBg: 'bg-green-soft',
  },
]

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 lg:py-24 bg-surface-2 border-t border-line"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-4 h-px bg-gold" />
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              How It Works
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
            Getting started is simple
          </h2>
          <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-2xl">
            Follow these four steps to begin your mentorship journey with FUTA
            alumni.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector Line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-line -translate-x-1/2 z-0" />
                )}

                <div className="relative bg-surface border border-line p-6 z-10 hover:border-line-strong transition-colors">
                  <div className="font-mono text-[2.5rem] font-medium text-indigo/10 absolute top-4 right-4 leading-none">
                    {step.number}
                  </div>

                  <div
                    className={`w-10 h-10 rounded-full border ${step.ringColor} ${step.iconBg} flex items-center justify-center mb-4 relative z-20`}
                  >
                    <Icon className={`w-4 h-4 ${step.iconColor}`} />
                  </div>

                  <h3 className="font-display text-base font-semibold mb-2 relative z-20 text-ink">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink-soft relative z-20 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
