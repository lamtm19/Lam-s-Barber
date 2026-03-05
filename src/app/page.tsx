import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-off-white selection:bg-kaki-deep selection:text-off-white">
      <Hero />
      <Gallery />
      <Pricing />
      <Reviews />
      <Footer />
    </main>
  );
}
