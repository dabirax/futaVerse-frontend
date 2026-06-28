import {
  Briefcase,
  Calendar,
  Check,
  MessageCircle,
  BarChart3,
  Eye,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const Features = () => {
  const features = [
    {
      icon: Check,
      title: 'Mentorship',
      description:
        'Connect with alumni matched to your field and career goals.',
      gradient: 'from-primary to-primary-dark',
    },
    {
      icon: Briefcase,
      title: 'Internships and jobs',
      description: 'Verified opportunities posted by FUTA alumni and partners.',
      gradient: 'from-accent to-accent-light',
    },
    {
      icon: Calendar,
      title: 'Events and tickets',
      description:
        'Career talks, workshops, and networking — free or ticketed.',
      gradient: 'from-accent to-primary',
    },
    {
      icon: MessageCircle,
      title: 'Real-time chat',
      description:
        'Stay connected with mentors and peers without leaving the platform.',
      gradient: 'from-primary to-accent',
    },
    {
      icon: BarChart3,
      title: 'Reports and analytics',
      description: 'Track mentorship progress, event attendance, and outcomes.',
      gradient: 'from-primary-dark to-primary',
    },
    {
      icon: Eye,
      title: 'Job shadowing',
      description:
        'Gain hands-on experience alongside professionals in your field.',
      gradient: 'from-accent-light to-accent',
    },
  ]

  return (
    <section id="features" className="py-10 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Core{' '}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to build meaningful connections and advance your
            career.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${feature.gradient}`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
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
