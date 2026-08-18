import { Link } from '@tanstack/react-router'
import { GraduationCap, Users, BookOpen } from 'lucide-react'
import { LeftContainer } from './components/LeftContainer'
import { BackButton } from '@/components/BackButtons'

const roles = [
  {
    label: 'Student',
    description: 'Currently enrolled at FUTA',
    path: '/signup/studentBasic',
    icon: <BookOpen size={18} />,
    color: 'border-indigo text-indigo bg-indigo-soft',
  },
  {
    label: 'Alumnus',
    description: 'FUTA graduate or alumni',
    path: '/signup/alumnusBasic',
    icon: <GraduationCap size={18} />,
    color: 'border-maroon text-maroon bg-maroon-soft',
  },
  {
    label: 'Lecturer',
    description: 'Faculty or staff member',
    path: '/signup/lecturerBasic',
    icon: <Users size={18} />,
    color: 'border-gold text-gold bg-gold-soft',
  },
]

const SignUp = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftContainer />

      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 bg-background">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <BackButton />
          </div>

          <div className="mb-8">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Join the Network
            </h1>
            <p className="text-ink-soft text-sm mt-2">
              Select your role to get started
            </p>
          </div>

          <div className="space-y-3">
            {roles.map((role) => (
              <Link key={role.path} to={role.path}>
                <div className="flex items-center gap-4 p-4 border border-line bg-surface rounded-xs hover:border-line-strong transition-colors cursor-pointer group">
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full border ${role.color}`}
                  >
                    {role.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-ink group-hover:text-indigo transition-colors">
                      {role.label}
                    </p>
                    <p className="text-xs text-ink-soft">{role.description}</p>
                  </div>
                  <span className="text-ink-faint text-xs">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-ink-soft mt-8">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo font-semibold hover:text-indigo-hover transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
