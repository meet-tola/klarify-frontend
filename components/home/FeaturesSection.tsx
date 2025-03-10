import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  Users,
  BriefcaseBusiness,
  Award,
  Star,
  CheckCircle,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "AI Resume Optimization",
      description:
        "Our AI analyzes your resume against job descriptions to highlight relevant skills and experience.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Interview Preparation",
      description:
        "Practice with our AI interviewer that simulates real interviews and provides feedback.",
    },
    {
      icon: <BriefcaseBusiness className="h-10 w-10 text-primary" />,
      title: "Personalized Job Matching",
      description:
        "Discover opportunities that align with your skills, experience, and career goals.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Skill Gap Analysis",
      description:
        "Identify skills you need to develop to reach your career goals and get personalized learning paths.",
    },
    {
      icon: <Star className="h-10 w-10 text-primary" />,
      title: "Salary Insights",
      description:
        "Get data-driven salary recommendations based on your experience, location, and industry.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Career Path Planning",
      description:
        "Map out your long-term career trajectory with AI-generated recommendations and milestones.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Supercharge Your Career Journey
          </h2>
          <p className="text-muted-foreground">
            Our AI-powered platform provides all the tools you need to
            advance your career with confidence.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}