import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import studentsIllustration from '@/assets/landing/students-illustration.png'

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#7b2fbe] to-[#4338ca] py-16 lg:py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.1),_transparent_25%)]" />
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative overflow-hidden rounded-[2rem] bg-white/10 p-4 shadow-2xl backdrop-blur-xl lg:p-6">
            <img
              src={studentsIllustration}
              alt="Students learning together"
              className="w-full h-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/90">
              Your next opportunity starts here.
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Your next opportunity{' '}
              <span className="text-[#c4b5fd]">starts here.</span>
            </h2>
            <p className="max-w-xl text-base leading-8 text-white/85">
              Match with experienced alumni, discover internships, and build
              real career momentum from day one.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link to="/signup">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-white text-[#5e0b80] hover:bg-white/90 text-base font-bold"
                >
                  Sign Up as Student
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:border-white hover:text-[#5e0b80] text-base font-bold"
                >
                  Sign Up as Alumni
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-sm text-white/80">
              <div className="rounded-3xl bg-white/10 px-4 py-4">
                <p className="text-2xl font-semibold text-white">500+</p>
                <p>Mentors</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-4 py-4">
                <p className="text-2xl font-semibold text-white">1K+</p>
                <p>Students</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-4 py-4">
                <p className="text-2xl font-semibold text-white">95%</p>
                <p>Success rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
