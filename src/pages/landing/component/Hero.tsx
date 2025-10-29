import { Button } from "@/components/ui/button";
import heroImage from "@/assets/landing/hero-collaboration.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 lg:pt-0 ">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-soft -z-10" />
      
      {/* Decorative Elements */}
      <div className="absolute  right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-2 animate-fade-up">
            <h1 className="text-3xl md:text-3xl lg:text-4xl font-black leading-tight">
              Connecting FUTA Alumni and Students —{" "}
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Building Futures Together
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Mentorship. Internships. Events. Real connections that shape careers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="lg" className="shadow-purple">
                Join as Student
              </Button>
              <Button variant="outline" size="lg">
                Join as Alumni
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Alumni Mentors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">1000+</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">50+</p>
                <p className="text-sm text-muted-foreground">Events Yearly</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-up">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
            <img
              src={heroImage}
              alt="FUTA students and alumni collaborating"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
