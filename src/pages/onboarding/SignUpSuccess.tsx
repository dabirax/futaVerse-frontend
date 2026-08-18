import { Link } from '@tanstack/react-router'
import { CircleCheckBig } from 'lucide-react'
import { LeftContainer } from './components/LeftContainer'
import { Button } from '@/components/ui/button'

const SignupSuccess = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftContainer />
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 bg-background">
        <div className="w-full max-w-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-soft flex items-center justify-center mb-6 animate-in fade-in duration-500">
            <CircleCheckBig className="text-green" size={32} />
          </div>

          <h2 className="font-display text-2xl font-semibold text-ink mb-3">
            Signup Successful!
          </h2>
          <p className="text-ink-soft text-sm leading-relaxed max-w-xs mb-8">
            Welcome to Futaverse. Your account has been created successfully.
            You can now access the network.
          </p>

          <Link to="/login" className="w-full max-w-xs">
            <Button className="w-full bg-indigo text-white rounded-sm h-10 px-8 font-medium hover:bg-indigo-hover transition-colors">
              Login to Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupSuccess
