import { Award, Briefcase, Calendar, MessageSquare, TrendingUp, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Mentorship",
      description: "Connect with experienced alumni for career guidance",
    },
    {
      icon: Briefcase,
      title: "Internships",
      description: "Access exclusive internship and NYSC placement opportunities",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Attend workshops, talks, and networking sessions",
    },
    {
      icon: TrendingUp,
      title: "Reports & Analytics",
      description: "Track your progress and mentorship journey",
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Stay connected with your mentors and peers",
    },
    {
      icon: Award,
      title: "Job Shadowing",
      description: "Gain hands-on experience in your field of interest",
    },
  ];

  return (
    <section id="about" className="py-8 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            About{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              FUTAVerse
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            FUTAVerse bridges the gap between FUTA alumni and students through mentorship, 
            internships, job shadowing, and events — empowering mentees through meaningful 
            digital engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
