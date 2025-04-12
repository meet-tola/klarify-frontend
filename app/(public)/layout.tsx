import CommunityBanner from "@/components/community-banner";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background">
      <Header />
      {children} 
      <CommunityBanner />
      <Footer />
    </main>
  );
}
