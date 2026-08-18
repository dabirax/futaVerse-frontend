import Logo from '@/components/logo'

export function LeftContainer() {
  return (
    <div className="bg-indigo hidden lg:flex lg:w-[42%] flex-col justify-between p-10 lg:p-12 lg:sticky lg:top-0 lg:left-0 lg:self-start lg:min-h-screen relative overflow-hidden">
      {/* Pattern overlay — diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 14px, rgba(255,255,255,0.5) 14px, rgba(255,255,255,0.5) 15px)',
        }}
      />

      {/* Pattern overlay — dots */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Gold accent bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />

      <div className="relative z-10 [&_span]:!text-white">
        <Logo />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-sm">
        <div className="w-8 h-px bg-gold mb-6" />
        <h2 className="font-display text-3xl font-semibold text-white leading-tight mb-4">
          Build your career
          <br />
          with the FUTA network
        </h2>
        <p className="text-white/60 text-sm leading-relaxed">
          Connect with alumni mentors, discover internships, and grow with the
          Federal University of Technology, Akure community.
        </p>
      </div>

      <p className="relative z-10 text-white/30 text-xs font-mono uppercase tracking-widest">
        FUTAVerse
      </p>
    </div>
  )
}
