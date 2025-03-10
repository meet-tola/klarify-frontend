import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "@/components/ui/card";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { CheckCircle } from "lucide-react";
  
  export default function PricingSection() {
    const plans = [
      {
        name: "Starter",
        monthlyPrice: "$9",
        annualPrice: "$7",
        description: "Perfect for job seekers looking for basic career assistance.",
        features: [
          "AI Resume Review",
          "5 Job Matches per Month",
          "Basic Interview Preparation",
          "Email Support",
        ],
      },
      {
        name: "Professional",
        monthlyPrice: "$19",
        annualPrice: "$15",
        description: "Ideal for professionals actively advancing their careers.",
        features: [
          "AI Resume Optimization",
          "Unlimited Job Matches",
          "Advanced Interview Preparation",
          "Skill Gap Analysis",
          "Priority Support",
        ],
        popular: true,
      },
      {
        name: "Executive",
        monthlyPrice: "$39",
        annualPrice: "$31",
        description: "For senior professionals and executives seeking career growth.",
        features: [
          "Everything in Professional",
          "Executive Resume Writing",
          "Leadership Assessment",
          "1-on-1 Career Coaching Session",
          "Salary Negotiation Guidance",
        ],
      },
    ];
  
    return (
      <section id="pricing" className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground">
              Choose the plan that fits your career advancement needs.
            </p>
          </div>
          <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="monthly">
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`border ${plan.popular ? "border-primary shadow-md" : "shadow-sm"} relative`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                        <Badge className="bg-primary text-primary-foreground">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.monthlyPrice}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="annual">
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`border ${plan.popular ? "border-primary shadow-md" : "shadow-sm"} relative`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                        <Badge className="bg-primary text-primary-foreground">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.annualPrice}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    );
  }