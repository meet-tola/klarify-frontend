export default function HowItWorksSection() {
    const steps = [
      {
        step: "01",
        title: "Create Your Profile",
        description:
          "Upload your resume or build one from scratch. Our AI analyzes your experience and skills.",
      },
      {
        step: "02",
        title: "Get AI Recommendations",
        description:
          "Receive personalized career insights, job matches, and skill development suggestions.",
      },
      {
        step: "03",
        title: "Apply & Advance",
        description:
          "Apply to jobs with your optimized resume and ace interviews with AI preparation.",
      },
    ];
  
    return (
      <section id="how-it-works" className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AI Career Builder Works
            </h2>
            <p className="text-muted-foreground">
              Our simple three-step process helps you transform your career
              prospects with AI assistance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0"></div>
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }