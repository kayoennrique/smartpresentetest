import Header from '@/components/GeneralComponents/Header/Header';
import CtaHome from '@/components/PageHome/CtaHome/CtaHome';
import FaqHome from '@/components/PageHome/FaqHome/FaqHome';
import HeroHome from '@/components/PageHome/HeroHome/HeroHome';
import Marquee from '@/components/PageHome/Marquee/Marquee';
import StepsSection from '@/components/PageHome/StepHome/StepHome';
import TestimonialsSection from '@/components/PageHome/TestimonialHome/TestimonialHome';
import WedoHome from '@/components/PageHome/WedoHome/WedoHome';
import WedoStepHome from '@/components/PageHome/WedoStepHome/WedoStepHome';

import Footer from '../components/GeneralComponents/Footer/Footer';

export default function Page() {
  return (
    <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start select-none">
      <Header />
      <HeroHome />
      <StepsSection />
      <WedoHome />
      <Marquee />
      <TestimonialsSection />
      <CtaHome />
      <WedoStepHome />
      <FaqHome />
      <Footer />
    </main>
  );
}
