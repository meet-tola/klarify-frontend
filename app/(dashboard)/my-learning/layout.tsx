import CommunityBanner from "@/components/community-banner";
import Footer from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="flex-1 px-4 md:px-12">{children}</main>
      <CommunityBanner />
      <Footer />
    </div>
  );
}
