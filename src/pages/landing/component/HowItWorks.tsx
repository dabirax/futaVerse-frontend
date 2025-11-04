import { Calendar, UserCheck, UserPlus, Video } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      number: "01",
      title: "Register as Student or Alumni",
      description: "Create your profile and join the FUTAVerse community in minutes.",
    },
    {
      icon: UserCheck,
      number: "02",
      title: "Get Matched for Mentorship",
      description: "Our smart matching connects you with the perfect mentor or mentee.",
    },
    {
      icon: Video,
      number: "03",
      title: "Schedule Sessions",
      description: "Book online sessions via Google Meet or arrange in-person meetings.",
    },
    {
      icon: Calendar,
      number: "04",
      title: "Attend Events & Track Progress",
      description: "Participate in events, monitor your growth, and build your network.",
    },
  ];

  return (
    <section id="how-it-works" className="py-8 lg:py-16 gradient-soft">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            How It{" "}
            <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started with FUTAVerse is simple. Follow these four easy steps to begin 
            your mentorship journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Connector Line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-linear-to-r from-primary to-transparent -translate-x-1/2 z-0" />
                )}

                <div className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft hover:-translate-y-2 z-10">
                  {/* Step Number */}
                  <div className="text-6xl font-black text-primary/10 absolute top-4 right-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-20">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 relative z-20">{step.title}</h3>
                  <p className="text-muted-foreground relative z-20">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
