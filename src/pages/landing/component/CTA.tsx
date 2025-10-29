import { Button } from "@/components/ui/button";
import studentsIllustration from "@/assets/landing/students-illustration.png";

const CTA = () => {
  return (
    <section className="py-8 lg:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary-dark opacity-95" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Illustration */}
          <div className="hidden lg:block">
            <img
              src={studentsIllustration}
              alt="Students learning together"
              className="w-full h-auto drop-shadow-2xl rounded-2xl"
            />
          </div>

          {/* Right - CTA Content */}
          <div className="text-center lg:text-left space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Join the FUTAVerse Community Today
            </h2>
            
            <p className="text-lg text-white/90 max-w-xl">
              Connect with mentors, discover opportunities, and build the career you've always 
              dreamed of. Your journey starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="secondary"
                size="lg"
                className="shadow-green text-base font-bold"
              >
                Sign Up as Student
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary text-base font-bold"
              >
                Sign Up as Alumni
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
              <div className="text-white/90">
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm">Active Mentors</p>
              </div>
              <div className="text-white/90">
                <p className="text-2xl font-bold">1000+</p>
                <p className="text-sm">Students Helped</p>
              </div>
              <div className="text-white/90">
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
