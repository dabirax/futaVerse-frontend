import { BookOpen, GraduationCap, ShieldCheck, Users2 } from 'lucide-react'

const roles = [
  {
    title: 'Students',
    tag: 'Students',
    highlight: 'Find your path earlier',
    points: [
      'Find mentors matched to your field',
      'Apply for internships and NYSC placements',
      'Attend alumni-hosted career events',
      'Get real-time feedback on your progress',
      'Build a professional network before you graduate',
    ],
    icon: GraduationCap,
    badgeClass: 'border-indigo text-indigo-on-soft bg-indigo-soft',
    ringColor: 'border-indigo',
  },
  {
    title: 'Alumni',
    tag: 'Alumni',
    highlight: 'Give back with structure',
    points: [
      'Mentor students in your field',
      'Post jobs and internship openings',
      'Host free or paid career events',
      'Track your contribution and impact',
      'Connect with fellow FUTA graduates',
    ],
    icon: Users2,
    badgeClass: 'border-maroon text-maroon-on-soft bg-maroon-soft',
    ringColor: 'border-maroon',
  },
  {
    title: 'Lecturers',
    tag: 'Lecturers',
    highlight: 'Bridge the classroom gap',
    points: [
      'Connect students to industry mentors',
      'Collaborate on research opportunities',
      'Monitor student engagement and growth',
    ],
    icon: BookOpen,
    badgeClass: 'border-gold text-gold-on-soft bg-gold-soft',
    ringColor: 'border-gold',
  },
  {
    title: 'Admins',
    tag: 'Admins',
    highlight: 'Oversee the ecosystem',
    points: [
      'Approve mentors and manage users',
      'Monitor platform activity and reports',
      'Configure events, tickets, and listings',
    ],
    icon: ShieldCheck,
    badgeClass: 'border-green text-green-on-soft bg-green-soft',
    ringColor: 'border-green',
  },
]

const UserRoles = () => {
  return (
    <section className="py-16 lg:py-24 bg-surface border-t border-line" id="roles">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-4 h-px bg-gold" />
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              User Roles
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
            Built for everyone in the FUTA community
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {roles.map((role) => {
            return (
              <div
                key={role.title}
                className="relative border border-line bg-surface p-8 hover:border-line-strong transition-colors"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${role.ringColor} bg-surface shadow-seal`}
                    >
                      <role.icon className="h-5 w-5 text-ink" />
                    </div>
                    <div>
                      <span
                        className={`inline-flex rounded-xs px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider border ${role.badgeClass}`}
                      >
                        {role.tag}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-3">
                    {role.highlight}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-ink-soft">
                    {role.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-indigo" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default UserRoles
