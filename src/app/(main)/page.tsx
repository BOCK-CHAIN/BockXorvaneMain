import NavBar from "@/components/NavBar";
import PricingPlans from "@/components/PricingPlans";
import Image from "next/image";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <PricingPlans />
      <Footer />
    </>
  );
}
