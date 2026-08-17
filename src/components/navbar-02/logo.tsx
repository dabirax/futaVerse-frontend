import logo from '@/assets/logos/FV_logo_backgroundless.png'

export const Logo = () => (
  <div className="flex items-center gap-2">
    <img src={logo} alt="FUTAVerse" className="h-10 w-auto" />
    <span className="font-montserrat font-bold text-2xl tracking-tight bg-linear-to-r from-primary-dark to-accent bg-clip-text text-transparent">
      FUTAVerse
    </span>
  </div>
)
