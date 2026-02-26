import Header from "@/components/GeneralComponents/Header/Header";

import HeroHome from "@/components/PageHome/HeroHome/HeroHome";
import StepsSection from "@/components/PageHome/StepHome/StepHome";
import WedoHome from "@/components/PageHome/WedoHome/WedoHome";
import StatsHome from "@/components/PageHome/StatsHome/StatsHome";
import TestimonialsSection from "@/components/PageHome/TestimonialHome/TestimonialHome";
import CtaHome from "@/components/PageHome/CtaHome/CtaHome";
import WedoStepHome from "@/components/PageHome/WedoStepHome/WedoStepHome";
import FaqHome from "@/components/PageHome/FaqHome/FaqHome";

import Footer from "../components/GeneralComponents/Footer/Footer";

export default function Page() {
  return (
    <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start select-none">
      <Header />
      <HeroHome />
      <StepsSection />
      <WedoHome />
      <StatsHome />
      <TestimonialsSection />
      <CtaHome />
      <WedoStepHome />
      <FaqHome />
      <Footer />
    </main>
  );
}
