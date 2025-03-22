import Footer from "@/components/footer";
import Header from "@/components/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      {children} 
      <Footer />
    </main>
  );
}
