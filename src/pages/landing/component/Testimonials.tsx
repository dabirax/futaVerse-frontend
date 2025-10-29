import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Through FUTAVerse, I found a mentor who helped me secure my NYSC placement at a top tech company. The guidance was invaluable!",
      author: "Ayomide Ogunleye",
      role: "Computer Engineering, Class of 2023",
      gradient: "from-primary to-primary-dark",
    },
    {
      quote: "As an alumnus, giving back through FUTAVerse has been incredibly rewarding. Seeing my mentees grow professionally makes it all worthwhile.",
      author: "Dr. Chioma Nwankwo",
      role: "Software Engineer, Class of 2015",
      gradient: "from-secondary to-secondary-light",
    },
    {
      quote: "The internship I got through FUTAVerse connections opened doors I never thought possible. Forever grateful to this platform!",
      author: "Ibrahim Adeyemi",
      role: "Mechanical Engineering, Class of 2024",
      gradient: "from-accent to-accent-light",
    },
  ];

  return (
    <section id="testimonials" className="py-8 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Success{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from students and alumni whose lives have been transformed through FUTAVerse.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${testimonial.gradient} flex items-center justify-center`}>
                  <Quote className="w-6 h-6 text-white" />
                </div>

                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
