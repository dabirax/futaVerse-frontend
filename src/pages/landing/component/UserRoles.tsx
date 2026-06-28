import { BookOpen, GraduationCap, ShieldCheck, Users2 } from 'lucide-react'

const roles = [
  {
    title: 'Students',
    tag: 'Mentees',
    highlight: 'Find your path earlier',
    points: [
      'Find mentors matched to your field',
      'Apply for internships and NYSC placements',
      'Attend alumni-hosted career events',
      'Get real-time feedback on your progress',
      'Build a professional network before you graduate',
    ],
    icon: GraduationCap,
    color: 'from-[#ede9fe] to-[#d8b4fe]',
  },
  {
    title: 'Alumni',
    tag: 'Mentors',
    highlight: 'Give back with structure',
    points: [
      'Mentor students in your field',
      'Post jobs and internship openings',
      'Host free or paid career events',
      'Track your contribution and impact',
      'Connect with fellow FUTA graduates',
    ],
    icon: Users2,
    color: 'from-[#d1fae5] to-[#86efac]',
  },
  {
    title: 'Lecturers',
    tag: 'Partners',
    highlight: 'Bridge the classroom gap',
    points: [
      'Connect students to industry mentors',
      'Collaborate on research opportunities',
      'Monitor student engagement and growth',
    ],
    icon: BookOpen,
    color: 'from-[#dbeafe] to-[#bfdbfe]',
  },
  {
    title: 'Admins',
    tag: 'Operators',
    highlight: 'Oversee the ecosystem',
    points: [
      'Approve mentors and manage users',
      'Monitor platform activity and reports',
      'Configure events, tickets, and listings',
    ],
    icon: ShieldCheck,
    color: 'from-[#fef3c7] to-[#fde68a]',
  },
]

const UserRoles = () => {
  return (
    <section className="py-10 lg:py-16 bg-[#f8f5ff]" id="roles">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7b2fbe]">
            User roles
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950">
            Built for everyone in the FUTA community
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <div
                key={role.title}
                className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`absolute top-0 right-0 h-32 w-32 rounded-bl-[80px] bg-gradient-to-br ${role.color} opacity-40`}
                />
                <div className="relative z-10">
                  <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    {role.tag}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-slate-950">
                    {role.highlight}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {role.title === 'Students'
                      ? 'Student benefits include mentorship, internships, and networking that accelerate your career launch.'
                      : ''}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600">
                    {role.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#7b2fbe]/10 text-[#7b2fbe] text-xs font-semibold">
                          ✓
                        </span>
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
