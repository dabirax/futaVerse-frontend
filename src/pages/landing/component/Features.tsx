import {
  BarChart3,
  Briefcase,
  Calendar,
  Check,
  Eye,
  MessageCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Check,
    title: 'Mentorship',
    description: 'Connect with alumni matched to your field and career goals.',
    ringColor: 'border-indigo',
    iconColor: 'text-indigo',
    iconBg: 'bg-indigo-soft',
  },
  {
    icon: Briefcase,
    title: 'Internships and jobs',
    description: 'Verified opportunities posted by FUTA alumni and partners.',
    ringColor: 'border-maroon',
    iconColor: 'text-maroon',
    iconBg: 'bg-maroon-soft',
  },
  {
    icon: Calendar,
    title: 'Events and tickets',
    description: 'Career talks, workshops, and networking — free or ticketed.',
    ringColor: 'border-gold',
    iconColor: 'text-gold',
    iconBg: 'bg-gold-soft',
  },
  {
    icon: MessageCircle,
    title: 'Real-time chat',
    description:
      'Stay connected with mentors and peers without leaving the platform.',
    ringColor: 'border-green',
    iconColor: 'text-green',
    iconBg: 'bg-green-soft',
  },
  {
    icon: BarChart3,
    title: 'Reports and analytics',
    description: 'Track mentorship progress, event attendance, and outcomes.',
    ringColor: 'border-indigo',
    iconColor: 'text-indigo',
    iconBg: 'bg-indigo-soft',
  },
  {
    icon: Eye,
    title: 'Job shadowing',
    description:
      'Gain hands-on experience alongside professionals in your field.',
    ringColor: 'border-maroon',
    iconColor: 'text-maroon',
    iconBg: 'bg-maroon-soft',
  },
]

const Features = () => {
  return (
    <section
      id="features"
      className="py-16 lg:py-24 bg-background border-t border-line"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-4 h-px bg-gold" />
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Core Features
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
            Everything you need to build connections
          </h2>
          <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-2xl">
            Advance your career with verified mentorship, opportunities, and
            events.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group border border-line bg-surface hover:border-line-strong transition-colors"
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border ${feature.ringColor} ${feature.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-ink mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
