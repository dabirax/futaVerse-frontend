import { Link } from '@tanstack/react-router'
import { CircleCheckBig } from 'lucide-react'
import { LeftContainer } from './components/LeftContainer'
import { Button } from '@/components/ui/button'

const ResetSuccess = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftContainer />
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 bg-background">
        <div className="w-full max-w-md flex flex-col items-center text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 rounded-full bg-green-soft flex items-center justify-center mb-6 animate-in fade-in duration-700">
            <CircleCheckBig className="text-green" size={32} />
          </div>

          <h1 className="font-display text-2xl font-semibold text-ink tracking-tight mb-2">
            All Set!
          </h1>
          <p className="text-ink-soft text-sm leading-relaxed max-w-xs mb-8">
            Your password has been successfully reset. You can now sign in to
            your Futaverse account.
          </p>

          <Link to="/login" className="w-full max-w-xs">
            <Button className="w-full h-10">Back to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetSuccess
