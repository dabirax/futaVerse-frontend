import { Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        'Through FUTAVerse, I found a mentor who helped me secure my NYSC placement at a top tech company. The guidance was invaluable!',
      author: 'Ayomide Ogunleye',
      role: 'Computer Engineering, Class of 2023',
      ringColor: 'border-indigo',
    },
    {
      quote:
        'As an alumnus, giving back through FUTAVerse has been incredibly rewarding. Seeing my mentees grow professionally makes it all worthwhile.',
      author: 'Dr. Chioma Nwankwo',
      role: 'Software Engineer, Class of 2015',
      ringColor: 'border-maroon',
    },
    {
      quote:
        'The internship I got through FUTAVerse connections opened doors I never thought possible. Forever grateful to this platform!',
      author: 'Ibrahim Adeyemi',
      role: 'Mechanical Engineering, Class of 2024',
      ringColor: 'border-indigo',
    },
  ]

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-4 h-px bg-gold" />
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Testimonials
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
            Success stories
          </h2>
          <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-2xl">
            Hear from students and alumni whose lives have been transformed
            through FUTAVerse.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group border border-line bg-surface hover:border-line-strong transition-colors"
            >
              <CardContent className="p-6 space-y-4">
                <div
                  className={`w-10 h-10 rounded-full border-2 ${testimonial.ringColor} bg-surface shadow-seal flex items-center justify-center`}
                >
                  <Quote className="w-4 h-4 text-ink-soft" />
                </div>

                <p className="text-sm text-ink-soft leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-line">
                  <p className="font-semibold text-sm text-ink">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-ink-soft mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
