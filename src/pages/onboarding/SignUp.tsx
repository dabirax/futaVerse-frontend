import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { BackButton } from '../../components/BackButton'
import Logo from '@/components/logo'
import { LeftContainer } from './components/LeftContainer'
import { Book, People, Teacher } from 'iconsax-reactjs'

const roles = [
  {
    label: 'Alumnus',
    path: '/signup/alumnusBasic',
    icon: <People size="20" />,
  },
  { label: 'Student', path: '/signup/studentBasic', icon: <Book size="20" /> },
  {
    label: 'Lecturer',
    path: '/signup/lecturerBasic',
    icon: <Teacher size="20" />,
  },
]

const SignUp = () => {
  return (
    <div className="flex flex-col mlg:flex-row w-full max-w-screen mlg:min-h-145 h-screen mlg:h-auto">
      <div className="w-full h-full grid lg:grid-cols-2 z-10">
        <LeftContainer />

        <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6">
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
        </div>
      </div>
    </div>
  )
}

interface RoleCardProps {
  label: string
  path: string
  icon: React.ReactNode
}

const RoleCard = ({ icon, label, path }: RoleCardProps) => (
  <Link to={path}>
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
      cursor-pointer flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 border-zinc-400  hover:border-primary/80 text-zinc-900 hover:text-primary-dark 
    `}
    >
      <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-primary-20`}>
        {icon}
      </div>
      <span className="font-semibold text-lg leading-tight">{label}</span>
    </motion.div>
  </Link>
)

export default SignUp
