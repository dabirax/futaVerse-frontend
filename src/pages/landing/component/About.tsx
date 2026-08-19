import {
  Award,
  Briefcase,
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Mentorship',
    description: 'Connect with experienced alumni for career guidance',
  },
  {
    icon: Briefcase,
    title: 'Internships',
    description: 'Access exclusive internship and NYSC placement opportunities',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Attend workshops, talks, and networking sessions',
  },
  {
    icon: TrendingUp,
    title: 'Reports & Analytics',
    description: 'Track your progress and mentorship journey',
  },
  {
    icon: MessageSquare,
    title: 'Real-time Chat',
    description: 'Stay connected with your mentors and peers',
  },
  {
    icon: Award,
    title: 'Job Shadowing',
    description: 'Gain hands-on experience in your field of interest',
  },
]

const About = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-4 h-px bg-gold" />
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              About FUTAVerse
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
            The verified network for FUTA's community
          </h2>
          <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-2xl">
            FUTAVerse bridges the gap between FUTA alumni and students through
            mentorship, internships, job shadowing, and events, empowering
            mentees through meaningful digital engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 border border-line bg-background hover:border-line-strong transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-indigo bg-indigo-soft flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-indigo" />
                </div>
                <h3 className="font-display text-base font-semibold mb-1.5 text-ink">
                  {feature.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
