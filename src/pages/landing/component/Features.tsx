import { BarChart3, Briefcase, Calendar, Check, Gift, MessageCircle, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Check,
      title: "Mentor–Mentee Matching",
      description: "Smart algorithm pairs students with the right alumni mentors based on interests and career goals.",
      gradient: "from-primary to-primary-dark",
    },
    {
      icon: Briefcase,
      title: "Internship & NYSC Placement",
      description: "Access exclusive internship opportunities and NYSC placement guidance from experienced alumni.",
      gradient: "from-secondary to-secondary-light",
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat & Scheduling",
      description: "Seamless communication with integrated Google Meet and Calendar for easy session booking.",
      gradient: "from-accent to-accent-light",
    },
    {
      icon: Calendar,
      title: "Alumni Events & Networking",
      description: "Attend workshops, career talks, and networking events hosted by successful alumni.",
      gradient: "from-primary to-accent",
    },
    {
      icon: BarChart3,
      title: "Reports & Feedback Analytics",
      description: "Track your mentorship progress with detailed reports and performance analytics.",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Gift,
      title: "Alumni Donations & Support",
      description: "Alumni can contribute to student development through sponsorships and donations.",
      gradient: "from-accent to-secondary",
    },
    {
      icon: Shield,
      title: "Admin Oversight Tools",
      description: "Comprehensive admin dashboard for managing users, approving mentors, and monitoring activities.",
      gradient: "from-primary-dark to-secondary",
    },
  ];

  return (
    <section id="features" className="py-8 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Core{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to build meaningful connections and advance your career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
