import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Tech Innovations Inc.",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The AI resume optimization helped me highlight the right skills for tech roles. I landed 3 interviews in my first week and got my dream job!",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "Global Brands",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The interview preparation was game-changing. The AI simulated exactly the types of questions I faced in my actual interviews.",
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      company: "Analytics Co.",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The skill gap analysis helped me identify exactly what I needed to learn to transition into data science. Worth every penny!",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-muted-foreground">
            Hear from professionals who transformed their careers with our
            AI-powered platform.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="rounded-full overflow-hidden w-12 h-12">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}