import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import PortfolioSection from "../components/portfolioSection";
import services from "../data/services";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <ServicesSection />

        <PortfolioSection/>
      </main>
    </>
  );
}