import Header from "@/components/header";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import InteractiveTools from "@/components/home/interactive-tools";
import SuccessStories from "@/components/home/success-stories";
import CTASection from "@/components/home/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <InteractiveTools />
      <SuccessStories />
      <CTASection />
      <Footer />
    </div>
  );
}
