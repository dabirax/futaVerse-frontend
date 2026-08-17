import { Link } from '@tanstack/react-router'
<<<<<<< HEAD
import { GraduationCap, Users, BookOpen } from 'lucide-react'
import { LeftContainer } from './components/LeftContainer'
=======
import { Book, People, Teacher } from 'iconsax-reactjs'
import { AuthLayout } from './components/AuthLayout'
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
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
<<<<<<< HEAD
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
=======
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 md:p-12"
      >
        <div className="flex items-center justify-between w-full mb-8">
          <div className="transition-transform hover:-translate-x-1">
            <BackButton />
          </div>
          <Logo />
>>>>>>> 76ecc3b88df676a5c0eb95fbea198d527233cd52
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-primary-dark">
            Join the Network
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Select your role to get started
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {roles.map((role) => (
            <RoleCard
              key={role.path}
              label={role.label}
              icon={role.icon}
              path={role.path}
            />
          ))}
        </div>

        <div className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  )
}

export default SignUp
