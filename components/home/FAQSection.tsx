import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export default function FAQSection() {
    const faqs = [
      {
        question: "How does the AI resume optimization work?",
        answer:
          "Our AI analyzes your resume against job descriptions to identify relevant skills and experience. It then suggests improvements to highlight your qualifications and increase your chances of getting interviews.",
      },
      {
        question: "Can I cancel my subscription at any time?",
        answer:
          "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your billing period.",
      },
      {
        question: "How accurate is the AI interview preparation?",
        answer:
          "Our AI interview preparation is trained on thousands of real interview questions across various industries. It simulates realistic interview scenarios and provides feedback on your responses to help you improve.",
      },
      {
        question: "Is my data secure and private?",
        answer:
          "Yes, we take data security and privacy seriously. Your personal information and resume data are encrypted and never shared with third parties without your explicit consent.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 14-day money-back guarantee if you're not satisfied with our service. Simply contact our support team within 14 days of your purchase.",
      },
      {
        question: "Can I use AI Career Builder if I'm changing industries?",
        answer:
          "Our AI is especially helpful for career changers. It identifies transferable skills and helps you position your experience effectively for roles in new industries.",
      },
    ];
  
    return (
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our AI Career Builder
              platform.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  }